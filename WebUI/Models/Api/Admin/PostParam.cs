using ApplicationCore.Entities;
using System;
using System.Collections.Generic;

namespace WebUI.Models.Api.Admin
{
    public class PostParam
    {
        public Post Post { get; set; }
        public int[] ListCategoryId { get; set; }
        public List<Attachment> Attachments { get; set; }
    }
}
