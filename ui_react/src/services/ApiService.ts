import axios, { AxiosError, type AxiosRequestConfig } from 'axios';
import LocalStorage from '../helpers/LocalStorage';

type queryParams = {[key: string]: string | number | boolean }

const baseApiUrl = 'http://127.0.0.1/api/';
const timeout = 30 * 1000;
const authTokenStorageKey = 'authToken';

axios.interceptors.response.use((response) => response,
  async (error) => {
    if (error.response && error.response.status == 401)
        ApiService.onUnauthorized();
    
    throw error;
});

export default abstract class ApiService
{
    private abortController = new AbortController();
    private storage = new LocalStorage();

    static onUnauthorized = () => {}

    protected get authToken() {
        return this.storage.getItem(authTokenStorageKey) ?? '';
    }

    protected set authToken(token: string) {
        if (token)
            this.storage.setItem(authTokenStorageKey, token);
        else
            this.storage.removeItem(authTokenStorageKey);

        axios.defaults.headers.common['Authorization'] =`Bearer ${token}`;
    }

    get config() {
        return {
            timeout,
            signal: this.abortController.signal,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${this.authToken}`,
            }
        } as AxiosRequestConfig<any>;
    }

    private apiUrl(path: string, params?: queryParams)
    {
        params = params ?? {};
        var query = Object.entries(params).map((p) => `${p[0]}=${encodeURIComponent(p[1])}`).join('&');
        
        path = path.replace(/^\//, '');
        return `${baseApiUrl}${path}?${query}`;
    }

    protected httpGet<T>(path: string, params?: queryParams)
    {
        var url = this.apiUrl(path, params);
        return axios.get<T>(url, this.config);
    }

    protected httpPost<T>(path: string, body: unknown, params?: queryParams)
    {
        var url = this.apiUrl(path, params);
        return axios.post<T>(url, body, this.config);
    }

    protected httpDelete<T>(path: string, params?: queryParams)
    {
        var url = this.apiUrl(path, params);
        return axios.delete<T>(url, this.config);
    }

    abort()
    {
        this.abortController.abort();
        this.abortController = new AbortController();
    }

    axiosError(error: unknown)
    {
        return axios.isAxiosError(error) ? error as AxiosError : null;
    }
}