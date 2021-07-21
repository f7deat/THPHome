using System;

namespace ApplicationCore.Entities
{
    public class Comment : BaseEntity<Guid>
    {
        public long PostId { get; set; }
        public string Content { get; set; }
        public CommentStatus Status { get; set; }
        public Guid? ParrentId { get; set; }
        public int Like { get; set; }
        public int Dislike { get; set; }
    }

    public enum CommentStatus
    {
        PENDING,
        PUBLISH,
        DELETED
    }
}
