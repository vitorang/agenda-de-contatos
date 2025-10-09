using API.Models.ProgramSettings;
using API.Utils.Interface;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace API.Utils
{
    public class UserContext(IHttpContextAccessor httpContextAccessor, IOptions<JwtSettings> jwtSettings) : IUserContext
    {
        public string? CurrentUserId
        {
            get
            {
                return httpContextAccessor.HttpContext?.User?.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            }
        }

        public string CreateAuthToken(string userId)
        {
            var settings = jwtSettings.Value;

            var claims = new List<Claim>
            {
                new(ClaimTypes.NameIdentifier, userId),
            };


            var key = Encoding.ASCII.GetBytes(settings.Key);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),

                Expires = DateTime.UtcNow.AddMinutes(settings.ExpiryMinutes),
                Issuer = settings.Issuer,
                Audience = settings.Audience,

                SigningCredentials = new SigningCredentials(
                    new SymmetricSecurityKey(key),
                    SecurityAlgorithms.HmacSha256Signature
                )
            };

            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }
    }
}
