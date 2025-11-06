import type Contact from "../models/Contact";
import type { Address } from "../models/Contact";
import type ListItem from "../models/ListItem";
import ApiService from "./ApiService";

export default class ContactService extends ApiService
{
    async delete(contactId: string)
    {
        await this.httpDelete<Contact>(`contact/${contactId}`);
    }

    async get(contactId: string)
    {
        return (await this.httpGet<Contact>(`contact/${contactId}`)).data;
    }

    async list()
    {
        return (await this.httpGet<ListItem[]>('contact')).data;
    }

    async save(contact: Contact)
    {
        return (await this.httpPost<Contact>('contact', contact)).data;
    }

    async searchAddress(postalCode: string)
    {
        return (await this.httpGet<Address>(`postalCode/${postalCode}`)).data;
    }
}