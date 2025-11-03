import { Component } from "@angular/core";
import { MatToolbar } from "@angular/material/toolbar";

@Component({
    selector: 'toolbar',
    templateUrl: './toolbar.html',
    styleUrl: './toolbar.scss',
    imports: [MatToolbar]
})
export class Toolbar { }