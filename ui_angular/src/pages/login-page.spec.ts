import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { LoginPage } from "./login-page";
import { Router } from "@angular/router";
import { AccountService } from "../services/account-service";
import { MatSnackBar } from "@angular/material/snack-bar";

describe('LoginPage', () => {
    let component: LoginPage;
    let fixture: ComponentFixture<LoginPage>;
    let routerSpy: jasmine.SpyObj<Router>;
    let accountServiceSpy: jasmine.SpyObj<AccountService>;
    let snackBarSpy: jasmine.SpyObj<MatSnackBar>;

    var elements = {
        usernameInput: () => fixture.nativeElement.querySelector('[data-testid="username-input"]') as HTMLInputElement,
        passwordInput: () => fixture.nativeElement.querySelector('[data-testid="password-input"]') as HTMLInputElement,
        submitButton: () => fixture.nativeElement.querySelector('[data-testid="submit-button"]') as HTMLButtonElement,
        toggleButton: () => fixture.nativeElement.querySelector('[data-testid="toggle-button"]') as HTMLButtonElement,
    };
    
    beforeEach(waitForAsync(() => {
        routerSpy = jasmine.createSpyObj('Router', ['navigate']);
        accountServiceSpy = jasmine.createSpyObj('AccountService', ['checkInUse', 'login', 'register', 'abort']);
        snackBarSpy = jasmine.createSpyObj('MatSnackBar', ['open']);

        TestBed.configureTestingModule({
            imports: [LoginPage],
            providers: [
                { provide: Router, useValue: routerSpy },
                { provide: MatSnackBar, useValue: snackBarSpy },
                { provide: AccountService, useValue: accountServiceSpy }
            ]
        }).compileComponents();

        TestBed.overrideComponent(LoginPage, {
            set: {
                providers: [
                    { provide: AccountService, useValue: accountServiceSpy },
                    { provide: MatSnackBar, useValue: snackBarSpy } 
                ]
            }
        });
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(LoginPage);
        component = fixture.componentInstance;
        fixture.detectChanges(); 
    });
    
    it('Component criado', () => {
        expect(component).toBeDefined();
        
        for (var e of Object.values(elements))
            expect(e()).toBeDefined();;
    });
    
    it('Username e senha preenchidos habilita botão', () => {
        const username = elements.usernameInput();
        const password = elements.passwordInput();
        const submit = elements.submitButton();

        username.value = 'Username';
        username.dispatchEvent(new Event('input'));

        password.value = 'Password';
        password.dispatchEvent(new Event('input'));

        fixture.detectChanges();

        expect(submit.disabled).toBe(false);
    });

    it('Username em branco desabilita botão de formulário', () => {
        const username = elements.usernameInput();
        const password = elements.passwordInput();
        const submit = elements.submitButton();

        username.value = '';
        username.dispatchEvent(new Event('input'));

        password.value = 'Password';
        password.dispatchEvent(new Event('input'));

        fixture.detectChanges();

        expect(submit.disabled).toBe(true);

    });

    it('Senha em branco desabilita botão de formulário', () => {
        const username = elements.usernameInput();
        const password = elements.passwordInput();
        const submit = elements.submitButton();

        username.value = 'Username';
        username.dispatchEvent(new Event('input'));

        password.value = '';
        password.dispatchEvent(new Event('input'));

        fixture.detectChanges();

        expect(submit.disabled).toBe(true);
    });

    it('Alterna entre login e cadastro ao clicar no botão de alternar', () => {
        const toggleButton = elements.toggleButton();
        const toLogin = 'Possui conta?';
        const toRegister = 'Cadastre-se';

        expect(component.isRegister).toBe(false);
        expect(component.toggleButtonText).toBe(toRegister);

        toggleButton.click();
        fixture.detectChanges();
        expect(component.isRegister).toBe(true);
        expect(component.toggleButtonText).toBe(toLogin);

        toggleButton.click();
        fixture.detectChanges();
        expect(component.isRegister).toBe(false);
        expect(component.toggleButtonText).toBe(toRegister);
    });

    it('Erro no login exibe snackbar', async () => {
        accountServiceSpy.login.and.returnValue(Promise.reject());

        const username = elements.usernameInput();
        username.value = 'Password';
        username.dispatchEvent(new Event('input'));
        
        const password = elements.passwordInput();
        password.value = 'Password';
        password.dispatchEvent(new Event('input'));

        fixture.detectChanges();

        const submitButton = elements.submitButton();
        submitButton.click();

        await fixture.whenStable();

        expect(accountServiceSpy.login).toHaveBeenCalled();
        expect(routerSpy.navigate).not.toHaveBeenCalled();
        expect(snackBarSpy.open).toHaveBeenCalled();
    });

    it('Sucesso no login redireciona para /', async () => {
        accountServiceSpy.login.and.returnValue(Promise.resolve());

        const username = elements.usernameInput();
        username.value = 'Password';
        username.dispatchEvent(new Event('input'));
        
        const password = elements.passwordInput();
        password.value = 'Password';
        password.dispatchEvent(new Event('input'));

        fixture.detectChanges();

        const submitButton = elements.submitButton();
        submitButton.click();

        await fixture.whenStable();

        expect(accountServiceSpy.login).toHaveBeenCalled();
        expect(routerSpy.navigate).toHaveBeenCalledWith(['/']);
        expect(snackBarSpy.open).not.toHaveBeenCalled();
    });
});