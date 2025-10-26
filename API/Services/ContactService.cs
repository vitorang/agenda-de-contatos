using API.Models;
using API.Repositories.Interfaces;
using API.Services.Interfaces;
using API.Utils;
using API.Utils.Interfaces;

namespace API.Services
{
    public class ContactService(
        IContactRepository contactRepository,
        IUserContext userContext) : IContactService
    {
        private string UserId
        {
            get
            {
                return userContext.CurrentUserId!;
            }
        }

        public async Task Delete(string contactId)
        {
            await contactRepository.Delete(userId: UserId, contactId: contactId);
        }

        public async Task<Contact> Get(string contactId)
        {
            var contact = await contactRepository.Get(userId: UserId, contactId: contactId, withData: true);
            Validators.Found(nameof(contactId), contactId, contact);
            return contact!;
        }

        public async Task<List<Contact>> List()
        {
            return await contactRepository.List(userId: UserId);
        }

        public async Task Save(Contact contact)
        {
            Contact? savedContact = null;

            if (!string.IsNullOrEmpty(contact.Id))
            {
                savedContact = await contactRepository.Get(
                    userId: UserId,
                    contactId: contact.Id);

                Validators.Found(nameof(contact.Id), contact.Id, savedContact);
                Validators.Owner(nameof(Contact), UserId, savedContact!.UserId);
            }

            contact.SetIds(savedContact);
            if (string.IsNullOrEmpty(contact.Id))
                await contactRepository.Create(contact);
            else
                await contactRepository.Update(contact);
        }
    }
}
