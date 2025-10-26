using API.DTOs;
using API.Extensions;
using API.Services.Interfaces;
using API.Utils.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("[controller]/[action]")]
    [ApiController]
    public class ContactController(
        IUserContext userContext,
        IContactService contactService,
        IViaCepService viaCepService) : ControllerBase
    {
        [HttpGet]
        public async Task<IActionResult> ListAsync()
        {
            var contacts = await contactService.List();
            return Ok(contacts.ToListDto());
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
        public async Task<IActionResult> Save([FromBody] ContactDto contactDto)
        {
            var model = contactDto.ToModel(userId: userContext.CurrentUserId!);
            await contactService.Save(model);
            return Ok(model.ToDto());
        }

        [AllowAnonymous]
        [HttpGet]
        public async Task<IActionResult> SearchAddress(string postalCode)
        {
            return Ok(await viaCepService.Search(postalCode));
        }
    }
}
