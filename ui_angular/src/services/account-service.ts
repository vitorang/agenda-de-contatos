import { Injectable } from "@angular/core";
import Auth from "../models/auth";
import Login from "../models/login";
import ApiService from "./api-service";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { LocalStorage } from "../helpers/local-storage";

@Injectable()
export class AccountService extends ApiService
{
    constructor(httpClient: HttpClient, router: Router, storage: LocalStorage){
        super(httpClient, router, storage);
    }

    async register(login: Login)
    {
        var result = await this.toPromise(this.httpPost<Auth>('account/register', login));
        this.authToken = result.token;
    }

    async login(login: Login)
    {
        var result = (await this.toPromise(this.httpPost<Auth>('account/login', login)));
        this.authToken = result.token;
    }

    logout()
    {
        this.authToken = '';
        this.redirectToLogin();
    }

    async checkInUse(username: string)
    {
        return await this.toPromise(this.httpGet<boolean>('account/usernameInUse', {username}));
    }
}