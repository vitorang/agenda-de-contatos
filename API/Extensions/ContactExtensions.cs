using API.DTOs;
using API.Models;

namespace API.Extensions
{
    public static class ContactExtensions
    {
        public static ContactDto ToDto(this Contact contact)
        {
            return new ContactDto
            {
                Id = contact.Id,
                Name = contact.Name,
                Addresses = contact.Data?.Addresses ?? [],
                Emails = contact.Data?.Emails ?? [],
                PhoneNumbers = contact.Data?.PhoneNumbers ?? []
            };
        }

        public static IEnumerable<ListItemDto> ToListDto(this IEnumerable<Contact> contacts)
        {
            return contacts.Select(c => new ListItemDto
            {
                Label = c.Name,
                Value = c.Id
            });
        }

        public static Contact ToModel(this ContactDto dto, string userId)
        {
            return new Contact
            {
                Id = dto.Id,
                Name = dto.Name,
                UserId = userId,
                Data = new ContactData
                {
                    ContactId = dto.Id,
                    Addresses = dto.Addresses ?? [],
                    Emails = dto.Emails ?? [],
                    PhoneNumbers = dto.PhoneNumbers ?? []
                }
            };
        }
    }
}
