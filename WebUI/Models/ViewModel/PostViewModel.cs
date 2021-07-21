using ApplicationCore.Enums;
using System;

namespace WebUI.Models.ViewModel
{
    public class PostViewModel
    {
        public long Id { get; set; }
        public string Title { get; set; }
        public string Url { get; set; }
        public string Description { get; set; }
        public string Content { get; set; }
        public DateTime UpdateTime { get; set; }
        public string UserId { get; set; }
        public string Thumbnail { get; set; }
        public int View { get; set; }
        public PostStatus Status { get; set; }
        public int?[] TagIds { get; set; }
    }
}
