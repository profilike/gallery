import { Injectable } from '@angular/core'
import { Actions, Effect } from '@ngrx/effects'
import { ALBUM_ACTION, GetAlbums, GetAlbumsSuccess, AddAlbumSuccess, DeleteAlbumSuccess, UpdateAlbumSuccess} from '../actions/albums.action'
import { GetPhotos, GetPhotosSuccess, AddPhotoSuccess, PHOTO_ACTION, DeletePhotoSuccess, UpdatePhotoSuccess } from '../actions/photos.action'
import { CategoriesService } from '../../shared/services/categories.service';
import { Album } from '../../shared/models/album.model';
import { Observable } from 'rxjs/Observable';
import { Action } from '@ngrx/store';
import { PhotoService } from '../../shared/services/photo.service';
import { Photo } from '../../shared/models/photo.model';
import 'rxjs/add/operator/switchMap'
import 'rxjs/add/operator/mergeMap'
  
@Injectable()
export class AppEffect {

  constructor(
    private actions$: Actions,
    private albumsService: CategoriesService,
    private photosService: PhotoService
  ) {}

  @Effect() loadAlbums$: Observable<Action> = this.actions$
    .ofType(ALBUM_ACTION.GET_ALBUMS)
    .switchMap((action) => {
      return this.albumsService.getCategories()
    })
    .map((albums: Album[]) => {
      return new GetAlbumsSuccess(albums)
    })

  @Effect() loadPhotos$: Observable<Action> = this.actions$
    .ofType(PHOTO_ACTION.GET_PHOTOS)
    .switchMap((action) => {
      return this.photosService.getPhotos()
    })
    .map((photos: Photo[]) => {
      return new GetPhotosSuccess(photos)
    })

  @Effect() addAlbum$ = this.actions$
    .ofType('ADD_ALBUM')
    .map((action: any) => action.payload)
    .switchMap(album => this.albumsService.addCategory(album))
    .map(album => new AddAlbumSuccess(album)).share();

  @Effect() deleteAlbum$ = this.actions$
    .ofType('DELETE_ALBUM') 
    .map((action: any) => action.payload)
    .switchMap(album => this.albumsService.deleteCategory(album))
    .map(album => new DeleteAlbumSuccess(album)).share();

  @Effect() updateAlbum$ = this.actions$
    .ofType('UPDATE_ALBUM') 
    .map((action: any) => action.payload)
    .switchMap(album => this.albumsService.updateCategory(album))
    .map(album => new UpdateAlbumSuccess(album)).share();

  @Effect() addImage$ = this.actions$
    .ofType('ADD_PHOTO') 
    .map((action: any) => action.payload)
    .switchMap(photo => this.photosService.addPhoto(photo))
    .map(photo => new AddPhotoSuccess(photo)).share();

  @Effect() deleteImage$ = this.actions$
    .ofType('DELETE_PHOTO') 
    .map((action: any) => action.payload)
    .switchMap(photo => this.photosService.deletePhoto(photo))
    .map(photo => new DeletePhotoSuccess(photo));
} 
