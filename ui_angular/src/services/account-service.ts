import { Injectable } from "@angular/core";
import Auth from "../models/auth";
import Login from "../models/login";
import ApiService from "./api-service";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";

@Injectable()
export class AccountService extends ApiService
{
    constructor(httpClient: HttpClient, router: Router){
        super(httpClient, router);
    }

    async register(login: Login)
    {
        var result = await this.toPromise(this.httpPost<Auth>('account/register', login));
        ApiService.authToken = result.token;
    }

    async login(login: Login)
    {
        var result = (await this.toPromise(this.httpPost<Auth>('account/login', login)));
        ApiService.authToken = result.token;
    }

    logout()
    {
        ApiService.authToken = '';
        this.redirectToLogin();
    }

    async checkInUse(username: string)
    {
        return await this.toPromise(this.httpGet<boolean>('account/usernameInUse', {username}));
    }
}