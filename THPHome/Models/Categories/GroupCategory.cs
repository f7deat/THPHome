using ApplicationCore.Entities;
using System.Collections.Generic;

namespace ApplicationCore.Models.Categories
{
    public class GroupCategory
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Icon { get; set; }
        public List<Category> Childs { get; set; }
    }
}
