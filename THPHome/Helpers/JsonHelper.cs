using System.IO;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

namespace ApplicationCore.Helpers
{
    public class JsonHelper
    {
        public static async Task<string> SerializeAsync(object obj)
        {
            using (var stream = new MemoryStream())
            {
                await JsonSerializer.SerializeAsync(stream, obj, obj.GetType());
                stream.Position = 0;
                using var reader = new StreamReader(stream);
                return await reader.ReadToEndAsync();
            }
        }

        public static string Serialize(object obj)
        {
            var utf16Bytes = JsonSerializer.SerializeToUtf8Bytes(obj);
            byte[] utf8Bytes = Encoding.Convert(Encoding.Unicode, Encoding.UTF8, utf16Bytes);
            return Encoding.Default.GetString(utf8Bytes);
        }

        public static async Task<string> DeserializeAsync(string obj)
        {
            using (var stream = new MemoryStream(Encoding.UTF8.GetBytes(obj)))
            {
                await JsonSerializer.DeserializeAsync<string>(stream);
                stream.Position = 0;
                using var reader = new StreamReader(stream);
                return await reader.ReadToEndAsync();
            }
        }
    }
}
