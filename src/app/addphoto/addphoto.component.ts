import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Album, Albums } from '../shared/models/album.model';
import { Photo } from '../shared/models/photo.model';
import * as moment from 'moment';
import { Message } from '../shared/models/message.model';
import { Store } from '@ngrx/store';
import { AppState } from '../redux/app.state';
import { Observable } from 'rxjs/Observable';
import { GetAlbums } from '../redux/actions/albums.action';
import { GetPhotos } from '../redux/actions/photos.action';
import { AppEffect } from '../redux/effects/app.effects';
import { CategoriesService } from '../shared/services/categories.service';

@Component({
  selector: 'vpb-addphoto',
  templateUrl: './addphoto.component.html',
  styleUrls: ['./addphoto.component.scss']
})
export class AddphotoComponent implements OnInit {

  form: FormGroup
  albums: Album[]
  message: Message

  constructor(
    private store: Store<AppState>,
    private appEffects: AppEffect,
    private categoriesService: CategoriesService
  ) { }

  ngOnInit() {
    this.message = new Message('danger', '');
  
    this.categoriesService.getCategories()
      .subscribe((albums: Album[]) => {
        this.albums = albums
      })
    this.store.dispatch(new GetPhotos())
     
    this.validateForm()
  }

  private validateForm(){
    this.form = new FormGroup({
      'url' : new FormControl(null, [Validators.required]),
      'name' : new FormControl(null, [Validators.required]),
      'category' : new FormControl(null, [Validators.required]),
      'caption' : new FormControl(null, [Validators.required, Validators.minLength(6)])
    })
  }

  onSubmit(){
    const { url, name, category, caption } = this.form.value;
    const photo = new Photo(name, +category, moment().format('DD.MM.YYYY HH:mm:ss'), caption, url )
    this.store.dispatch({ type: 'ADD_PHOTO', payload: photo })
    this.appEffects.addImage$
        .filter(action => action.type === 'ADD_PHOTO_SUCCESS')
        .subscribe(res => {
          this.showMessage('Photo was added','success' )
          this.form.reset()
        },
        (error) => {
          this.showMessage('Error','danger')
        }   
      )
  }

  private showMessage(text: string, type: string): void{
    this.message.text = text
    this.message.type = type
    window.setTimeout(() => this.message.text = '', 3000)
  }

}
