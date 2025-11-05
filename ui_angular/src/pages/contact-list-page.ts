import { Component } from "@angular/core";
import { commonImports } from "../helpers/common-imports";
import { PageContent } from "../components/page-content";
import { Router } from "@angular/router";
import ContactService from "../services/contact-service";
import { AccountService } from "../services/account-service";
import { RequestStatus } from "../helpers/constants";
import ListItem from "../models/list-item";

@Component({
    selector: 'contact-list-page',
    templateUrl: './contact-list-page.html',
    styleUrl: './contact-list-page.scss',
    imports: [commonImports, PageContent],
    providers: [AccountService, ContactService],
})
export class ContactListPage
{
    constructor(
        private accountService: AccountService,
        private contactService: ContactService,
        private router: Router
    ){}

    private requestStatus = RequestStatus.LOADING;
    contacts: ListItem[] = [];

    get status()
    {
        return {
            loading: this.requestStatus == RequestStatus.LOADING,
            loaded: this.requestStatus == RequestStatus.LOADED,
            error: this.requestStatus == RequestStatus.ERROR,
        };
    }

    ngOnInit()
    {
        this.load();
    }
    
    ngOnDestroy()
    {
        this.accountService.abort();
        this.contactService.abort();
    }

    async load()
    {
        try
        {
            this.contacts = await this.contactService.list();
            this.requestStatus = RequestStatus.LOADED;
        }
        catch
        {
            this.requestStatus = RequestStatus.ERROR;
        }
    }
    
    goToEdit(contactId?: string)
    {
        if (contactId)
            this.router.navigate(['edit', contactId]);
        else
            this.router.navigate(['create']);
    }
    
    logout()
    {
        this.accountService.logout();
    }
}