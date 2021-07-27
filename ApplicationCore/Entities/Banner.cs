using System.ComponentModel.DataAnnotations;

namespace ApplicationCore.Entities
{
    public class Banner : BaseEntity<int>
    {
        [StringLength(200)]
        public string Name { get; set; }
        [StringLength(500)]
        public string Url { get; set; }
        [StringLength(500)]
        public string Image { get; set; }
        public BannerStatus Status { get; set; }
        public BannerType Type { get; set; }
        public int DisplayOn { get; set; }
    }

    public enum BannerType
    {
        DEFAULT,
        SLIDE,
        POST,
        PHOTO
    }

    public enum BannerStatus
    {
        DRAFT,
        ACTIVE
    }
}
