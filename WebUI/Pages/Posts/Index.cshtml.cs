using ApplicationCore.Entities;
using ApplicationCore.Enums;
using ApplicationCore.Interfaces.IService;
using ApplicationCore.Models.Posts;
using ApplicationCore.Services;
using Infrastructure;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebUI.Foundations;

namespace WebUI.Pages.Posts
{
    public class IndexModel : DynamicPageModel
    {
        private readonly ICategoryService _categoryService;
        private readonly IPostService _postService;
        private readonly IAttachmentService _attachmentService;
        private readonly ICommentService _commentService;

        public IndexModel(ApplicationDbContext context, ICategoryService categoryService, IPostService postService, IAttachmentService attachmentService, ICommentService commentService) : base(context)
        {
            _categoryService = categoryService;
            _postService = postService;
            _attachmentService = attachmentService;
            _commentService = commentService;
        }

        public IEnumerable<PostView> RandomPosts;
        public IEnumerable<Post> RelatedPosts;
        public List<Category> Categories = new List<Category>();
        public List<Attachment> Attachments = new List<Attachment>();
        public IEnumerable<CommentInPost> ListComment = new List<CommentInPost>();

        public async Task<IActionResult> OnGetAsync()
        {
            var Categories = await _categoryService.GetListInPostAsync(PageData.Id);
            RandomPosts = await _postService.GetListByTypeAsync(PostType.NOTIFICATION, 1, 5, Language.VI);
            if (Categories.Count() > 0)
            {
                var categoryIds = Categories.Select(c => c.Id);
                var relateds = from c in _context.PostCategories
                               join p in _context.Posts on c.PostId equals p.Id
                               where categoryIds.Contains(c.CategoryId) && p.Status == PostStatus.PUBLISH && p.Id != PageData.Id
                               orderby p.Id descending
                               select new Post
                               {
                                   Id = p.Id,
                                   Title = p.Title,
                                   ModifiedDate = p.ModifiedDate,
                                   View = p.View,
                                   Url = p.Url + "-" + p.Id + ".html"
                               };
                RelatedPosts = await relateds.Take(10).ToListAsync();
            }

            Attachments = await _attachmentService.GetListInPostAsync(PageData.Id);
            ListComment = await _commentService.GetListInPostAsync(PageData.Id);

            return Page();
        }
    }
}
