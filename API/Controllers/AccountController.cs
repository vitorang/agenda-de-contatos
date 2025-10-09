using API.DTOs;
using API.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("[controller]/[action]")]
    [ApiController]
    public class AccountController(IUserService userService) : ControllerBase
    {
        [AllowAnonymous]
        [HttpPost]
        public async Task<IActionResult> LoginAsync([FromBody] LoginDto loginDto)
        {
            var authToken = await userService.GetLoginToken(loginDto);
            return Ok(authToken);
        }

        [AllowAnonymous]
        [HttpPost]
        public async Task<IActionResult> RegisterAsync([FromBody] LoginDto loginDto)
        {
            await userService.Create(loginDto);

            var authToken = await userService.GetLoginToken(loginDto);
            return Ok(authToken);
        }

        [AllowAnonymous]
        [HttpPost]
        public IActionResult UsernameInUse([FromBody] LoginDto loginDto)
        {
            throw new NotImplementedException();
        }
    }
}
