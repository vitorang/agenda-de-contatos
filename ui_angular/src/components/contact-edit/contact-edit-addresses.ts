import { Component, EventEmitter, inject, Input, OnChanges, Output, SimpleChanges } from "@angular/core";
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
export class ContactEditAddresses implements OnChanges
{
    @Input() value: Address[] = [];
    @Output() valueChange = new EventEmitter<Address[]>();
    @Input() disabled = false;
    items = new KeyValueList<Address>();
    readonly dialog = inject(MatDialog);

    ngOnChanges(changes: SimpleChanges) {
        if (changes['disabled'])
            this.setItems();
    }

    ngOnInit()
    {
       this.setItems();
    }

    setItems()
    {
        this.items.clear();
        for (var item of this.value)
            this.items.push(item);
    }
    
    add()
    {
        const dialogRef = this.dialog.open(AddressDialog, {
            backdropClass: 'dialog-backdrop',
        });
        dialogRef.afterClosed().subscribe((address: Address | null) => {
            if (address)
            {
                this.items.push(address);
                this.valueChange.emit(this.items.values);
            }
        });
    }
    
    remove(key: string)
    {
        this.items.remove(key);
        this.valueChange.emit(this.items.values);
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