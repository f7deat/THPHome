using Microsoft.AspNetCore.Identity;
using THPIdentity.Entities;

namespace Infrastructure.Data;

public static class ApplicationDbInitializer
{
    public static void SeedUsers(UserManager<ApplicationUser> userManager)
    {
        if (userManager.FindByEmailAsync("abc@xyz.com").Result == null)
        {
            var user = new ApplicationUser
            {
                UserName = "tandc@xyz.com",
                Email = "abc@xyz.com"
            };

            IdentityResult result = userManager.CreateAsync(user, "PasswordHere").Result;

            if (result.Succeeded)
            {
                userManager.AddToRoleAsync(user, "Admin").Wait();
            }
        }
    }
}
