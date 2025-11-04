import { Component } from "@angular/core";
import { commonImports } from "../../helpers/common-imports";
import { states as _states } from "../constants/states";
import { Address } from "../../models/contact";
import { MatDialogRef } from "@angular/material/dialog";

@Component({
    selector: 'address-dialog',
    templateUrl: './address-dialog.html',
    styleUrl: './address-dialog.scss',
    imports: [commonImports]
})
export class AddressDialog
{
    postalCode: string = '';
    state: string = '';
    city: string = '';
    neighborhood: string = '';
    street: string = '';
    number: number | string = '';
    complement: string = '';

    constructor(private dialogRef: MatDialogRef<AddressDialog>){}

    get states()
    {
        return _states
    };

    isAddressValid()
    {
        var number = this.number.toString();

        return this.state
            && this.city
            && this.neighborhood
            && this.street
            && this.number
            && number.match(/^[0-9]+$/)
    }

    isPostalCodeValid()
    {
        return this.postalCode.match(/^[0-9]{8}$/);
    }

    searchPostalCode()
    {

    }

    close(add: boolean)
    {
        if (add)
        {
            var address: Address = {
                state: this.state, 
                city: this.city,
                neighborhood: this.neighborhood,
                street: this.street,
                number: this.number as number,
                complement: this.complement
            };

            return this.dialogRef.close(address);
        }

        this.dialogRef.close(null);
    }
}