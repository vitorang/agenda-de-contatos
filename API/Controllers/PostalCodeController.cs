using API.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class PostalCodeController(IViaCepService viaCepService) : ControllerBase
    {
        [AllowAnonymous]
        [HttpGet("{code}")]
        public async Task<IActionResult> Search(string code)
        {
            return Ok(await viaCepService.Search(code));
        }
    }
}
