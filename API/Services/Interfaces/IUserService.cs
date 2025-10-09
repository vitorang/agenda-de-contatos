using API.DTOs;

namespace API.Services.Interfaces
{
    public interface IUserService
    {
        public Task Create(LoginDto loginDto);

        public Task<string> GetLoginToken(LoginDto loginDto);

        public Task<bool> CheckUsernameInUse(string username);
    }
}
