using API.DTOs;
using API.Extensions;
using API.Services.Interfaces;
using API.Utils.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class ContactController(
        IUserContext userContext,
        IContactService contactService) : ControllerBase
    {
        [HttpGet]
        public async Task<IActionResult> List()
        {
            var contacts = await contactService.List();
            return Ok(contacts.OrderBy(c => c.Name).ToListDto());
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(string id)
        {
            var contact = await contactService.Get(id);
            return Ok(contact.ToDto());
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(string id)
        {
            await contactService.Delete(id);
            return Ok();
        }

        [HttpPost]
        public async Task<IActionResult> Save([FromBody] ContactDto contactDto)
        {
            var model = contactDto.ToModel(userId: userContext.CurrentUserId!);
            await contactService.Save(model);
            return Ok(model.ToDto());
        }
    }
}
