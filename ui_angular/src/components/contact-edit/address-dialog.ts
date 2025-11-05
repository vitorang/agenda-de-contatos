import { Component } from "@angular/core";
import { commonImports } from "../../helpers/common-imports";
import { states as _states, snackBarDuration } from "../../helpers/constants";
import { Address } from "../../models/contact";
import { MatDialogRef } from "@angular/material/dialog";
import ContactService from "../../services/contact-service";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
    selector: 'address-dialog',
    templateUrl: './address-dialog.html',
    styleUrl: './address-dialog.scss',
    imports: [commonImports],
    providers: [ContactService]
})
export class AddressDialog
{
    postalCode: string = '';
    state: string = '';
    city: string = '';
    neighborhood: string = '';
    street: string = '';
    number: number = NaN;
    complement: string = '';
    loading = false;

    constructor(
        private contactService: ContactService,
        private dialogRef: MatDialogRef<AddressDialog>,
        private snackBar: MatSnackBar){}

    ngOnDestroy(){
        this.contactService.abort();
    }

    get states()
    {
        return _states
    };

    

    isAddressValid()
    {
        return this.state
            && this.city
            && this.neighborhood
            && this.street
            && this.number;
    }

    isPostalCodeValid()
    {
        return !!this.postalCode.match(/^[0-9]{8}$/);
    }

    async searchPostalCode()
    {
        this.loading = true;
        try
        {
            var address = await this.contactService.searchAddress(this.postalCode);
            this.state = address.state;
            this.city = address.city;
            this.neighborhood = address.neighborhood;
            this.street = address.street;
        }
        catch
        {
            this.snackBar.open('Erro ao pesquisar CEP', '', {duration: snackBarDuration});
        }
        finally
        {
            this.loading = false;
        }

        
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