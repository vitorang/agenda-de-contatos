import axios, { AxiosError } from 'axios';

type queryParams = {[key: string]: string | number | boolean }

const baseApiUrl = 'http://127.0.0.1/api/';
const timeout = 30 * 1000;


export default abstract class ApiService
{
    private abortController = new AbortController();

    protected get authToken() {
        return axios.defaults.headers.common['Authorization']?.toString() ?? '';
    }

    protected set authToken(token: string) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }

    get config() {
        return { timeout, signal: this.abortController.signal };
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
        console.log(body)
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
    }

    axiosError(error: unknown)
    {
        return axios.isAxiosError(error) ? error as AxiosError : null;
    }
}