using System;

namespace ApplicationCore.Entities
{
    public class Department : BaseEntity<Guid>
    {
        public string Name { get; set; }
        public string Description { get; set; }
    }
}
