import { Action } from '@ngrx/store'
import { Album } from '../../shared/models/album.model';

export namespace ALBUM_ACTION {
    export const GET_ALBUMS = 'GET_ALBUMS'
    export const GET_ALBUMS_SUCCESS = 'GET_ALBUMS_SUCCESS'
    export const ADD_ALBUM_SUCCESS = 'ADD_ALBUM_SUCCESS'
    export const DELETE_ALBUM_SUCCESS = 'DELETE_ALBUM_SUCCESS'
    export const UPDATE_ALBUM_SUCCESS = 'UPDATE_ALBUM_SUCCESS'
}

export class GetAlbums implements Action {
    readonly type = ALBUM_ACTION.GET_ALBUMS
}
export class GetAlbumsSuccess implements Action {
    readonly type = ALBUM_ACTION.GET_ALBUMS_SUCCESS
    constructor(public payload: Album[]){}
}

export class AddAlbumSuccess implements Action {
    readonly type = ALBUM_ACTION.ADD_ALBUM_SUCCESS
    constructor(public payload: Album){}
}

export class DeleteAlbumSuccess implements Action{
    readonly type = ALBUM_ACTION.DELETE_ALBUM_SUCCESS
    constructor(public payload: Album){}
} 

export class UpdateAlbumSuccess implements Action {
    readonly type = ALBUM_ACTION.UPDATE_ALBUM_SUCCESS
    constructor(public payload: Album){}
}

export type AlbumAction = GetAlbums | GetAlbumsSuccess | AddAlbumSuccess | DeleteAlbumSuccess | UpdateAlbumSuccess