import { Component } from "@angular/core";
import { commonImports } from "../shared";
import { PageContent } from "../components/page-content";

@Component({
    selector: 'contact-list-page',
    templateUrl: './contact-list-page.html',
    styleUrl: './contact-list-page.scss',
    imports: [commonImports, PageContent]

})
export class ContactListPage
{

}