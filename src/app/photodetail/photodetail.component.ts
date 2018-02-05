import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Photo } from '../shared/models/photo.model';
import { Album } from '../shared/models/album.model';
import { Subscription } from 'rxjs/Subscription';
import { Message } from '../shared/models/message.model';
import { Store } from '@ngrx/store';
import { AppState } from '../redux/app.state';
import { GetAlbums } from '../redux/actions/albums.action';
import { GetPhotoById } from '../redux/actions/photos.action';
import { AppEffect } from '../redux/effects/app.effects';
import { CategoriesService } from '../shared/services/categories.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'vpb-photodetail',
  templateUrl: './photodetail.component.html',
  styleUrls: ['./photodetail.component.scss']
})
export class PhotodetailComponent implements OnInit, OnDestroy {

  sub: Subscription
  isLoaded = false
  photo: Photo
  albums: Album[] = []

  isModalOpen: boolean = false
  message: Message

  constructor(
    private route: ActivatedRoute,
    private store: Store<AppState>,
    private appEffects: AppEffect,
    private categoriesService: CategoriesService

  ) { }

  ngOnInit() {
    this.message = new Message('danger', '');

    this.route.params.subscribe((params: Params ) => {
      this.store.dispatch( new GetPhotoById(params['id']))
    })

    Observable.combineLatest(
      this.categoriesService.getCategories(),
      this.store.select('photoDetailPage')
    ).subscribe((data) => {
      this.albums = data[0]
      this.photo = data[1].photo
      this.isLoaded = true
    })

  }

  private toggleModalVisibility(dir: boolean) {
    this.isModalOpen = dir
  }

  openModal(){
    this.toggleModalVisibility(true)
  }

  onModalCancel(){
    this.toggleModalVisibility(false)
  }

  photoWasEdited(photo: Photo){
    this.store.dispatch({type: 'UPDATE_PHOTO', payload: photo})

    this.appEffects.updateImage$
        .filter(action => action.type === 'UPDATE_PHOTO_SUCCESS')
        .subscribe(res => {
          this.showMessage(`Album ${photo.name} added`, "success" )
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
