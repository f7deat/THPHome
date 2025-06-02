using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using THPCore.Infrastructures;
using THPCore.Interfaces;
using THPHome.Enums;

namespace THPHome.Entities;

public class Post : BaseEntity<long>, ILocale
{
    [StringLength(500)]
    public string Title { get; set; } = default!;
    [StringLength(500)]
    public string Url { get; set; } = default!;
    [StringLength(500)]
    public string? Description { get; set; }
    public string? Content { get; set; }
    [StringLength(500)]
    public string? Thumbnail { get; set; }
    public int View { get; set; }
    public PostStatus Status { get; set; }
    public PostType Type { get; set; }
    public string? Tags { get; set; }
    public DateTime IssuedDate { get; set; }
    [StringLength(10)]
    public string Locale { get; set; } = default!;
    [ForeignKey(nameof(Category))]
    public int? CategoryId { get; set; }
    public DateTime CreatedDate { get; set; }
    public DateTime? ModifiedDate { get; set; }
    [StringLength(450)]
    public string? ModifiedBy { get; set; }
    [StringLength(450)]
    public string? CreatedBy { get; set; }
    [ForeignKey(nameof(Department))]
    public int? DepartmentId { get; set; }
    public bool IsDeleted { get; set; }

    public Category? Category { get; set; }
    public Department? Department { get; set; }
    public ICollection<Photo>? Photos { get; set; }
}
