import { Component, OnInit, OnDestroy } from '@angular/core';
import { CategoriesService } from '../shared/services/categories.service';
import { Album } from '../shared/models/album.model';
import { Photo } from '../shared/models/photo.model';
import { Subscription } from 'rxjs/Subscription';
import { PhotoService } from '../shared/services/photo.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'vpb-editcat',
  templateUrl: './editcat.component.html',
  styleUrls: ['./editcat.component.scss']
})
export class EditcatComponent implements OnInit, OnDestroy {

  sub: Subscription
  isLoaded: boolean = false
  message: string = ''
  albums: Album[] = []
  photos: Photo[] = []

  constructor(
    private categoriesService: CategoriesService,
    private photoService: PhotoService
  ) { }

  ngOnInit() {
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
    this.message = "Album added"
    window.setTimeout(() => this.message = '', 3000)
  }

  albumWasDeleted(album: Album){
    this.albums = this.albums.filter(a => a.id !== album.id)
  }

  ngOnDestroy(){
    if(this.sub){
      this.sub.unsubscribe();
    }
  }

}
