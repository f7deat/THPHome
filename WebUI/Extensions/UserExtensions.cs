using System.Security.Claims;

namespace WebUI.Extensions;

public static class UserExtensions
{
    public static string GetId(this ClaimsPrincipal claimsPrincipal)
    {
        return claimsPrincipal.FindFirst(ClaimTypes.NameIdentifier)?.Value ?? string.Empty;
    }
}
