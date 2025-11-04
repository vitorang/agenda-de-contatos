import { Component } from "@angular/core";
import { commonImports } from "../shared";
import { Location } from '@angular/common';
import { ContactEditAddresses } from "../components/contact-edit/contact-edit-addresses";
import { ContactEditOthers } from "../components/contact-edit/contact-edit-others";
import { ContactEditProfile } from "../components/contact-edit/contact-edit-profile";
import { PageContent } from "../components/page-content";

@Component({
    selector: 'contact-edit-page',
    styleUrl: './contact-edit-page.scss',
    templateUrl: './contact-edit-page.html',
    imports: [commonImports, PageContent, ContactEditAddresses, ContactEditOthers, ContactEditProfile]
})
export class ContactEditPage
{
    constructor(private location: Location)
    {

    }

    goBack()
    {
        this.location.back();
    }
}