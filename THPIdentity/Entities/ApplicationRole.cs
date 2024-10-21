using Microsoft.AspNetCore.Identity;

namespace THPIdentity.Entities;

public class ApplicationRole : IdentityRole
{
    public string? DisplayName { get; set; }
}
