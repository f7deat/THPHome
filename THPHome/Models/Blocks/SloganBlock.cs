using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace THPHome.Models.Blocks;

public class SloganBlock
{
    [Display(Name = "Tiêu đề")]
    [JsonPropertyName("title")]
    public string? Title { get; set; }
    [JsonPropertyName("image")]
    public string? Image { get; set; }
}
