using API.DTOs;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("[controller]/[action]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        [AllowAnonymous]
        [HttpPost]
        public IActionResult Login([FromBody] LoginDto loginDto)
        {
            throw new NotImplementedException();
        }

        [AllowAnonymous]
        [HttpPost]
        public IActionResult Register([FromBody] LoginDto loginDto)
        {
            throw new NotImplementedException();
        }

        [AllowAnonymous]
        [HttpPost]
        public IActionResult UsernameInUse([FromBody] LoginDto loginDto)
        {
            throw new NotImplementedException();
        }
    }
}
