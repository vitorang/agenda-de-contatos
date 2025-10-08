using API.Models;

namespace API.Repositories.Interfaces
{
    public interface IAccountRepository
    {
        public Task<User?> Find(string username);

        public Task Create(User user);
    }
}
