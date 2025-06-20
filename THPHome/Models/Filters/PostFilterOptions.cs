﻿using System.Text.Json.Serialization;
using THPCore.Models;
using THPHome.Enums;

namespace THPHome.Models.Filters;

public class PostFilterOptions : FilterOptions
{
    public PostType? Type { get; set; }
    public string? Title { get; set; }
    public PostStatus? Status { get; set; }
    [JsonIgnore]
    public bool CanSeeAll { get; set; }
    public int? CategoryId { get; set; }
    public int? DepartmentId { get; set; }
}

public class TrashedPostFilterOptions : PostFilterOptions
{
    
}