import { Http, Response } from '@angular/http';
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { Album } from '../models/album.model';
import { BaseApi } from '../core/base-api';

@Injectable()
export class CategoriesService extends BaseApi {
    constructor(
        public http: Http
    ){
        super(http)
    }   
      
    getCategories(): Observable<Album[]>{
        return this.get('categories')
    }

    getCategoriesById(id: number): Observable<Album>{
        return this.get('categories')  
    }
    addCategory(album: Album): Observable<Album> {
        return this.post('categories', album)
    }
    updateCategory(album: Album) : Observable<Album>  {
        return this.put(`categories/${album.id}`, album)
    }
    deleteCategory(album: Album) {
        return this.delete(`categories/${album.id}`)
            .map((response: Response) => album)
            
    }
}