﻿using Microsoft.AspNetCore.Identity;

namespace ApplicationCore.Entities;

public class ApplicationUser : IdentityUser
{
    public string? Name { get; set; }
    public string? Avatar { get; set; }
}
