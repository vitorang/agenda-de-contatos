using API.DTOs;
using API.Models;
using Microsoft.IdentityModel.Tokens;
using System.Net;
using System.Net.Http.Headers;
using System.Net.Http.Json;

namespace API.Test.Integration.Tests
{
    public class ContactControllerTests(CustomWebApplicationFactory factory) : IClassFixture<CustomWebApplicationFactory>
    {
        const string baseRoute = "contact";
        const string loginRoute = "account/login";

        [Fact]
        public async Task Save_ContatoCriado_Sucesso()
        {
            var client = factory.Server.CreateClient();
            await Authenticate(client);
            await CreateContact(client, "Save_ContatoCriado_Sucesso");
        }

        [Fact]
        public async Task Save_DadosEditados_Sucesso()
        {
            var client = factory.Server.CreateClient();
            await Authenticate(client);

            var contact = await CreateContact(client, "Save_DadosEditados_Sucesso");
            contact.Emails.Add("test2@example.com");
            contact.PhoneNumbers.Add("(91) 2345-5678");
            contact.Name += " edit";
            contact.Addresses.First().City = "NewCity";

            var response = await client.PostAsJsonAsync(baseRoute, contact);
            Assert.Equal(HttpStatusCode.OK, response.StatusCode);

            var newContact = await response.Content.ReadFromJsonAsync<ContactDto>();
            Assert.NotNull(newContact);
            Assert.Equal(contact.Id, newContact.Id);
            Assert.Equal(contact.Name, newContact.Name);
            Assert.Equal(contact.Emails, newContact.Emails);
            Assert.Equal(contact.PhoneNumbers, newContact.PhoneNumbers);
            Assert.Equal(contact.Addresses.First().City, newContact.Addresses.First().City);
        }

        [Fact]
        public async Task Save_EditaContatoDeOutroUsuario_Erro()
        {
            var client = factory.Server.CreateClient();
            await Authenticate(client, withSecondaryUser: true);
            var contact = await CreateContact(client, "Save_DadosEditados_Sucesso");

            await Authenticate(client);
            var response = await client.PostAsJsonAsync(baseRoute, contact);
            Assert.Equal(HttpStatusCode.NotFound, response.StatusCode);
        }

        [Fact]
        public async Task List_ContatoRetornado_Sucesso()
        {
            var client = factory.Server.CreateClient();
            await Authenticate(client);
            var contact = await CreateContact(client, "List_ContatoRetornado_Sucesso");

            var items = await client.GetFromJsonAsync<IEnumerable<ListItemDto>>(baseRoute);
            Assert.NotNull(items);
            Assert.NotNull(items.FirstOrDefault(i => i.Value == contact.Id));
        }

        [Fact]
        public async Task List_ContatoDeOutroUsuarioNaoRetornado_Sucesso()
        {
            var client = factory.Server.CreateClient();
            await Authenticate(client, withSecondaryUser: true);
            var contact = await CreateContact(client, "List_ContatoDeOutroUsuarioNaoRetornado_Sucesso");

            await Authenticate(client);
            var items = await client.GetFromJsonAsync<IEnumerable<ListItemDto>>(baseRoute);
            Assert.NotNull(items);
            Assert.Null(items.FirstOrDefault(i => i.Value == contact.Id));
        }

        [Fact]
        public async Task Get_ContatoEncontrado_Sucesso()
        {
            var client = factory.Server.CreateClient();
            await Authenticate(client);
            var contactId = (await CreateContact(client, "Get_IdEncontrado_Sucesso")).Id;

            var contact = await client.GetFromJsonAsync<ContactDto>($"{baseRoute}/{contactId}");
            Assert.NotNull(contact);
            Assert.Equal(contact.Id, contactId);
        }

        [Fact]
        public async Task Get_ContatoNaoCadastrado_Erro()
        {
            var client = factory.Server.CreateClient();
            await Authenticate(client);
            var contactId = new string('0', 24);

            var response = await client.GetAsync($"{baseRoute}/{contactId}");
            Assert.Equal(HttpStatusCode.NotFound, response.StatusCode);
        }

        [Fact]
        public async Task Get_IdDeOutroUsuario_Erro()
        {
            var client = factory.Server.CreateClient();
            await Authenticate(client, withSecondaryUser: true);
            var contactId = (await CreateContact(client, "Get_IdDeOutroUsuario_Erro")).Id;

            await Authenticate(client);
            var response = await client.GetAsync($"{baseRoute}/{contactId}");
            Assert.Equal(HttpStatusCode.NotFound, response.StatusCode);
        }

        [Fact]
        public async Task Delete_ContatoRemovido_Sucesso()
        {
            var client = factory.Server.CreateClient();
            await Authenticate(client);
            var contactId = (await CreateContact(client, "Delete_ContatoRemovido_Sucesso")).Id;

            var response = await client.DeleteAsync($"{baseRoute}/{contactId}");
            Assert.Equal(HttpStatusCode.OK, response.StatusCode);

            var items = await client.GetFromJsonAsync<IEnumerable<ListItemDto>>(baseRoute);
            Assert.NotNull(items);
            Assert.Null(items.FirstOrDefault(i => i.Value == contactId));
        }

        private async Task Authenticate(HttpClient client, bool withSecondaryUser = false)
        {
            var dto = withSecondaryUser ? secondaryLoginDto : loginDto;
            var response = await client.PostAsJsonAsync(loginRoute, dto);
            Assert.Equal(HttpStatusCode.OK, response.StatusCode);

            var authDto = await response.Content.ReadFromJsonAsync<AuthDto>();
            Assert.NotNull(authDto);
            Assert.NotEmpty(authDto.Token);

            client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", authDto.Token);
        }

        private async Task<ContactDto> CreateContact(HttpClient client, string name)
        {
            var contact = new ContactDto
            {
                Id = "",
                Name = name,
                Addresses =
                [
                    new ContactAddress
                    {
                        City = "City",
                        Complement = "Complement",
                        Neighborhood = "Neighborhood",
                        Number = 1,
                        State = "State",
                        Street = "Street"
                    }
                ],
                Emails = ["test@example.com"],
                PhoneNumbers = ["(01) 2345-5678"],
            };

            var response = await client.PostAsJsonAsync(baseRoute, contact);
            Assert.Equal(HttpStatusCode.OK, response.StatusCode);

            var newContact = await response.Content.ReadFromJsonAsync<ContactDto>();
            Assert.NotNull(newContact);
            Assert.NotEmpty(newContact.Id);
            Assert.NotEmpty(newContact.Addresses);
            Assert.Equal(contact.Emails, newContact.Emails);
            Assert.Equal(contact.PhoneNumbers, newContact.PhoneNumbers);

            return newContact;
        }

        readonly LoginDto loginDto = new()
        {
            Username = "test",
            Password = "test"
        };

        readonly LoginDto secondaryLoginDto = new()
        {
            Username = "test2",
            Password = "test2"
        };
    }
}
