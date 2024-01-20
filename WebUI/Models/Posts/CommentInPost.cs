using System;

namespace ApplicationCore.Models.Posts
{
    public class CommentInPost
    {
        public Guid CommentId { get; set; }
        public string UserName { get; set; }
        public string Content { get; set; }
        public int Liked { get; set; }
        public int DisLiked { get; set; }
        public Guid? ParrentId { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime ModifiedDate { get; set; }
    }
}
