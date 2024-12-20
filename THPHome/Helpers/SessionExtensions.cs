using ApplicationCore.Helpers;

namespace THPHome.Helpers;

public static class SessionExtensions
{
    public static void Set<T>(this ISession session, string key, T value)
    {
        if (value is null) return;
        session.Set(key, JsonHelper.SerializeAsync(value));
    }
}
