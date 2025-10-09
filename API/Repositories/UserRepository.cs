using API.Models;
using API.Repositories.Interfaces;
using MongoDB.Driver;

namespace API.Repositories
{
    public class UserRepository(IMongoDatabase database) : IUserRepository
    {
        private readonly IMongoCollection<User> collection = database.GetCollection<User>("users");

        public async Task Create(User user)
        {
            user.Username = user.Username.ToLower();
            await collection.InsertOneAsync(user);
        }

        public async Task<User?> Find(string username)
        {
            username = username.ToLower();
            var users = await collection.FindAsync((user) => user.Username == username);
            return users.FirstOrDefault();
        }
    }
}
