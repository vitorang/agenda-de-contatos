import { Component, EventEmitter, inject, Input, Output } from "@angular/core";
import { commonImports } from "../../helpers/common-imports";
import { Address } from "../../models/contact";
import { KeyValueList } from "../../helpers/key-value-list";
import { MatDialog } from "@angular/material/dialog";
import { AddressDialog } from "./address-dialog";

@Component({
    selector: 'contact-edit-addresses',
    templateUrl: './contact-edit-addresses.html',
    styleUrl: './contact-edit-addresses.scss',
    imports: [commonImports]
})
export class ContactEditAddresses
{
    @Input() initialValues: Address[] = [];
    @Output() change = new EventEmitter<Address[]>();
    items = new KeyValueList<Address>();
    readonly dialog = inject(MatDialog);
    
    add()
    {
        const dialogRef = this.dialog.open(AddressDialog, {
            backdropClass: 'dialog-backdrop',
        });
        dialogRef.afterClosed().subscribe((address: Address | null) => {
            if (address)
                this.items.push(address);
        });
    }
    
    remove(key: string)
    {
        this.items.remove(key);
        this.change.emit(this.items.values);
    }
    
    addressToString(addr: Address)
    {
        let line1 = `${addr.street}, n° ${addr.number}`;
        if (addr.complement)
            line1 += `, ${addr.complement}`;
        
        let line2 = addr.neighborhood;
        let line3 = `${addr.city} - ${addr.state}`;
        
        return [line1, line2, line3].join('\n');
    }
}