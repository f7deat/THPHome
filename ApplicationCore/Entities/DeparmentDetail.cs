using System;

namespace ApplicationCore.Entities
{
    public class DeparmentDetail : BaseEntity<Guid>
    {
        public Guid DepartmentId { get; set; }
        public string Type { get; set; }
        public string Content { get; set; }
    }
}
