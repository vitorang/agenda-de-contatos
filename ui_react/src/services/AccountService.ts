import type Auth from "../models/Auth";
import type Login from "../models/Login";
import ApiService from "./ApiService";

export default class AccountService extends ApiService
{
    async register(login: Login)
    {
        var result = (await this.httpPost<Auth>('account/register', login)).data;
        this.authToken = result.token;
    }

    async login(login: Login)
    {
        var result = (await this.httpPost<Auth>('account/login', login)).data;
        this.authToken = result.token;
    }

    async checkInUse(username: string)
    {
        return (await this.httpGet<boolean>('account/usernameInUse', {username})).data;
    }
}