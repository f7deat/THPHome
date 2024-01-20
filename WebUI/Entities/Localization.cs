using ApplicationCore.Enums;
using System;
using System.Collections.Generic;
using System.Text;

namespace ApplicationCore.Entities
{
    public class Localization : BaseEntity<Guid>
    {
        public Language Language { get; set; }
        public string Key { get; set; } = default!;
        public string? Value { get; set; }
    }
}
