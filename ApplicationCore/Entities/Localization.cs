using System;
using System.Collections.Generic;
using System.Text;

namespace ApplicationCore.Entities
{
    public class Localization : BaseEntity<Guid>
    {
        public string Locale { get; set; }
        public string Key { get; set; }
        public string Value { get; set; }
    }
}
