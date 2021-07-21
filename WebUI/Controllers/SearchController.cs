using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using Infrastructure;
using ApplicationCore.Entities;
using ApplicationCore.Helpers;
using ApplicationCore.Interfaces.IService;

namespace WebUI.Controllers
{
    public class SearchController : Controller
    {
        private readonly IPostService _postService;
        private readonly ICategoryService _categoryService;
        public SearchController(IPostService postService, ICategoryService categoryService)
        {
            _postService = postService;
            _categoryService = categoryService;
        }
        public async Task<IActionResult> Index(string searchTerm, int? id, int pageNumber = 1, int pageSize = 10)
        {
            ViewBag.RandomPosts = await _postService.GetRandomPostsAsync();
            ViewData["Title"] = searchTerm ?? "Tìm kiếm";

            ViewData["Id"] = new SelectList(await _categoryService.ListAllAsync(), "Id", "Name");

            if (string.IsNullOrEmpty(searchTerm))
            {
                return View();
            }
            return View(await _postService.SearchAsync(searchTerm.Trim().ToLower(), id, pageNumber, pageSize));
        }
    }
}