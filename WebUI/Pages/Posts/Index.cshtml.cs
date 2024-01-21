using ApplicationCore.Entities;
using ApplicationCore.Enums;
using ApplicationCore.Interfaces.IService;
using ApplicationCore.Models.Posts;
using Infrastructure;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebUI.Foundations;

namespace WebUI.Pages.Posts
{
    public class IndexModel(ApplicationDbContext context, ICategoryService categoryService, IPostService postService, IAttachmentService attachmentService, ICommentService commentService) : DynamicPageModel(context)
    {
        private readonly ICategoryService _categoryService = categoryService;
        private readonly IPostService _postService = postService;
        private readonly IAttachmentService _attachmentService = attachmentService;
        private readonly ICommentService _commentService = commentService;
        public IEnumerable<PostView> RandomPosts = new List<PostView>();
        public IEnumerable<Post> RelatedPosts = new List<Post>();
        public List<Category> Categories = [];
        public List<Attachment> Attachments = [];
        public IEnumerable<CommentInPost> ListComment = new List<CommentInPost>();

        public async Task<IActionResult> OnGetAsync()
        {
            Categories = await _categoryService.GetListInPostAsync(PageData.Id);
            RandomPosts = await _postService.GetListByTypeAsync(PostType.NOTIFICATION, 1, 5, Language.VI);
            if (Categories.Count > 0)
            {
                var categoryId = Categories.Select(c => c.Id).First();
                var relateds = from c in _context.PostCategories
                               join p in _context.Posts on c.PostId equals p.Id
                               where c.CategoryId == categoryId && p.Status == PostStatus.PUBLISH && p.Id != PageData.Id
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
