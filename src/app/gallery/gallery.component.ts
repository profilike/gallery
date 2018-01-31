import { Component, OnInit, OnDestroy } from '@angular/core';
import { PhotoService } from '../shared/services/photo.service';
import { Photo } from '../shared/models/photo.model';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { CategoriesService } from '../shared/services/categories.service';
import { Album } from '../shared/models/album.model';

@Component({
  selector: 'vpb-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})

export class GalleryComponent implements OnInit, OnDestroy {

  sub: Subscription
  isLoaded: boolean = false
  filterBy?: string = 'all'
  photos: Photo[] = []
  albums: Album[] = []
  cat: Album

  constructor(
    private photoService: PhotoService,
    private categoriesService: CategoriesService
  ) { }

  ngOnInit() {
    this.sub = Observable.combineLatest(
      this.photoService.getPhotos(),
      this.categoriesService.getCategories()
    ).subscribe(data => {
        this.photos = data[0]
        this.albums = data[1]
        this.addNewProp()
        this.isLoaded = true
      })
  }

  addNewProp(){
    this.photos.forEach((p) => {
      this.cat = this.albums.find(a => a.id === p.category);
      if(this.cat){
        p.catName = this.cat.name
      }
    });
  }
  onDeletePhoto(photo: Photo){
    this.photoService.deletePhoto(photo)
      .subscribe(res => {
        this.photos = this.photos.filter(p => p.id !== +photo.id)
      })
    
  }
  onFilterChange(album){
    this.filterBy = album.id
  }
  ngOnDestroy(){
    if(this.sub){
      this.sub.unsubscribe();
    }
  }

}
