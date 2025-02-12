using System.ComponentModel.DataAnnotations;
using THPCore.Infrastructures;

namespace THPHome.Entities;

public class ApplicationLog : BaseEntity
{
    [StringLength(256)]
    public string UserName { get; set; } = default!;
    public string Message { get; set; } = default!;
    public DateTime CreatedDate { get; set; }
    public LogLevel Level { get; set; }
}
