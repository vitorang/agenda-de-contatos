import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, finalize, Observable, Subscription } from 'rxjs';
import { LocalStorage } from '../helpers/local-storage';

type queryParams = {[key: string]: string | number | boolean }

const baseApiUrl = 'http://127.0.0.1/api/';
const timeout = 30 * 1000;
const authTokenStorageKey = 'authToken';


export default abstract class ApiService
{   
    private subscriptions: Subscription[] = [];
    constructor(
        private httpClient: HttpClient,
        private router: Router,
        private storage: LocalStorage) { }
    
    private getHeaders(extraHeaders?: HttpHeaders): HttpHeaders {
        var headers = extraHeaders || new HttpHeaders();

        headers = headers.set('Authorization', `Bearer ${this.authToken}`);
        headers = headers.set('Content-Type', 'application/json');
        
        return headers;
    }

    protected get authToken()
    {
        return this.storage.getItem(authTokenStorageKey) ?? '';
    }

    protected set authToken(token: string)
    {
        if (token)
            this.storage.setItem(authTokenStorageKey, token);
        else
            this.storage.removeItem(authTokenStorageKey);
    }
    
    get config() {
        return { headers: this.getHeaders(), timeout };
    }
    
    private apiUrl(path: string, params?: queryParams)
    {
        params = params ?? {};
        var query = Object.entries(params).map((p) => `${p[0]}=${encodeURIComponent(p[1])}`).join('&');
        
        path = path.replace(/^\//, '');
        return `${baseApiUrl}${path}?${query}`;
    }
    
    protected redirectToLogin()
    {
        this.authToken = '';
        this.router.navigate(['/login']);
    }
    
    protected httpGet<T>(path: string, params?: queryParams)
    {
        var url = this.apiUrl(path, params);
        return this.pipe(this.httpClient.get<T>(url, this.config));
    }
    
    protected httpPost<T>(path: string, body: unknown, params?: queryParams)
    {
        var url = this.apiUrl(path, params);
        return this.pipe(this.httpClient.post<T>(url, body, this.config));
    }
    
    protected httpDelete<T>(path: string, params?: queryParams)
    {
        var url = this.apiUrl(path, params);
        return this.pipe(this.httpClient.delete<T>(url, this.config));
    }
    
    private pipe<T>(obs: Observable<T>)
    {
        return obs.pipe(
            catchError((error) => {
                if (error.status == 401)
                    this.redirectToLogin();
                
                throw error;
            }),
            finalize(() => this.removeClosedSubscriptions())
        );
    }
    
    private removeClosedSubscriptions()
    {
        this.subscriptions = this.subscriptions.filter(s => !s.closed);
    }
    
    protected toPromise<T>(obs: Observable<T>)
    {
        return new Promise<T>((resolve, reject) => {
            var subscription = obs.subscribe({
                next: value => resolve(value),
                error: error => reject(error),
            });
            
            this.subscriptions.push(subscription);            
        }); 
    }
    
    abort()
    {
        for (let sub of this.subscriptions)
            sub.unsubscribe();
        
        this.removeClosedSubscriptions();
    }
}