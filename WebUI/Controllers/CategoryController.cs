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
    }
}