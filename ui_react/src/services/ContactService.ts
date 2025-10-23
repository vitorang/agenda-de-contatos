import type { Address } from "../models/Contact";
import ApiService from "./ApiService";

export default class ContactService extends ApiService
{
    async searchAddress(postalCode: string)
    {
        return (await this.httpGet<Address>('contact/searchAddress', { postalCode })).data;
    }
}