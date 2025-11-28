using API.DTOs;
using API.Models;
using API.Repositories.Interfaces;
using API.Services.Interfaces;
using API.Utils;
using API.Utils.Interfaces;
using System.Security.Cryptography;
using System.Text;
using System.Text.RegularExpressions;

namespace API.Services
{
    public partial class UserService(IUserRepository userRepository, IUserContext userContext) : IUserService
    {
        public async Task<bool> CheckUsernameInUse(string username)
        {
            return await userRepository.Find(username: username) != null;
        }

        public async Task Create(LoginDto loginDto)
        {
            Validators.Match(nameof(loginDto.Username), UsernameRegex(), loginDto.Username);
            Validators.Length(nameof(loginDto.Username), loginDto.Username, 3, 15);
            Validators.Length(nameof(loginDto.Password), loginDto.Password, 3, 15);

            var user = await userRepository.Find(username: loginDto.Username);
            Validators.NotFound(nameof(loginDto.Username), loginDto.Username, user);

            var salt = new Random().Next();
            user = new User
            {
                Username = loginDto.Username,
                Salt = salt,
                PasswordHash = CalculePasswordHash(loginDto.Password, salt)
            };

            await userRepository.Create(user);
        }

        public async Task<AuthDto> GetLoginToken(LoginDto loginDto)
        {
            var user = await userRepository.Find(username: loginDto.Username);
            
            if (user != null)
            {
                if (user.PasswordHash != CalculePasswordHash(loginDto.Password, user.Salt))
                    user = null;
            }

            Validators.Found(nameof(loginDto.Username), loginDto.Username, user);

            return new AuthDto
            {
                Token = userContext.CreateAuthToken(user!.Id),
                ExpiryMinutes = userContext.ExpiryMinutes
            };    
        }

        public static string CalculePasswordHash(string password, int salt)
        {
            password = $"{salt}{password}{salt}";
            byte[] bytes = SHA256.HashData(Encoding.UTF8.GetBytes(password));

            StringBuilder builder = new();
            for (int i = 0; i < bytes.Length; i++)
                builder.Append(bytes[i].ToString("x2"));

            return builder.ToString();
        }

        [GeneratedRegex("^[a-zA-Z0-9]+$")]
        private static partial Regex UsernameRegex();
    }
}
