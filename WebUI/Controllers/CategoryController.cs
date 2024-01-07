using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Infrastructure;
using ApplicationCore.Entities;
using ApplicationCore.Helpers;
using ApplicationCore.Interfaces.IService;
using ApplicationCore.Constants;
using ApplicationCore.Models;
using ApplicationCore.Enums;

namespace WebUI.Controllers
{
    public class CategoryController : Controller
    {
        private readonly ApplicationDbContext _context;
        private readonly ICategoryService _categoryService;
        private readonly IPostService _postService;
        public CategoryController(ApplicationDbContext context, ICategoryService categoryService, IPostService postService)
        {
            _context = context;
            _categoryService = categoryService;
            _postService = postService;
        }
        public async Task<IActionResult> Index(Argument argument)
        {
            ViewData["Title"] = "Danh mục";
            argument.PageSize = 12;

            Request.Cookies.TryGetValue("locale", out string locale);
            var lang = Language.VI;
            if (!string.IsNullOrEmpty(locale))
            {
                if (locale == "en-US")
                {
                    lang = Language.EN;
                }
            }
            return View(await _categoryService.ListAllAsync(lang));
        }
        public async Task<IActionResult> Details(Argument argument)
        {
            var category = await _categoryService.GetCategory(argument.Id ?? 0);
            if (category is null)
            {
                return Redirect(SpecialPages.NotFound);
            }
            if (category.ParrentId != null)
            {
                var parrentCategory = await _categoryService.GetParrentAsync(category.ParrentId ?? 0);
                ViewBag.ParrentCategory = parrentCategory;
            }
            ViewData["Title"] = category.Name;
            if (!string.IsNullOrEmpty(argument.SearchTerm))
            {
                ViewData["Title"] = $"[{category.Name}] {argument.SearchTerm}";
                ViewBag.SearchTerm = argument.SearchTerm;
            }
            ViewData["Description"] = category.Description;

            ViewBag.Id = argument.Id;

            ViewBag.Categories = await _categoryService.GetChildCategoriesAsync(argument.Id ?? 0);

            return View(await _postService.GetListInCategoryAsync(argument.Id ?? 0, argument.SearchTerm, argument.PageIndex));
        }
    }
}