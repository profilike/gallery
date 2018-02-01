import { Component, OnInit, OnDestroy } from '@angular/core';
import { CategoriesService } from '../shared/services/categories.service';
import { Album } from '../shared/models/album.model';
import { Photo } from '../shared/models/photo.model';
import { Subscription } from 'rxjs/Subscription';
import { PhotoService } from '../shared/services/photo.service';
import { Observable } from 'rxjs/Observable';
import { Message } from '../shared/models/message.model';

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
    private categoriesService: CategoriesService,
    private photoService: PhotoService
  ) { }

  ngOnInit() {
    this.message = new Message('danger', '');
    this.sub = Observable.combineLatest(
      this.categoriesService.getCategories(),
      this.photoService.getPhotos()
    ).subscribe(data => {
      this.albums = data[0]
      this.photos = data[1]
      this.addNewProp()
      this.isLoaded = true
    })
  }

  addNewProp(){
    this.albums.forEach((p) => {
      let count = this.photos.filter((a) => p.id === a.category)
      p.images = count.length
    })
  }

  albumWasAdded(album: Album){
    this.albums.push(album)
    this.addNewProp()
    this.addMessage(`Album ${album.name} added`, "success" )
  }

  albumWasUpdated(album: Album){
    this.message.text = `Album ${album.name} updated`
    this.addMessage(`Album ${album.name} updated`, "info" )
  }

  albumWasDeleted(album: Album){
    this.albums = this.albums.filter(a => a.id !== album.id)
    this.addMessage(`Album ${album.name} deleted`, "danger" )
  }

  private addMessage(text, type ){
    this.message.text = text
    this.message.type = type
    window.setTimeout(() => this.message.text = '', 3000)
  }

  ngOnDestroy(){
    if(this.sub){
      this.sub.unsubscribe();
    }
  }

}
