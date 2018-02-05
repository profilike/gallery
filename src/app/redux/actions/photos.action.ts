import { Action } from '@ngrx/store'
import { Photo } from '../../shared/models/photo.model';

export namespace PHOTO_ACTION {
    export const GET_PHOTOS = 'GET_PHOTOS'
    export const GET_PHOTOS_SUCCESS = 'GET_PHOTOS_SUCCESS'
    export const ADD_PHOTO_SUCCESS = 'ADD_PHOTO_SUCCESS'
    export const DELETE_PHOTO_SUCCESS = 'DELETE_PHOTO_SUCCESS'
    export const UPDATE_PHOTO_SUCCESS = 'UPDATE_PHOTO_SUCCESS'
}

export class GetPhotos implements Action {
    readonly type = PHOTO_ACTION.GET_PHOTOS
}
export class GetPhotosSuccess implements Action {
    readonly type = PHOTO_ACTION.GET_PHOTOS_SUCCESS
    constructor(public payload: Photo[]){}
}

export class AddPhotoSuccess implements Action {
    readonly type = PHOTO_ACTION.ADD_PHOTO_SUCCESS
    constructor(public payload: Photo){}
}

export class DeletePhotoSuccess implements Action{
    readonly type = PHOTO_ACTION.DELETE_PHOTO_SUCCESS
    constructor(public payload: Photo){}
} 

export class UpdatePhotoSuccess implements Action {
    readonly type = PHOTO_ACTION.UPDATE_PHOTO_SUCCESS
    constructor(public payload: Photo){}
}

export type PhotoAction = GetPhotosSuccess | GetPhotos  | AddPhotoSuccess | DeletePhotoSuccess | UpdatePhotoSuccess