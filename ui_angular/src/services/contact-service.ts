import { Injectable } from "@angular/core";
import Contact, { Address } from "../models/contact";
import ListItem from "../models/list-item";
import ApiService from "./api-service";
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { LocalStorage } from "../helpers/local-storage";

@Injectable()
export default class ContactService extends ApiService
{
    constructor(httpClient: HttpClient, router: Router, storage: LocalStorage) {
        super(httpClient, router, storage);
    }

    async delete(contactId: string)
    {
        await this.toPromise(this.httpDelete<Contact>(`contact/${contactId}`));
    }

    async get(contactId: string)
    {
        return await this.toPromise(this.httpGet<Contact>(`contact/${contactId}`));
    }

    async list()
    {
        return await this.toPromise(this.httpGet<ListItem[]>('contact'));
    }

    async save(contact: Contact)
    {
        return await this.toPromise(this.httpPost<Contact>('contact', contact));
    }

    async searchAddress(postalCode: string)
    {
        return await this.toPromise(this.httpGet<Address>(`postalCode/${postalCode}`));
    }
}