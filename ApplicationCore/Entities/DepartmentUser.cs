using System;

namespace ApplicationCore.Entities
{
    public class DepartmentUser : BaseEntity<Guid>
    {
        public Guid DepartmentId { get; set; }
        public string UserId { get; set; }
        public int Rank { get; set; }
        public string Type { get; set; }
        public string JobTitle { get; set; }
    }
}
