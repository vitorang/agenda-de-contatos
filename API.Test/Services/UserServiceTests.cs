using API.DTOs;
using API.Models;
using API.Services;
using API.Utils;
using Moq;

namespace API.Test.Services
{
    public class UserServiceTests : ApiTest
    {
        [Theory]
        [InlineData("user name", "password")]
        [InlineData("u", "password")]
        [InlineData("username0123456789", "password")]
        [InlineData("username", "p")]
        [InlineData("username", "password0123456789")]
        public async void Create_DadosInvalidos_Erro(string username, string password)
        {
            var dto = new LoginDto
            {
                Password = password,
                Username = username
            };

            await Assert.ThrowsAsync<ApiException>(() => userService.Create(dto));
            userRepositoryMock.Verify(m => m.Find(It.IsAny<string>()), Times.Never);
            userRepositoryMock.Verify(m => m.Create(It.IsAny<User>()), Times.Never);
        }

        [Fact]
        public async void Create_UsuarioEncontrado_Erro()
        {
            var dto = GetValidLogin();

            var user = new User
            {
                PasswordHash = string.Empty,
                Salt = 0,
                Username = dto.Username
            };

            userRepositoryMock.Setup(m => m.Find(It.IsAny<string>())).ReturnsAsync(user);

            await Assert.ThrowsAsync<ApiException>(() => userService.Create(dto));
            userRepositoryMock.Verify(m => m.Find(It.IsAny<string>()), Times.Once);
            userRepositoryMock.Verify(m => m.Create(It.IsAny<User>()), Times.Never);
        }

        [Fact]
        public async void Create_Sucesso()
        {
            var dto = GetValidLogin();

            await userService.Create(dto);
            userRepositoryMock.Verify(m => m.Find(It.IsAny<string>()), Times.Once);
            userRepositoryMock.Verify(m => m.Create(It.IsAny<User>()), Times.Once);
        }

        [Fact]
        public async void GetLoginToken_UsuarioNaoEncontrado_Erro()
        {
            var dto = GetValidLogin();

            await Assert.ThrowsAsync<ApiException>(() => userService.GetLoginToken(dto));
            userRepositoryMock.Verify(m => m.Find(It.IsAny<string>()), Times.Once);
        }

        [Fact]
        public async void GetLoginToken_UsuarioSenhaIncorreta_Erro()
        {
            var dto = GetValidLogin();
            var salt = 1;
            var user = new User
            {
                PasswordHash = UserService.CalculePasswordHash(dto.Password + "1", salt),
                Salt = salt,
                Username = "user",
            };

            userRepositoryMock.Setup(m => m.Find(It.IsAny<string>())).ReturnsAsync(user);
            
            await Assert.ThrowsAsync<ApiException>(() => userService.GetLoginToken(dto));
            userRepositoryMock.Verify(m => m.Find(It.IsAny<string>()), Times.Once);
        }

        [Fact]
        public async void GetLoginToken_RetornaAutenticacao_Sucesso()
        {
            var dto = GetValidLogin();
            var salt = 1;
            var user = new User
            {
                PasswordHash = UserService.CalculePasswordHash(dto.Password, salt),
                Salt = salt,
                Username = "user",
            };

            userRepositoryMock.Setup(m => m.Find(It.IsAny<string>())).ReturnsAsync(user);
            
            var result = await userService.GetLoginToken(dto);
            userRepositoryMock.Verify(m => m.Find(It.IsAny<string>()), Times.Once);
            Assert.NotNull(result);
        }

        private static LoginDto GetValidLogin()
        {
            return new LoginDto
            {
                Password = "password",
                Username = "username"
            };
        }
    }
}
