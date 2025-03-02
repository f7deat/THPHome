using System.ComponentModel.DataAnnotations;

namespace THPHome.Enums;

public enum PostStatus
{
    DRAFT,
    PUBLISH,
    TRASH
}

public enum PostType
{
    [Display(Name = "Entry")]
    Entry,
    [Display(Name = "Trang")]
    PAGE,
    [Display(Name = "Bài viết")]
    NEWS,
    [Display(Name = "Thông báo")]
    NOTIFICATION,
    [Display(Name = "Thư viện ảnh")]
    GALLERY,
    [Display(Name = "Tuyển sinh")]
    ADMISSION,
    [Display(Name = "Ngành/chuyên ngành")]
    MAJOR
}
