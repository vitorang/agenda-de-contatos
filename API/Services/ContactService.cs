using API.Models;
using API.Repositories.Interfaces;
using API.Services.Interfaces;
using API.Utils.Interfaces;

namespace API.Services
{
    public class ContactService(
        IContactRepository contactRepository,
        IUserContext userContext) : IContactService
    {
        public Task Delete(Contact contact)
        {
            throw new NotImplementedException();
        }

        public Task<Contact> Get(Contact contact)
        {
            throw new NotImplementedException();
        }

        public async Task<List<Contact>> List()
        {
            return await contactRepository.List(userId: userContext.CurrentUserId!);
        }

        public async Task Save(Contact contact)
        {
            Contact? savedContact = null;

            if (!string.IsNullOrEmpty(contact.Id))
            {
                savedContact = await contactRepository.Get(
                    userId: userContext.CurrentUserId!,
                    contactId: contact.Id);
            }

            contact.SetIds(savedContact);
            if (string.IsNullOrEmpty(contact.Id))
                await contactRepository.Create(contact);
            else
                await contactRepository.Update(contact);
        }
    }
}
