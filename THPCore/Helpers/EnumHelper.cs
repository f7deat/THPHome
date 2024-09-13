using System.ComponentModel.DataAnnotations;
using System.Reflection;

namespace THPCore.Helpers;

public class EnumHelper
{
    public static List<string> GetEnumDisplayNames<T>() where T : Enum
    {
        return typeof(T).GetFields(BindingFlags.Public | BindingFlags.Static)
            .Select(field => field.GetCustomAttribute<DisplayAttribute>()?.Name ?? field.Name)
            .ToList();
    }

    public static string GetEnumDisplayName<T>(T enumValue) where T : Enum
    {
        var fieldInfo = typeof(T).GetField(enumValue.ToString());
        var displayAttribute = fieldInfo?.GetCustomAttribute<DisplayAttribute>();
        return displayAttribute?.Name ?? enumValue.ToString();
    }

    public static List<T> EnumToList<T>() where T : Enum
    {
        return Enum.GetValues(typeof(T)).Cast<T>().ToList();
    }
}
