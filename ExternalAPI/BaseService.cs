using System.Net.Http;

namespace ExternalAPI
{
    public class BaseService
    {
        protected static HttpClient _httpClient;
        static BaseService()
        {
            if (_httpClient is null)
            {
                _httpClient = new HttpClient();
            }
        }
    }
}
