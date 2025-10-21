using API.DTOs;
using API.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("[controller]/[action]")]
    [ApiController]
    public class ContactController(IViaCepService viaCepService) : ControllerBase
    {
        [HttpGet]
        public IActionResult List()
        {
            throw new NotImplementedException();
        }

        [HttpGet]
        public IActionResult Get(string contactId)
        {
            throw new NotImplementedException();
        }

        [HttpDelete]
        public IActionResult Delete(string contactId)
        {
            throw new NotImplementedException();
        }

        [HttpPost]
        public IActionResult Save([FromBody] ContactDto contactDto)
        {
            throw new NotImplementedException();
        }

        [AllowAnonymous]
        [HttpGet]
        public async Task<IActionResult> SearchAddress(string postalCode)
        {
            return Ok(await viaCepService.Search(postalCode));
        }
    }
}
