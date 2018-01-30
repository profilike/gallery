import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Injectable } from "@angular/core";

import { Observable } from "rxjs/Observable";
import { Photo } from "../models/photo.model";

@Injectable()
export class PhotoService {

    headers: Headers;
    options: RequestOptions;

    constructor(public http: Http){
        this.headers = new Headers({ 'Content-Type': 'application/json' });              
        this.options = new RequestOptions({ headers: this.headers });
    }   
    
    getPhotos(): Observable<Photo[]>{
        return this.http.get('http://localhost:3000/images')
        .map((response: Response) => response.json());
    }

    getPhotoById(id: string): Observable<Photo>{
        return this.http.get(`http://localhost:3000/images/${id}`)
        .map((response: Response) => response.json());
    }

    deletePhoto(photo: Photo) {
        return this.http.delete(`http://localhost:3000/images/${photo.id}`)
        .map((response: Response) => response.json());
    }
    
}