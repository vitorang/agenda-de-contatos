import { Component } from "@angular/core";
import { commonImports } from "../helpers/common-imports";
import { ContactEditAddresses } from "../components/contact-edit/contact-edit-addresses";
import { ContactEditOthers } from "../components/contact-edit/contact-edit-others";
import { ContactEditProfile } from "../components/contact-edit/contact-edit-profile";
import { PageContent } from "../components/page-content";
import { ActivatedRoute, Router } from "@angular/router";
import ContactService from "../services/contact-service";
import { RequestStatus, snackBarDuration } from "../helpers/constants";
import { MatSnackBar } from "@angular/material/snack-bar";
import Contact, { Address } from "../models/contact";

@Component({
    selector: 'contact-edit-page',
    styleUrl: './contact-edit-page.scss',
    templateUrl: './contact-edit-page.html',
    imports: [commonImports, PageContent, ContactEditAddresses, ContactEditOthers, ContactEditProfile],
    providers: [ContactService]
})
export class ContactEditPage
{
    constructor(
        private contactService: ContactService,
        private router: Router,
        private route: ActivatedRoute,
        private snackBar: MatSnackBar,
    ) {}

    private requestStatus = RequestStatus.LOADED;
    contactId = '';
    contactName = '';
    phones: string[] = [];
    emails: string[] = [];
    addresses: Address[] = [];

    get disabled()
    {
        return this.requestStatus != RequestStatus.LOADED;
    }

    ngOnInit()
    {
        this.contactId = this.route.snapshot.paramMap.get('id') ?? '';
        if (this.contactId)
            this.load();
    }

    ngOnDestroy()
    {
        this.contactService.abort();
    }
    
    goBack()
    {
        this.router.navigate(['../']);
    }

    async save()
    {
        var contact: Contact = {
            addresses: this.addresses,
            emails: this.emails,
            id: this.contactId,
            name: this.contactName,
            phoneNumbers: this.phones
        }

        contact = await this.contactService.save(contact);
        this.contactId = contact.id;
    }

    async exclude()
    {
        await this.contactService.delete(this.contactId);
        this.goBack();
    }

    private async load()
    {
        this.requestStatus = RequestStatus.LOADING;

        try
        {
            var contact = await this.contactService.get(this.contactId);
            this.contactId = contact.id;
            this.contactName = contact.name;
            this.addresses = contact.addresses;
            this.emails = contact.emails;
            this.phones = contact.phoneNumbers;

            this.requestStatus = RequestStatus.LOADED;
        }
        catch
        {
            this.requestStatus = RequestStatus.ERROR;
            this.showError();
        }
    }

    private showError()
    {
        this.snackBar.open('Ocorreu um erro', '', {duration: snackBarDuration});
    }
}