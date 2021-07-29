using ApplicationCore.Enums;
using System;
using System.ComponentModel.DataAnnotations;

namespace ApplicationCore.Entities
{
    public class Video
    {
        public long Id { get; set; }
        [StringLength(250)]
        public string Name { get; set; }
        [StringLength(500)]
        public string Url { get; set; }
        [StringLength(500)]
        public string Thumbnail { get; set; }
        public DateTime CreatedDate { get; set; }
        public Language Language { get; set; }
    }
}
