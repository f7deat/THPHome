using ApplicationCore.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebUI.Models.Views
{
    public class PostView
    {
        public Post Post { get; set; }
        public List<Category> Categories { get; set; }
    }
}
