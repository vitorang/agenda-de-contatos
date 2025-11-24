using API.Models;
using Microsoft.AspNetCore.Mvc;
using Moq;
using System.Net.Sockets;

namespace API.Test.Controllers
{
    public class PostalCodeControllerTests : ApiTest
    {
        [Fact]
        public async void Search_EnderecoObtido_Sucesso()
        {
            var address = new ContactAddress
            {
                City = string.Empty,
                Complement = string.Empty,
                Neighborhood = string.Empty, 
                Number = 1,
                State = string.Empty,
                Street = string.Empty,
            };

            viaCepServiceMock.Setup(m => m.Search(It.IsAny<string>())).ReturnsAsync(address);

            var result = await postalCodeController.Search(code: string.Empty);

            viaCepServiceMock.Verify(m => m.Search(It.IsAny<string>()), Times.Once);
            Assert.IsType<OkObjectResult>(result);
            Assert.Equal(address, (result as OkObjectResult)?.Value);
        }
    }
}
