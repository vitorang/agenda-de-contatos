using API.Models;

namespace API.Utils.Interface
{
    public interface IUserContext
    {
        public string? CurrentUserId { get; }

        public string CreateAuthToken(string userId);

        public int ExpiryMinutes { get; }
    }
}
