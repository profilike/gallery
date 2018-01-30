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

  constructor(
    private photoService: PhotoService,
    private categoriesService: CategoriesService
  ) { }

  sub: Subscription
  isLoaded = false
  filterBy?: string = 'all'
  photos: Photo[] = []
  albums: Album[] = []

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
      p.catName = this.albums.find(c => c.id === p.category).name;
    });
  }
  onDeletePhoto(photo: Photo){
    this.photoService.deletePhoto(photo)
      .subscribe(res => {
        this.photos = this.photos.filter(p => p.id !== +photo.id)
      })
    
  }
  ngOnDestroy(){
    if(this.sub){
      this.sub.unsubscribe();
    }
  }
  onFilterChange(album){
    this.filterBy = album.id
  }

}
