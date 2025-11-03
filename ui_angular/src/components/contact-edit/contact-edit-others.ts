import { Component, EventEmitter, Input, Output } from "@angular/core";
import { commonImports } from "../../shared";
import { KeyValueList } from "../../helpers/key-value-list";

@Component({
    selector: 'contact-edit-others',
    templateUrl: './contact-edit-others.html',
    styleUrl: './contact-edit-others.scss',
    imports: [commonImports]
})
export class ContactEditOthers
{
    @Input() type: 'email' | 'phone' = 'phone';
    @Input() initialValues: string[] = [];
    
    @Output() change = new EventEmitter<string[]>();
    
    titles = {
        'email': 'E-mails',
        'phone': 'Telefones'
    };

    labels = {
        'email': 'E-mail',
        'phone': 'Telefone'
    };

    
    items = new KeyValueList<string>();

    ngOnInit()
    {
        for (var v in this.initialValues)
            this.items.push(v);
    }

    add()
    {
        this.items.push('');
        this.change.emit(this.items.values);
    }

    remove(key: string)
    {
        this.items.remove(key);
        this.change.emit(this.items.values);
    }

    onChange(key: string, value: string)
    {
        this.items.setValue(key, value);
        this.change.emit(this.items.values);
    }
}