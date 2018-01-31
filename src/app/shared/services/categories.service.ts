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
    addCategory(album: Album): Observable<Album> {
        return this.http.post('http://localhost:3000/categories', album)
        .map((response: Response) => response.json());
    }
    updateCategory(album: Album) : Observable<Album>  {
        return this.http.put(`http://localhost:3000/categories/${album.id}`, album)
        .map((response: Response) => response.json());
    }
    deleteCategory(album: Album) {
        return this.http.delete(`http://localhost:3000/categories/${album.id}`)
        .map((response: Response) => response.json());
    }
}