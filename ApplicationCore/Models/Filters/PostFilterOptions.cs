using ApplicationCore.Enums;
using System;
using System.Collections.Generic;
using System.Text;

namespace ApplicationCore.Models.Filters
{
    public class PostFilterOptions : FilterOptions
    {
        public string SearchTerm { get; set; }
        public PostType? Type { get; set; }
        public Language Language { get; set; }
    }
}
