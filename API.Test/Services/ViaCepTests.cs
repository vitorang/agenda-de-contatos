using API.Utils;
using Moq;
using Newtonsoft.Json;
using System.Net;

namespace API.Test.Services
{
    public class ViaCepTests : ApiTest
    {
        [Fact]
        public async void Search_ApiRetornaValorErro_Erro()
        {
            var content = new Dictionary<string, string> { { "erro", "true" } };

            httpClientMock.Setup(m => m.GetAsync(It.IsAny<string>()))
                .ReturnsAsync(CreateResponse(HttpStatusCode.OK,content));

            await Assert.ThrowsAsync<ApiException>(() => viaCepService.Search("30130003"));
        }

        [Fact]
        public async void Search_ApiRetornaStatusDeErro_Erro()
        {
            var content = ValidContent();

            httpClientMock.Setup(m => m.GetAsync(It.IsAny<string>()))
                .ReturnsAsync(CreateResponse(HttpStatusCode.BadRequest, content));

            await Assert.ThrowsAsync<ApiException>(() => viaCepService.Search("30130003"));
        }

        [Fact]
        public async void Search_ApiRetornaResultado_Sucesso()
        {
            var content = ValidContent();

            httpClientMock.Setup(m => m.GetAsync(It.IsAny<string>()))
                .ReturnsAsync(CreateResponse(HttpStatusCode.OK, content));

            var result = await viaCepService.Search("30130003");
            Assert.Equal("MG", result.State);
            Assert.Equal("Avenida Afonso Pena", result.Street);
            Assert.Equal("Belo Horizonte", result.City);
            Assert.Equal("Centro", result.Neighborhood);
            Assert.Equal(0, result.Number);
            Assert.Equal(string.Empty, result.Complement);
        }

        private static HttpResponseMessage CreateResponse(HttpStatusCode statusCode, Dictionary<string, string> content)
        {
            return new HttpResponseMessage
            {
                StatusCode = statusCode,
                Content = new StringContent(
                    JsonConvert.SerializeObject(content),
                    System.Text.Encoding.UTF8,
                    "application/json"
                )
            };
        }

        private static Dictionary<string, string> ValidContent()
        {
            return new Dictionary<string, string>
            {
                { "cep", "30130-003" },
                { "logradouro", "Avenida Afonso Pena" },
                { "complemento", "de 656 a 1350 - lado par" },
                { "unidade", "" },
                { "bairro", "Centro" },
                { "localidade", "Belo Horizonte" },
                { "uf", "MG" },
                { "estado", "Minas Gerais" },
                { "regiao", "Sudeste" },
                { "ibge", "3106200" },
                { "gia", "" },
                { "ddd", "31" },
                { "siafi", "4123" }
            };
        }
    }
}
