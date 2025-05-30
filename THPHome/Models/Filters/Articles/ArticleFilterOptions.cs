﻿using THPCore.Models;
using THPHome.Enums;

namespace THPHome.Models.Filters.Articles;

public class ArticleFilterOptions : FilterOptions
{
    public int? CategoryId { get; set; }
    public PostType? Type { get; set; }
    public string? Title { get; set; }
    public int? DepartmentId { get; set; }
}
