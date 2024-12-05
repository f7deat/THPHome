namespace THPCore.Interfaces;

public interface IHCAService
{
    bool IsUserInRole(string roleName);
    IEnumerable<string>? GetRoles();
    bool IsUserInAnyRole(params string[] roles);
    string GetUserId();
    string GetUserName();
}
