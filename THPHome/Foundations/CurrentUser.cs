using System.Security.Claims;
using WebUI.Foundations.Interfaces;

namespace WebUI.Foundations;

public class CurrentUser(IHttpContextAccessor httpContext) : ICurrentUser
{
    private readonly IHttpContextAccessor _httpContextAccessor = httpContext;

    public string? GetId() => _httpContextAccessor.HttpContext?.User?.FindFirst(ClaimTypes.NameIdentifier)?.Value;
}
