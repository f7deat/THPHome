using ApplicationCore.Helpers;
using Microsoft.AspNetCore.Identity;

namespace Infrastructure.Identity
{
    public class ApplicationUser : IdentityUser
    {
        public string Avatar { get => $"https://www.gravatar.com/avatar/{EncryptHelper.MD5Create(Email)}?s=520"; }
    }
}
