using System.Security.Claims;

namespace THPCore.Extensions;

public static class UserExtensions
{
    public static string GetId(this ClaimsPrincipal claimsPrincipal)
    {
        return claimsPrincipal.FindFirst(ClaimTypes.NameIdentifier)?.Value ?? string.Empty;
    }
}
