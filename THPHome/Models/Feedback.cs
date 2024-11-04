using System.ComponentModel.DataAnnotations;

namespace WebUI.Models
{
    public class Feedback
    {
        [Required, StringLength(50)]
        public string Name { get; set; }
        public string Phone { get; set; }
        public string Email { get; set; }
        [Required, StringLength(500)]
        public string Message { get; set; }
    }
}
