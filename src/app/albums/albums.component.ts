import { Component, OnInit, OnDestroy } from '@angular/core';
import { Album, Albums } from '../shared/models/album.model';
import { Photo, Photos } from '../shared/models/photo.model';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { Message } from '../shared/models/message.model';
import { Store } from '@ngrx/store';
import { AppState } from '../redux/app.state';
import { GetAlbums } from '../redux/actions/albums.action';
import { GetPhotos } from '../redux/actions/photos.action';
import { AppEffect } from '../redux/effects/app.effects';
import { PhotoService } from '../shared/services/photo.service';

@Component({
  selector: 'vpb-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.scss']
})
export class AlbumsComponent implements OnInit, OnDestroy {

  sub: Subscription
  isLoaded: boolean = false
  message: Message
  albums: Album[] = []
  photos: Photo[] = []

  constructor(
    private store: Store<AppState>,
    private appEffects: AppEffect,
    private photoService: PhotoService
  ) { }

  ngOnInit() {
    this.message = new Message('danger', '');
    
    this.store.dispatch(new GetAlbums())

    this.sub = Observable.combineLatest(
      this.photoService.getPhotos(),
      this.store.select('albumsPage')
    ).subscribe(data => {
      this.photos = data[0]
      this.albums = data[1].albums
      this.addNewProp()
      this.isLoaded = true
    })

  }

  private addNewProp(){
    this.albums.forEach((p) => {
      let count = this.photos.filter((a) => p.id === a.category)
      p.images = count.length
    })
  }

  albumWasAdded(album: Album){
    
    this.store.dispatch({ type: 'ADD_ALBUM', payload: album })
    this.appEffects.addAlbum$
        .filter(action => action.type === 'ADD_ALBUM_SUCCESS')
        .subscribe(res => {
          this.showMessage(`Album ${album.name} added`, "success" )
          this.addNewProp()
        },
        (error) => {
          this.showMessage('Error','danger')
        }   
      )
    
  }

  albumWasUpdated(album: Album){
    this.store.dispatch({ type: 'UPDATE_ALBUM', payload: album })
    
    this.appEffects.updateAlbum$
        .filter(action => action.type === 'UPDATE_ALBUM_SUCCESS')
        .subscribe(res => {
          this.showMessage(`Album updated`, "info" )
        },
        (error) => {
          this.showMessage('Error','danger')
        }   
      )
  }
  
  albumWasDeleted(album: Album){
    this.store.dispatch({ type: 'DELETE_ALBUM', payload: album })

    this.appEffects.deleteAlbum$
        .filter(action => action.type === 'DELETE_ALBUM_SUCCESS')
        .subscribe(res => {
          this.showMessage('Album was deleted','danger' )
        },
        (error) => {
          this.showMessage('Error','danger')
        }   
      )
  }

  private showMessage(text: string, type: string ){
    this.message.text = text
    this.message.type = type
    window.setTimeout(() => this.message.text = '', 3000)
  }

  ngOnDestroy(){
    if(this.sub) this.sub.unsubscribe()
  }

}
