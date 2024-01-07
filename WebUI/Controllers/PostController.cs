using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Infrastructure;
using WebUI.Models;
using System.Diagnostics;
using System.Collections.Generic;
using ApplicationCore.Interfaces.IService;
using ApplicationCore.Enums;
using ApplicationCore.Entities;

namespace WebUI.Controllers
{
    public class PostController : Controller
    {
        private readonly ApplicationDbContext _context;
        private readonly IPostService _postService;
        private readonly ICategoryService _categoryService;
        private readonly IBannerService _bannerService;
        private readonly ICommentService _commentService;
        private readonly IAttachmentService _attachmentService;
        public PostController(ApplicationDbContext context, IPostService postService, ICategoryService categoryService, IBannerService bannerService, ICommentService commentService, IAttachmentService attachmentService)
        {
            _context = context;
            _postService = postService;
            _categoryService = categoryService;
            _bannerService = bannerService;
            _commentService = commentService;
            _attachmentService = attachmentService;
        }

        [Route("post/tag")]
        public async Task<IActionResult> Tag(string name, string searchTerm)
        {
            ViewData["Title"] = name ?? "Tag";
            if (string.IsNullOrEmpty(name))
            {
                return View();
            }
            ViewBag.RandomPosts = await _postService.GetRandomPostsAsync();
            return View(await _postService.GetListInTagSync(name, searchTerm));
        }
    }
}