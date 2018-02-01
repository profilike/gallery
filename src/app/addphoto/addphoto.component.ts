import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PhotoService } from '../shared/services/photo.service';
import { CategoriesService } from '../shared/services/categories.service';
import { Album } from '../shared/models/album.model';
import { Subscription } from 'rxjs/Subscription';
import { Photo } from '../shared/models/photo.model';
import * as moment from 'moment';
import { Message } from '../shared/models/message.model';

@Component({
  selector: 'vpb-addphoto',
  templateUrl: './addphoto.component.html',
  styleUrls: ['./addphoto.component.scss']
})
export class AddphotoComponent implements OnInit, OnDestroy {

  form: FormGroup
  sub1: Subscription
  sub2: Subscription
  albums: Album[] = []
  isLoaded: boolean = false
  message: Message

  constructor(
    private photoService: PhotoService,
    private categoriesService: CategoriesService
  ) { }

  ngOnInit() {
    this.message = new Message('danger', '');

    this.form = new FormGroup({
      'url' : new FormControl(null, [Validators.required]),
      'name' : new FormControl(null, [Validators.required]),
      'category' : new FormControl(null, [Validators.required]),
      'caption' : new FormControl(null, [Validators.required, Validators.minLength(6)])
    })

    this.sub1 = this.categoriesService.getCategories()
      .subscribe(( albums: Album[] ) => {
        this.albums = albums
        this.isLoaded = true
      })

  }

  onSubmit(){
    const { url, name, category, caption } = this.form.value;
    const photo = new Photo(name, +category, moment().format('DD.MM.YYYY HH:mm:ss'), caption, url )
    this.sub2 = this.photoService.addPhoto(photo)
    .subscribe((photo: Photo) => {
      this.showMessage(`Photo ${photo.name} was added`,'success' )
    },
    (error) => {
      this.showMessage('Error','danger')
    }
  )
  }

  showMessage(text, type){
    this.message.text = text
    this.message.type = type
    window.setTimeout(() => this.message.text = '', 3000)
  }

  ngOnDestroy(){
    if(this.sub1) this.sub1.unsubscribe()
    if(this.sub2) this.sub2.unsubscribe()
  }

}
