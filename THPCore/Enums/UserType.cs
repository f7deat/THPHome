using System.ComponentModel.DataAnnotations;

namespace THPCore.Enums;

public enum UserType
{
    [Display(Name = "Sinh viên")]
    Student,
    [Display(Name = "Giảng viên")]
    Lecturer,
    [Display(Name = "Trưởng bộ môn")]
    Leader,
    [Display(Name = "Trưởng Khoa")]
    Dean,
    [Display(Name = "Phó trưởng đơn vị")]
    Deputy,
    [Display(Name = "Ban giám hiệu")]
    Administrator
}