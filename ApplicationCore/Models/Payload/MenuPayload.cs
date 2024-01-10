using ApplicationCore.Entities;
using ApplicationCore.Enums;

namespace ApplicationCore.Models.Payload
{
    public class ListMenuPayload
    {
        public MenuType Type { get; set; }
        public int ParentId { get; set; }
        public Language Language { get; set; }
    }
}
