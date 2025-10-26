import type Contact from "../models/Contact";
import type { Address } from "../models/Contact";
import type ListItem from "../models/ListItem";
import ApiService from "./ApiService";

export default class ContactService extends ApiService
{
    async list()
    {
        return (await this.httpGet<ListItem[]>('contact/list')).data;
    }

    async save(contact: Contact)
    {
        return (await this.httpPost<Contact>('contact/save', contact)).data;
    }

    async searchAddress(postalCode: string)
    {
        return (await this.httpGet<Address>('contact/searchAddress', { postalCode })).data;
    }
}