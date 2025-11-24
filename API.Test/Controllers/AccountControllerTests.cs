using API.DTOs;
using Microsoft.AspNetCore.Mvc;
using Moq;

namespace API.Test.Controllers
{
    public class AccountControllerTests : ApiTest
    {
        private readonly AuthDto authDto = new() { ExpiryMinutes = 1, Token = string.Empty };

        [Fact]
        public async void Login_TokenObtido_Sucesso()
        {
            userServiceMock.Setup(m => m.GetLoginToken(It.IsAny<LoginDto>())).ReturnsAsync(authDto);

            var dto = new LoginDto { Username = string.Empty, Password = string.Empty };
            var result = await accountController.Login(dto);

            userServiceMock.Verify(m => m.GetLoginToken(It.IsAny<LoginDto>()), Times.Once);
            Assert.IsType<OkObjectResult>(result);
            Assert.Equal(authDto, (result as OkObjectResult)?.Value);
        }

        [Fact]
        public async void Register_UsuarioCriado_TokenObtido_Sucesso()
        {
            userServiceMock.Setup(m => m.GetLoginToken(It.IsAny<LoginDto>())).ReturnsAsync(authDto);

            var dto = new LoginDto { Username = string.Empty, Password = string.Empty };
            var result = await accountController.Register(dto);

            userServiceMock.Verify(m => m.Create(It.IsAny<LoginDto>()), Times.Once);
            userServiceMock.Verify(m => m.GetLoginToken(It.IsAny<LoginDto>()), Times.Once);
            Assert.IsType<OkObjectResult>(result);
            Assert.Equal(authDto, (result as OkObjectResult)?.Value);
        }

        [Fact]
        public async void UsernameInUse_UsernamePesquisado_Sucesso()
        {
            var expected = true;
            userServiceMock.Setup(m => m.CheckUsernameInUse(It.IsAny<string>())).ReturnsAsync(expected);

            var result = await accountController.UsernameInUse(string.Empty);

            userServiceMock.Verify(m => m.CheckUsernameInUse(It.IsAny<string>()), Times.Once);
            Assert.IsType<OkObjectResult>(result);
            Assert.Equal(expected, (result as OkObjectResult)?.Value);
        }

    }
}
