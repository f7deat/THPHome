﻿using THPCore.Models;

namespace THPHome.Models.Filters.Files;

public class GalleryFilterOptions : FilterOptions
{
    public string? Name { get; set; }
    public int? DepartmentId { get; set; }
}
