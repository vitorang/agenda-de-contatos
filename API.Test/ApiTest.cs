using API.Clients.Interfaces;
using API.Controllers;
using API.Repositories.Interfaces;
using API.Services;
using API.Services.Interfaces;
using API.Utils.Interfaces;
using Moq;

namespace API.Test
{
    public abstract class ApiTest
    {
        public readonly Mock<IUserContext> userContextMock = new();
        public readonly Mock<IHttpClient> httpClientMock = new();

        public readonly Mock<IContactRepository> contactRepositoryMock = new();
        public readonly Mock<IUserRepository> userRepositoryMock = new();

        public readonly Mock<IContactService> contactServiceMock = new();
        public readonly Mock<IUserService> userServiceMock = new();
        public readonly Mock<IViaCepService> viaCepServiceMock = new();

        public readonly ContactService contactService;
        public readonly UserService userService;
        public readonly ViaCepService viaCepService;

        public readonly AccountController accountController;
        public readonly ContactController contactController;
        public readonly PostalCodeController postalCodeController;

        public ApiTest()
        {
            contactService = new(contactRepository: contactRepositoryMock.Object, userContext: userContextMock.Object);
            userService = new(userRepository: userRepositoryMock.Object, userContext: userContextMock.Object);
            viaCepService = new(httpClient: httpClientMock.Object);

            accountController = new(userService: userServiceMock.Object);
            contactController = new(userContext: userContextMock.Object, contactService: contactServiceMock.Object);
            postalCodeController = new(viaCepService: viaCepServiceMock.Object);
        }
    }
}