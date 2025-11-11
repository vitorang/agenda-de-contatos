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
        public async Task<IActionResult> Login([FromBody] LoginDto loginDto)
        {
            var authToken = await userService.GetLoginToken(loginDto);
            return Ok(authToken);
        }

        [AllowAnonymous]
        [HttpPost]
        public async Task<IActionResult> Register([FromBody] LoginDto loginDto)
        {
            await userService.Create(loginDto);

            var authToken = await userService.GetLoginToken(loginDto);
            return Ok(authToken);
        }

        [AllowAnonymous]
        [HttpGet]
        public async Task<IActionResult> UsernameInUse(string username)
        {
            var used = await userService.CheckUsernameInUse(username);
            return Ok(used);
        }
    }
}
