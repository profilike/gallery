import { Http, Response, Headers, RequestOptions  } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()

export class BaseApi {

    private baseUrl = 'http://localhost:3000/';
    private headers = new Headers({ 'Content-Type': 'application/json' });
    private options = new RequestOptions({ headers: this.headers });

    constructor(public http: Http) { }

    private getUrl(url: string = ''): string {
        return this.baseUrl + url;
    }

    public get(url: string = ''): Observable<any> {
        return this.http.get(this.getUrl(url))
            .map((response: Response) => response.json())
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }
    public post(url: string = '', data: any = {}): Observable<any> {
        return this.http.post(this.getUrl(url), data, this.options)
            .map((response: Response) => response.json())
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }
    public put(url: string = '', data: any = {}): Observable<any> {
        return this.http.put(this.getUrl(url), data, this.options)
            .map((response: Response) => response.json())
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }
    public delete(url: string = ''): Observable<any> {
        return this.http.delete(this.getUrl(url))
            .map((response: Response) => response.json())
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

}