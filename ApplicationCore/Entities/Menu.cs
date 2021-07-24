using System.ComponentModel.DataAnnotations;

namespace ApplicationCore.Entities
{
    public class Menu : BaseEntity<int>
    {
        [StringLength(250)]
        public string Name { get; set; }
        [StringLength(250)]
        public string Url { get; set; }
        [StringLength(500)]
        public string Description { get; set; }
        public MenuType Type { get; set; }
        public int Index { get; set; }
        public int ParrentId { get; set; }
        public int Status { get; set; }
        [StringLength(250)]
        public string Icon { get; set; }
    }

    public enum MenuType
    {
        DEFAULT,
        TOP,
        MAIN,
        BOX
    }
}
