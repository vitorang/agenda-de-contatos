import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, finalize, Observable, Subscription } from 'rxjs';

type queryParams = {[key: string]: string | number | boolean }

const baseApiUrl = 'http://127.0.0.1/api/';
const timeout = 30 * 1000;


export default abstract class ApiService
{   
    private subscriptions: Subscription[] = [];
    constructor(private httpClient: HttpClient, private router: Router) { }
    
    private getHeaders(extraHeaders?: HttpHeaders): HttpHeaders {
        let headers = extraHeaders || new HttpHeaders();
        
        if (ApiService.authToken)
            headers = headers.set('Authorization', `Bearer ${ApiService.authToken}`);
        
        headers = headers.set('Content-Type', 'application/json');
        
        return headers;
    }

    protected static get authToken()
    {
        return (window as any)._authToken ?? '';
    }

    protected static set authToken(token: string)
    {
        (window as any)._authToken = token;
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
        ApiService.authToken = '';
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