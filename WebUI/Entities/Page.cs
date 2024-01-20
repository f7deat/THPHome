using System;
using System.Collections.Generic;
using System.Text;

namespace ApplicationCore.Entities
{
    public class Page : BaseEntity<Guid>
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public string NormalizedName { get; set; }
        public string Locale { get; set; }
        public string View { get; set; }
    }
}
