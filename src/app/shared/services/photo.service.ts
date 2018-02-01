import { Http, Response } from '@angular/http';
import { Injectable } from "@angular/core";
import { BaseApi } from '../core/base-api';
import { Observable } from "rxjs/Observable";
import { Photo } from "../models/photo.model";

@Injectable()
export class PhotoService extends BaseApi {

    constructor(public http: Http){
        super(http)
    }   
    
    getPhotos(): Observable<Photo[]>{
        return this.get('images')
    }

    getPhotoById(id: string): Observable<Photo>{
        return this.get(`images/${id}`)
    }

    updatePhoto(photo: Photo): Observable<Photo> {
        return this.put(`images/${photo.id}`, photo)
    }
    addPhoto(photo: Photo): Observable<Photo> {
        return this.post('images', photo)
    }

    deletePhoto(photo: Photo) {
        return this.delete(`images/${photo.id}`)
    }
    
}