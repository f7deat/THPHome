using Microsoft.AspNetCore.Http;
using System.Security.Claims;
using THPCore.Interfaces;

namespace THPCore.Services;

public class HCAService : IHCAService
{
    private readonly IHttpContextAccessor _httpContextAccessor;
    public HCAService(IHttpContextAccessor httpContextAccessor)
    {
        _httpContextAccessor = httpContextAccessor;
    }

    public IEnumerable<string>? GetRoles()
    {
        var user = _httpContextAccessor.HttpContext?.User;

        if (user is null || user.Identity is null) return default;

        return user.FindAll(ClaimTypes.Role).Select(x => x.Value);
    }

    public bool IsUserInRole(string roleName)
    {
        var user = _httpContextAccessor.HttpContext?.User;

        if (user is null || user.Identity is null) return false;

        return user.IsInRole(roleName);
    }

    public bool IsUserInAnyRole(params string[] roles)
    {
        var user = _httpContextAccessor.HttpContext?.User;

        if (user == null || user.Identity is null) return false;

        return roles.Any(user.IsInRole);
    }

    public string GetUserId()
    {
        var user = _httpContextAccessor.HttpContext?.User;
        return user?.FindFirst(ClaimTypes.NameIdentifier)?.Value ?? string.Empty;
    }

    public string GetUserName()
    {
        var user = _httpContextAccessor.HttpContext?.User;
        return user?.FindFirst(ClaimTypes.Name)?.Value ?? string.Empty;
    }
}
