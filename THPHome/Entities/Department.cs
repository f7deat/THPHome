using System.ComponentModel.DataAnnotations;
using THPCore.Infrastructures;
using THPCore.Interfaces;

namespace THPHome.Entities;

public class Department : BaseEntity, ILocale
{
    public string Name { get; set; } = default!;
    public string? Description { get; set; }
    public int? Code { get; set; }
    public int DepartmentTypeId { get; set; }
    public string Locale { get; set; } = default!;
    public DateTime CreatedDate { get; set; }
    public DateTime? ModifiedDate { get; set; }
    [StringLength(450)]
    public string? ModifiedBy { get; set; }
    [StringLength(450)]
    public string? CreatedBy { get; set; }
}
