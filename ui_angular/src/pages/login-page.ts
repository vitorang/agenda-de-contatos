import { Component } from "@angular/core";
import { commonImports } from "../helpers/common-imports";
import { UpperCasePipe } from "@angular/common";
import { AccountService } from "../services/account-service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { snackBarDuration } from "../helpers/constants";
import { HttpErrorResponse } from "@angular/common/http";

@Component({
    selector: 'login-page',
    templateUrl: './login-page.html',
    styleUrl: './login-page.scss',
    imports: [commonImports, UpperCasePipe],
    providers: [AccountService],
})
export class LoginPage
{
    username = '';
    password = '';
    isRegister = false;
    loading = false;
    
    constructor(
        private accountService: AccountService,
        private router: Router,
        private snackBar: MatSnackBar
    ){}

    ngOnDestroy()
    {
        this.accountService.abort();
    }
    
    toggleRegister()
    {
        this.isRegister = !this.isRegister;
    }

    get toggleButtonText() {
        return this.isRegister ? 'Possui conta?' : 'Cadastre-se';
    }

    get submitButtonText() {
        return this.isRegister ? 'Registrar' : 'Entrar';
    }
    
    async submit()
    {
        try
        {
            this.loading = true;
            var {username, password} = this;

            if (this.isRegister)
            {
                await this.validateRegister();
                await this.accountService.register({username, password})
            }
            else
                await this.accountService.login({username, password})
                
            this.router.navigate(['/']);
        }
        catch (error: unknown)
        {
            var message = 'Ocorreu um erro';

            if (typeof error == 'string') {
                message = error;
            }
            else if (error instanceof HttpErrorResponse) {
                if (error.status == 404)
                    message = 'Usuário ou senha incorretos';
            }

            this.snackBar.open(message, '', {duration: snackBarDuration});
        }
        finally
        {
            this.loading = false;
        }
    }

    async validateRegister()
    {
        if (!this.username.match(/^[a-z0-9]{3,15}$/))
            throw 'Usuário deve ter de 3 a 15 letras e números';

        if (!this.password.match(/^.{3,15}$/))
            throw 'Senha deve ter de 3 a 15 caracteres';

        if (await this.accountService.checkInUse(this.username))
            throw 'Nome de usuário está em uso';
    }
}