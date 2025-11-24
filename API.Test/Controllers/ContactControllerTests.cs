using API.DTOs;
using API.Models;
using Microsoft.AspNetCore.Mvc;
using Moq;

namespace API.Test.Controllers
{
    public class ContactControllerTests : ApiTest
    {
        [Fact]
        public async void List_ContatosOrdenados_Sucesso()
        {
            Contact contactA = new() { Name = "A", UserId = string.Empty, Id = "ID A" };
            Contact contactB = new() { Name = "B", UserId = string.Empty, Id = "ID B" };
            var list = new List<Contact>() { contactB, contactA };
            contactServiceMock.Setup(m => m.List()).ReturnsAsync(list);

            var result = await contactController.List();
            Assert.NotNull(result);
            Assert.IsType<OkObjectResult>(result);

            var dtos = ((result as OkObjectResult)!.Value as IEnumerable<ListItemDto>)!.ToList();
            Assert.Equal(contactA.Name, dtos[0].Label);
            Assert.Equal(contactA.Id, dtos[0].Value);
            Assert.Equal(contactB.Name, dtos[1].Label);
            Assert.Equal(contactB.Id, dtos[1].Value);
        }

        [Fact]
        public async void Get_ContatoObtido_Sucesso()
        {
            Contact contact = new() { UserId = string.Empty, Name = "Name", Id = "ID" };

            contactServiceMock.Setup(m => m.Get(It.IsAny<string>())).ReturnsAsync(contact);
            var result = await contactController.Get(string.Empty);
            Assert.NotNull(result);
            Assert.IsType<OkObjectResult>(result);

            var dto = ((result as OkObjectResult)!.Value as ContactDto)!;
            Assert.Equal(contact.Name, dto.Name);
            Assert.Equal(contact.Id, dto.Id);
        }

        [Fact]
        public async void Delete_ExclusaoExecutada_Sucesso()
        {
            var result = await contactController.Delete(string.Empty);
            Assert.NotNull(result);
            Assert.IsType<OkResult>(result);
            contactServiceMock.Verify(m => m.Delete(It.IsAny<string>()), Times.Once);
        }

        [Fact]
        public async void Save_ContatoObtido_Sucesso()
        {
            var contactId = "ID";
            var contactName = "Name";

            ContactDto sentDto = new()
            {
                Addresses = [],
                Emails = [],
                Id = contactId,
                Name = contactName,
                PhoneNumbers = [],
            };

            Contact contact = new()
            {
                Id = contactId,
                Name = contactName,
                UserId = string.Empty,
            };

            userContextMock.Setup(m => m.CurrentUserId).Returns("UserId");

            var result = await contactController.Save(sentDto);
            Assert.NotNull(result);
            Assert.IsType<OkObjectResult>(result);
            userContextMock.Verify(m => m.CurrentUserId, Times.Once);
            contactServiceMock.Verify(m => m.Save(It.IsAny<Contact>()), Times.Once);

            var receivedDto = ((result as OkObjectResult)!.Value as ContactDto)!;
            Assert.Equal(sentDto.Id, receivedDto.Id);
            Assert.Equal(sentDto.Name, receivedDto.Name);
        }
    }
}
