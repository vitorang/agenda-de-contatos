using API.DTOs;

namespace API.Services.Interfaces
{
    public interface IAccountService
    {
        public Task Create(LoginDto loginDto);

        public Task Login(LoginDto loginDto);

        public Task<bool> CheckUsernameInUse(string username);
    }
}
