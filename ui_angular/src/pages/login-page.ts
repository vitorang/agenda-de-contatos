import { Component } from "@angular/core";
import { commonImports } from "../helpers/common-imports";
import { UpperCasePipe } from "@angular/common";

@Component({
    selector: 'login-page',
    templateUrl: './login-page.html',
    styleUrl: './login-page.scss',
    imports: [commonImports, UpperCasePipe]
})
export class LoginPage
{
    username = '';
    password = '';
}