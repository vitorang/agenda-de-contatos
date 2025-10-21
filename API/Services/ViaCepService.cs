using API.DTOs;
using API.Models;
using API.Services.Interfaces;
using API.Utils;
using Newtonsoft.Json;
using System.Text.Json.Serialization;

namespace API.Services
{
    public class ViaCepService() : IViaCepService
    {
        public async Task<ContactAddress> Search(string postalCode)
        {
            var url = $"https://viacep.com.br/ws/{postalCode}/json/";
            HttpClient httpClient = new();
            HttpResponseMessage response = await httpClient.GetAsync(url);
            Validators.Equals(nameof(response.IsSuccessStatusCode), response.IsSuccessStatusCode, true);

            var result = await response.Content.ReadAsStringAsync();
            var data = JsonConvert.DeserializeObject<Dictionary<string, dynamic>>(result) ?? [];
            
            Validators.Equals("erro", data.GetValueOrDefault("erro", false), false);

            return new ContactAddress
            {
                State = data["uf"],
                City = data["localidade"],
                Neighborhood = data["bairro"],
                Street = data["logradouro"],
                Number = 0,
                Complement = ""
            };
        }
    }
}
