import { Component, OnInit, OnDestroy } from '@angular/core';
import { Photo } from '../shared/models/photo.model';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { Album } from '../shared/models/album.model';
import { Store } from '@ngrx/store';
import { AppState } from '../redux/app.state';
import { GetAlbums } from '../redux/actions/albums.action';
import { GetPhotos } from '../redux/actions/photos.action';
import { CategoriesService } from '../shared/services/categories.service';

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
    private store: Store<AppState>,
    private categoriesService: CategoriesService
  ) { }

  ngOnInit() {

    this.store.dispatch(new GetPhotos())

    this.sub = Observable.combineLatest(
      this.categoriesService.getCategories(),
      this.store.select('galleryPage')
    ).subscribe(data => {
      this.albums = data[0]
      this.photos = data[1].photos
      this.addNewProp()
      this.isLoaded = true
    })
  }

  addNewProp(){
    this.photos.forEach((p) => {
      this.cat = this.albums.find(a => a.id === p.category);
      if(this.cat){
        p.catName = this.cat.name
      }else{
        p.catName = 'uncategorized'
      }
    });
  }
  onDeletePhoto(photo: Photo){
    this.store.dispatch({type: 'DELETE_PHOTO', payload: photo})
  }
  onFilterChange(album){
    this.filterBy = album.id
  }
  ngOnDestroy(){
    if(this.sub) this.sub.unsubscribe()
  }

}
