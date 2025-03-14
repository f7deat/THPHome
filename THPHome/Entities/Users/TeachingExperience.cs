using System.ComponentModel.DataAnnotations;

namespace THPHome.Entities.Users;

public class TeachingExperience : THPIdentity.Entities.TeachingExperience
{
    [StringLength(256)]
    public string UserName { get; set; } = default!;
}
