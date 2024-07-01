﻿using ApplicationCore.Enums;
using System.ComponentModel.DataAnnotations;

namespace ApplicationCore.Entities
{
    public class Category
    {
        [Key]
        public int Id { get; set; }
        public int? ParrentId { get; set; }
        [StringLength(100)]
        public string? Name { get; set; }
        [StringLength(100)]
        public string? NormalizeName { get; set; }
        [StringLength(300)]
        public string? Description { get; set; }
        [StringLength(300)]
        public string? Thumbnail { get; set; }
        public CategoryStatus? Status { get; set; }
        public int Index { get; set; }
        public bool IsDisplayOnHome { get; set; }
        public string? Icon { get; set; }
        public Language Language { get; set; }

    }

    public enum CategoryStatus
    {
        Draft = 0,
        Active = 1
    }
}
