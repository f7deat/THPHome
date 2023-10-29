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

        [Route("post/{url}-{id}.html")]
        public async Task<IActionResult> Index(long? id)
        {
            var post = await _postService.FindAsync(id ?? 0);

            if (post == null)
            {
                return NotFound();
            }

            post.View = await _postService.IncreaseViewAsync(post);

            ViewData["Description"] = post.Description;

            var categories = await _categoryService.GetListInPostAsync(id ?? 0);
            ViewBag.RandomPosts = await _postService.GetListByTypeAsync(PostType.NOTIFICATION, 1, 5);
            if (categories.Count() > 0)
            {
                var categoryIds = categories.Select(c => c.Id);
                var relateds = from c in _context.PostCategories
                               join p in _context.Posts on c.PostId equals p.Id
                               where categoryIds.Contains(c.CategoryId) && p.Status == PostStatus.PUBLISH && p.Id != post.Id
                               orderby p.Id descending
                               select new Post
                               {
                                   Id = p.Id,
                                   Title = p.Title,
                                   ModifiedDate = p.ModifiedDate,
                                   View = p.View,
                                   Url = p.Url + "-" + p.Id + ".html"
                               };
                ViewBag.RelatedPosts = await relateds.Take(6).ToListAsync();
            }

            ViewBag.Categories = categories;

            ViewBag.ListBanner = await _bannerService.GetListAsync(id ?? 0);

            ViewBag.ListComment = await _commentService.GetListInPostAsync(id ?? 0);

            ViewBag.Attachments = await _attachmentService.GetListInPostAsync(id ?? 0);

            return View(post);
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