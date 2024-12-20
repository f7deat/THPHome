using System.Xml.Serialization;

namespace THPHome.Helpers;

public class XmlHelper
{
    public static T Deserialize<T>(Stream input) where T : class
    {
        XmlSerializer ser = new(typeof(T));
        return (T)ser.Deserialize(input);
    }

    public string Serialize<T>(T ObjectToSerialize)
    {
        if (ObjectToSerialize == null) return string.Empty;
        XmlSerializer xmlSerializer = new(ObjectToSerialize.GetType());

        using StringWriter textWriter = new();
        xmlSerializer.Serialize(textWriter, ObjectToSerialize);
        return textWriter.ToString();
    }
}
