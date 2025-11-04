import { Component } from "@angular/core";
import { commonImports } from "../helpers/common-imports";
import { PageContent } from "../components/page-content";
import { Router } from "@angular/router";

@Component({
    selector: 'contact-list-page',
    templateUrl: './contact-list-page.html',
    styleUrl: './contact-list-page.scss',
    imports: [commonImports, PageContent]

})
export class ContactListPage
{
    constructor(private router: Router){}

    goToEdit(contactId?: string)
    {
        if (contactId)
            this.router.navigate(['edit', contactId]);
        else
            this.router.navigate(['create']);
    }
}