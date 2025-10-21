import axios from 'axios';

type queryParams = {[key: string]: string | number | boolean }

const baseApiUrl = 'http://127.0.0.1/api/';
const timeout = 30 * 1000;


export default abstract class ApiService
{
    private abortController = new AbortController();

    protected setAuthToken(token: string) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
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
        return axios.get<T>(url, {
            timeout,
            signal: this.abortController.signal
        });
    }

    protected httpPost<T>(path: string, body: unknown, params?: queryParams)
    {
        var url = this.apiUrl(path, params);
        return axios.post<T>(url, {
            body, timeout,
            signal: this.abortController.signal, 
        });
    }

    protected httpDelete<T>(path: string, params?: queryParams)
    {
        var url = this.apiUrl(path, params);
        return axios.delete<T>(url, {
            timeout,
            signal: this.abortController.signal, 
        });
    }

    abort()
    {
        this.abortController.abort();
    }
}