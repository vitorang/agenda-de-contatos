import { Injectable } from "@angular/core";
import Contact, { Address } from "../models/contact";
import ListItem from "../models/list-item";
import ApiService from "./api-service";
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";

@Injectable()
export default class ContactService extends ApiService
{
    constructor(httpClient: HttpClient, router: Router) {
        super(httpClient, router);
    }

    async delete(contactId: string)
    {
        await this.toPromise(this.httpDelete<Contact>('contact/delete', { contactId }));
    }

    async get(contactId: string)
    {
        return await this.toPromise(this.httpGet<Contact>('contact/get', { contactId }));
    }

    async list()
    {
        return await this.toPromise(this.httpGet<ListItem[]>('contact/list'));
    }

    async save(contact: Contact)
    {
        return await this.toPromise(this.httpPost<Contact>('contact/save', contact));
    }

    async searchAddress(postalCode: string)
    {
        return await this.toPromise(this.httpGet<Address>('contact/searchAddress', { postalCode }));
    }
}