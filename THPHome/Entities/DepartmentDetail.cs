using System.ComponentModel.DataAnnotations;
using THPCore.Infrastructures;

namespace THPHome.Entities;

public class DepartmentDetail : BaseEntity
{
    public int DepartmentId { get; set; }
    public string? Type { get; set; }
    public string? Content { get; set; }
    public int SortOrder { get; set; }
    public DateTime CreatedDate { get; set; }
    public DateTime? ModifiedDate { get; set; }
    [StringLength(450)]
    public string? ModifiedBy { get; set; }
    [StringLength(450)]
    public string? CreatedBy { get; set; }
}
