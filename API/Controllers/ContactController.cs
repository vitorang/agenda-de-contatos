using API.DTOs;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("[controller]/[action]")]
    [ApiController]
    public class ContactController : ControllerBase
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
    }
}
