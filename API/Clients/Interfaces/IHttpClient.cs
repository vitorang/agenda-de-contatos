namespace API.Clients.Interfaces
{
    public interface IHttpClient
    {
        public Task<HttpResponseMessage> GetAsync(string url);
    }
}
