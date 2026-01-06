using Docker.DotNet.Models;
using System.Net;

namespace API.Test.Integration.Tests
{
    public class AccountControllerTests(CustomWebApplicationFactory factory) : IClassFixture<CustomWebApplicationFactory>
    {
        static string UsernameInUseRoute(string username) => $"/account/UsernameInUse?username={username}";
        const string loginRoute = "/account/login";
        const string registerRoute = "/account/login";

        [Theory]
        [InlineData("invalid", false)]
        [InlineData("user", true)]
        public async void UsernameInUse_UsernamePesquisado_Sucesso(string username, bool exists)
        {
            var client = factory.Server.CreateClient();
            var response = await client.GetAsync(UsernameInUseRoute(username));
            Assert.Equal(HttpStatusCode.OK, response.StatusCode);
            
            var result = bool.Parse(await response.Content.ReadAsStringAsync());
            Assert.Equal(exists, result);
        }

        /*[Fact]
        public async void Register_DadosInvalidos_Erro()
        {

        }*/

        /*[Fact]
        public async void Register_UsuarioRepetido_Erro()
        {

        }

        [Fact]
        public async void Register_RetornaToken_Sucesso()
        {

        }

        [Fact]
        public async void Login_DadosIncorretos_Erro()
        {

        }

        [Fact]
        public async void Login_RetornaToken_Sucesso()
        {

        }

        */
    }
}
