using API.Clients.Interfaces;
using API.Models;
using API.Services.Interfaces;
using API.Utils;
using Newtonsoft.Json;

namespace API.Services
{
    public class ViaCepService(IHttpClient httpClient) : IViaCepService
    {
        public async Task<ContactAddress> Search(string postalCode)
        {
            var url = $"https://viacep.com.br/ws/{postalCode}/json/";
            HttpResponseMessage response = await httpClient.GetAsync(url);
            Validators.Equals(nameof(response.IsSuccessStatusCode), response.IsSuccessStatusCode, true);

            var result = await response.Content.ReadAsStringAsync();
            var data = JsonConvert.DeserializeObject<Dictionary<string, string>>(result) ?? [];

            Validators.NotContainsKey(nameof(data), data, "erro");

            return new ContactAddress
            {
                State = data["uf"],
                City = data["localidade"],
                Neighborhood = data["bairro"],
                Street = data["logradouro"],
                Number = 0,
                Complement = string.Empty
            };
        }
    }
}
