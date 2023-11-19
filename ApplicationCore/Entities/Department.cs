using System;
using System.ComponentModel.DataAnnotations;

namespace ApplicationCore.Entities
{
    public class Department : BaseEntity<Guid>
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public DepartmentType Type { get; set; }
    }

    public enum DepartmentType
    {
        [Display(Name = "Khoa - Viện đào tạo")]
        Faculty,
        [Display(Name = "Phòng - Ban chức năng")]
        Function,
        [Display(Name = "Trung tâm")]
        Center
    }
}
