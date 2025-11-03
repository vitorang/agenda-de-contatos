import { Component } from "@angular/core";
import { commonImports } from "../shared";
import { Toolbar } from "../components/toolbar";

@Component({
    selector: 'contact-list-page',
    templateUrl: './contact-list-page.html',
    styleUrl: './contact-list-page.scss',
    imports: [commonImports, Toolbar]

})
export class ContactListPage
{

}