using System.ComponentModel.DataAnnotations;
using THPHome.Foundations;

namespace THPHome.Models.Blocks;

public class MajorGeneralBlock : BaseBlock
{
    [Display(Name = "THÔNG TIN VỀ NGÀNH")]
    public string? Introduce { get; set; }
    [Display(Name = "ĐỘI NGŨ GIẢNG VIÊN")]
    public string? Lecturer { get; set; }
    [Display(Name = "CƠ HỘI VIỆC LÀM")]
    public string? Career { get; set; }
    [Display(Name = "CƠ HỘI PHÁT TRIỂN")]
    public string? Opportunity { get; set; }
}
