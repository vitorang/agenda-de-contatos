import { Component, EventEmitter, Input, Output } from "@angular/core";
import { commonImports } from "../../shared";
import { Address } from "../../models/contact";
import { KeyValueList } from "../../helpers/key-value-list";

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

    add()
    {
        
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