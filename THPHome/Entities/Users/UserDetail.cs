using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using THPCore.Infrastructures;

namespace THPHome.Entities.Users;

public class UserDetail : BaseEntity
{
    public string UserId { get; set; } = default!;
    [Comment("Năm phong")]
    public int YearOfPromotion { get; set; }
    [Comment("Chức vụ")]
    public string? Position { get; set; }
    [Comment("Nơi ở hiện nay")]
    public string? CurrentResidence { get; set; }
    [Comment("Đơn vi\u0323/ cơ quan đang công tác")]
    public string? CurrentWorkplace { get; set; }
    [Comment("Đi\u0323a chỉ cơ quan")]
    public string? WorkplaceAddresss { get; set; }
    public string? IdentityNumber { get; set; }
    public DateTime? IdentityDate { get; set; }
    public string? IdentityPlace { get; set; }
    [StringLength(10)]
    public string Locale { get; set; } = default!;
    public string? Website { get; set; }
    public string? Facebook { get; set; }
    public string? Linkedin { get; set; }
    public string? Bio { get; set; }
    public string? Address { get; set; }
    [ForeignKey(nameof(AcademicTitle))]
    public int? AcademicTitleId { get; set; }
    [ForeignKey(nameof(AcademicDegree))]
    public int? AcademicDegreeId { get; set; }
    public DateTime? ContractDate { get; set; }

    public AcademicTitle? AcademicTitle { get; set; }
    public AcademicDegree? AcademicDegree { get; set; }
}
