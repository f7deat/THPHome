﻿using THPCore.Models;

namespace THPHome.Models.Filters.Curriculum;

public class MajorFilterOptions : FilterOptions
{
    public int? TrainingGroupId { get; set; }
    public int? FieldStudyId { get; set; }
}
