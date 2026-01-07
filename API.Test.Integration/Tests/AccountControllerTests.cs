using API.DTOs;
using System.Net;
using System.Net.Http.Json;

namespace API.Test.Integration.Tests
{
    public class AccountControllerTests(CustomWebApplicationFactory factory) : IClassFixture<CustomWebApplicationFactory>
    {
        static string UsernameInUseRoute(string username) => $"/account/UsernameInUse?username={username}";
        const string loginRoute = "/account/login";
        const string registerRoute = "/account/register";

        [Theory]
        [InlineData("user123", false)]
        [InlineData("test", true)]
        public async void UsernameInUse_UsernamePesquisado_Sucesso(string username, bool exists)
        {
            var client = factory.Server.CreateClient();
            var response = await client.GetAsync(UsernameInUseRoute(username));
            Assert.Equal(HttpStatusCode.OK, response.StatusCode);

            var result = bool.Parse(await response.Content.ReadAsStringAsync());
            Assert.Equal(exists, result);
        }

        [Theory]
        [InlineData("user1", "p")]
        [InlineData("user1", "passwordpasswordpassword")]
        [InlineData("u", "password")]
        [InlineData("user1user1user1user1user1", "password")]
        [InlineData("user 1", "password")]
        public async void Register_DadosInvalidos_Erro(string username, string password)
        {
            var dto = new LoginDto
            {
                Password = password,
                Username = username
            };

            var client = factory.Server.CreateClient();
            var response = await client.PostAsJsonAsync(registerRoute, dto);
            Assert.Equal(HttpStatusCode.BadRequest, response.StatusCode);
        }

        [Fact]
        public async void Register_UsuarioRepetido_Erro()
        {
            var dto = new LoginDto
            {
                Username = "test",
                Password = "123"
            };

            var client = factory.Server.CreateClient();
            var response = await client.PostAsJsonAsync(registerRoute, dto);
            Assert.Equal(HttpStatusCode.BadRequest, response.StatusCode);
        }

        [Fact]
        public async void Register_RetornaToken_Sucesso()
        {
            var dto = new LoginDto
            {
                Username = "user",
                Password = "123"
            };

            var client = factory.Server.CreateClient();
            var response = await client.PostAsJsonAsync(registerRoute, dto);
            Assert.Equal(HttpStatusCode.OK, response.StatusCode);

            var authDto = await response.Content.ReadFromJsonAsync<AuthDto>();
            Assert.NotNull(authDto);
            Assert.NotEmpty(authDto.Token);
        }

        [Theory]
        [InlineData("test", "wrong")]
        [InlineData("wrong", "test")]
        public async void Login_DadosIncorretos_Erro(string username, string password)
        {
            var dto = new LoginDto
            {
                Password = password,
                Username = username
            };

            var client = factory.Server.CreateClient();
            var response = await client.PostAsJsonAsync(loginRoute, dto);
            Assert.Equal(HttpStatusCode.NotFound, response.StatusCode);
        }

        [Fact]
        public async void Login_RetornaToken_Sucesso()
        {
            var dto = new LoginDto
            {
                Username = "test",
                Password = "test"
            };

            var client = factory.Server.CreateClient();
            var response = await client.PostAsJsonAsync(loginRoute, dto);
            Assert.Equal(HttpStatusCode.OK, response.StatusCode);

            var authDto = await response.Content.ReadFromJsonAsync<AuthDto>();
            Assert.NotNull(authDto);
            Assert.NotEmpty(authDto.Token);
        }
    }
}
