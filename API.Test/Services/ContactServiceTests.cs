using API.Models;
using API.Utils;
using Moq;

namespace API.Test.Services
{
    public class ContactServiceTests : ApiTest
    {
        private readonly string CurrentUserId = "currentUserId";

        public ContactServiceTests() {
            userContextMock.Setup(m => m.CurrentUserId).Returns(CurrentUserId);
        }


        [Fact]
        public async void Delete_ExclusaoExecutada_Sucesso()
        {
            await contactService.Delete("id");
            contactRepositoryMock.Verify(m => m.Delete(It.IsAny<string>(), It.IsAny<string>()), Times.Once);
        }

        [Fact]
        public async void Get_ContatoNaoEncontrado_Erro()
        {
            await Assert.ThrowsAsync<ApiException>(() => contactService.Get(contactId: "id"));
            contactRepositoryMock.Verify(m => m.Get(It.IsAny<string>(), It.IsAny<string>(), It.IsAny<bool>()), Times.Once);
        }


        [Fact]
        public async void Get_RetornaContato_Sucesso()
        {
            contactRepositoryMock.Setup(m => m.Get(It.IsAny<string>(), It.IsAny<string>(), It.IsAny<bool>()))
                .ReturnsAsync(GetValidContact(CurrentUserId, "1"));

            var contact = await contactService.Get(contactId: "id");
            contactRepositoryMock.Verify(m => m.Get(It.IsAny<string>(), It.IsAny<string>(), It.IsAny<bool>()), Times.Once);
        }

        [Fact]
        public async void List_RetornaContatos_Sucesso()
        {
            var data = new List<Contact> {
                GetValidContact(CurrentUserId, "0"),
                GetValidContact(CurrentUserId, "1")
            };

            
            contactRepositoryMock.Setup(m => m.List(It.IsAny<string>())).ReturnsAsync(data);

            var result = await contactService.List();
            contactRepositoryMock.Verify(m => m.List(It.IsAny<string>()), Times.Once);
            Assert.Equal("0", result[0].Id);
            Assert.Equal("1", result[1].Id);
        }

        [Fact]
        public async void Save_IdVazio_Sucesso()
        {
            await contactService.Save(GetValidContact(CurrentUserId, string.Empty));
            contactRepositoryMock.Verify(m => m.Get(It.IsAny<string>(), It.IsAny<string>(), It.IsAny<bool>()), Times.Never);
            contactRepositoryMock.Verify(m => m.Create(It.IsAny<Contact>()), Times.Once);
            contactRepositoryMock.Verify(m => m.Update(It.IsAny<Contact>()), Times.Never);
        }

        [Fact]
        public async void Save_IdPreenchido_Sucesso()
        {
            contactRepositoryMock.Setup(m => m.Get(It.IsAny<string>(), It.IsAny<string>(), It.IsAny<bool>()))
                .ReturnsAsync(GetValidContact(CurrentUserId, "1"));

            await contactService.Save(GetValidContact(CurrentUserId, "1"));
            contactRepositoryMock.Verify(m => m.Get(It.IsAny<string>(), It.IsAny<string>(), It.IsAny<bool>()), Times.Once);
            contactRepositoryMock.Verify(m => m.Create(It.IsAny<Contact>()), Times.Never);
            contactRepositoryMock.Verify(m => m.Update(It.IsAny<Contact>()), Times.Once);
        }

        [Fact]
        public async void Save_IdPreenchido_ContatoNaoEncontrado_Erro()
        {
            await Assert.ThrowsAsync<ApiException>(() => contactService.Save(GetValidContact(CurrentUserId, "1")));
            contactRepositoryMock.Verify(m => m.Get(It.IsAny<string>(), It.IsAny<string>(), It.IsAny<bool>()), Times.Once);
            contactRepositoryMock.Verify(m => m.Create(It.IsAny<Contact>()), Times.Never);
            contactRepositoryMock.Verify(m => m.Update(It.IsAny<Contact>()), Times.Never);
        }

        [Fact]
        public async void Save_IdPreenchido_ContatoDeOutroUsuario_Erro()
        {
            contactRepositoryMock.Setup(m => m.Get(It.IsAny<string>(), It.IsAny<string>(), It.IsAny<bool>()))
                .ReturnsAsync(GetValidContact($"not {CurrentUserId}", "1"));

            await Assert.ThrowsAsync<ApiException>(() => contactService.Save(GetValidContact("CurrentUserId", "1")));
            contactRepositoryMock.Verify(m => m.Get(It.IsAny<string>(), It.IsAny<string>(), It.IsAny<bool>()), Times.Once);
            contactRepositoryMock.Verify(m => m.Create(It.IsAny<Contact>()), Times.Never);
            contactRepositoryMock.Verify(m => m.Update(It.IsAny<Contact>()), Times.Never);
        }

        private static Contact GetValidContact(string userId, string contactId)
        {
            return new Contact
            {
                Name = $"Contact {contactId}",
                Id = contactId,
                UserId = userId,
            };
        }
    }
}
