using API.Clients.Interfaces;
using _HttpClient = System.Net.Http.HttpClient;

namespace API.Clients
{
    public class HttpClient : IHttpClient
    {
        private readonly Lazy<_HttpClient> httpClient = new();

        public Task<HttpResponseMessage> GetAsync(string url)
        {
            return httpClient.Value.GetAsync(url);
        }
    }
}
