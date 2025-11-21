import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ContactEditOthers } from "./contact-edit-others";
import { first } from "rxjs";

describe('ContactEditOthers', () => {
    let component: ContactEditOthers;
    let fixture: ComponentFixture<ContactEditOthers>;

    let elements = {
        addButton: () => fixture.nativeElement.querySelector('[data-testid="add-button"]') as HTMLButtonElement,
        items: () => {
            return (Array.from(fixture.nativeElement.querySelectorAll('.item')) as HTMLDivElement[])
                .map(div => (
                {
                    input: div.querySelector('input') as HTMLInputElement,
                    removeButton: div.querySelector('button') as HTMLInputElement,
                }));
        },
        noItems: () => fixture.nativeElement.querySelector('[data-testid="no-items-warning"]') as HTMLElement,
        firstInputLabel: () => fixture.nativeElement.querySelector('.item mat-label') as HTMLElement | null,
    };

    beforeEach(() => {
        fixture = TestBed.createComponent(ContactEditOthers);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('Sem items exibe aviso', () => {
        component.value = [];
        component.setItems();
        fixture.detectChanges();

        let noItems = elements.noItems();
        expect(noItems).toBeDefined();
    });

    it('Com items não há aviso', () => {
        component.value = ['1'];
        component.setItems();
        fixture.detectChanges();

        let noItems = elements.noItems();
        expect(noItems).toBeNull();
    });

    it('Clica em adicionar, cria novo item', () => {
        let addButton = elements.addButton();
        expect(elements.items().length).toBe(0);

        addButton.click();
        fixture.detectChanges();
        expect(elements.items().length).toBe(1);

        addButton.click();
        fixture.detectChanges();
        expect(elements.items().length).toBe(2);
    });

    it('Clica em remover em posição, o remove', () => {
        const valueChangeSpy = spyOn(component.valueChange, 'emit')

        component.value = ['0', '1', '2', '3'];
        component.setItems();
        fixture.detectChanges();

        elements.items()[0].removeButton.click();
        fixture.detectChanges();
        expect(valueChangeSpy).toHaveBeenCalledWith(['1', '2', '3']);

        elements.items()[1].removeButton.click();
        fixture.detectChanges();
        expect(valueChangeSpy).toHaveBeenCalledWith(['1', '3']);
    });

    it('Label de input é de acordo com tipo do dado', () => {
        elements.addButton().click();
        
        component.type = 'email';
        fixture.detectChanges();
        expect(elements.firstInputLabel()?.textContent).toBe(component.labels['email']);

        component.type = 'phone';
        fixture.detectChanges();
        expect(elements.firstInputLabel()?.textContent).toBe(component.labels['phone']);
    })
});