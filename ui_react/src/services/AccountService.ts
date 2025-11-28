import type Auth from "../models/Auth";
import type Login from "../models/Login";
import ApiService from "./ApiService";

export default class AccountService extends ApiService
{
    register = async (login: Login) =>
    {
        var result = (await this.httpPost<Auth>('account/register', login)).data;
        this.authToken = result.token;
    }

    login = async (login: Login) => 
    {
        var result = (await this.httpPost<Auth>('account/login', login)).data;
        this.authToken = result.token;
    }

    logout = async () =>
    {
        this.authToken = '';
        ApiService.onUnauthorized();
    }

    async checkInUse(username: string)
    {
        return (await this.httpGet<boolean>('account/usernameInUse', {username})).data;
    }
}