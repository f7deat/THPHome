﻿using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using THPCore.Infrastructures;
using THPCore.Interfaces;

namespace THPHome.Entities;

public class Banner : BaseEntity<int>, ILocale
{
    [StringLength(200)]
    public string? Name { get; set; }
    [StringLength(500)]
    public string? Url { get; set; }
    [StringLength(500)]
    public string? Image { get; set; }
    public BannerStatus Status { get; set; }
    public BannerType Type { get; set; }
    public string? Description { get; set; }
    public bool Active { get; set; }

    [ForeignKey(nameof(Post))]
    public long? PostId { get; set; }
    public string Locale { get; set; } = "vi-VN";
    public DateTime CreatedDate { get; set; }
    public DateTime? ModifiedDate { get; set; }
    [StringLength(450)]
    public string? ModifiedBy { get; set; }
    [StringLength(450)]
    public string? CreatedBy { get; set; }

    public Post? Post { get; set; }
}

public enum BannerType
{
    DEFAULT,
    SLIDE,
    POST,
    PHOTO,
    LOGO,
    POPUP
}

public enum BannerStatus
{
    DRAFT,
    ACTIVE
}
