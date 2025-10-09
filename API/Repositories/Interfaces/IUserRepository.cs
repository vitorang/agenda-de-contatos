using API.Models;

namespace API.Repositories.Interfaces
{
    public interface IUserRepository
    {
        public Task<User?> Find(string username);

        public Task Create(User user);
    }
}
