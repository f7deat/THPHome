using System;

namespace ApplicationCore.Entities
{
    public class DeparmentUser : BaseEntity<Guid>
    {
        public Guid DeparmentId { get; set; }
        public string UserId { get; set; }
        public int Rank { get; set; }
        public string Type { get; set; }
    }
}
