import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from "@angular/core";
import { commonImports } from "../../helpers/common-imports";
import { KeyValueList } from "../../helpers/key-value-list";

@Component({
    selector: 'contact-edit-others',
    templateUrl: './contact-edit-others.html',
    styleUrl: './contact-edit-others.scss',
    imports: [commonImports]
})
export class ContactEditOthers implements OnChanges
{
    @Input() type: 'email' | 'phone' = 'phone';
    @Input() disabled = false;
    @Input() value: string[] = [];
    @Output() valueChange = new EventEmitter<string[]>();
        
    titles = {
        'email': 'E-mails',
        'phone': 'Telefones'
    };

    labels = {
        'email': 'E-mail',
        'phone': 'Telefone'
    };

    items = new KeyValueList<string>();

    get validItems()
    {
        return this.items.values.filter(i => i.trim());
    }

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
        this.items.push('');
        this.valueChange.emit(this.validItems);
    }

    remove(key: string)
    {
        this.items.remove(key);
        this.valueChange.emit(this.validItems);
    }

    onChange(key: string, value: string)
    {
        this.items.setValue(key, value);
        this.valueChange.emit(this.validItems);
    }
}