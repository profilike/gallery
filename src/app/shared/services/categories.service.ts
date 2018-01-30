import { Http, Response } from '@angular/http';
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { Album } from '../models/album.model';


@Injectable()
export class CategoriesService {
    constructor(public http: Http){}   
    
    getCategories(): Observable<Album[]>{
        return this.http.get('http://localhost:3000/categories')
        .map((response: Response) => response.json());
    }
    getCategoriesById(id: number): Observable<Album>{
        return this.http.get('http://localhost:3000/categories')
        .map((response: Response) => response.json());   
    }
    
}