import { Component, OnInit, OnDestroy , Output, EventEmitter, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Photo } from '../../shared/models/photo.model';
import { Album } from '../../shared/models/album.model';
import { PhotoService } from '../../shared/services/photo.service';
import { Subscription } from 'rxjs/Subscription';


@Component({
  selector: 'vpb-edit-modal',
  templateUrl: './edit-modal.component.html',
  styleUrls: ['./edit-modal.component.scss']
})
export class EditModalComponent implements OnInit, OnDestroy {

  @Input() photo: Photo
  @Input() albums: Album[]
  @Output() onPhotoEdit = new EventEmitter<Photo>()
  @Output() onModalCancel = new EventEmitter<any>()

  sub: Subscription
  currentAlbum: Album
  currentAlbumId: number

  constructor( private photoService: PhotoService ) { }

  ngOnInit() {
    this.currentAlbum = this.albums
      .find(a => a.id === this.photo.category )

    this.currentAlbumId = this.currentAlbum.id
  }

  onSubmit( form: NgForm ){
    
    let { name, album, caption } =  form.value
    const updatePhoto = new Photo( name, +album, this.photo.date, caption, this.photo.url, this.photo.id )
    this.sub = this.photoService.updatePhoto(updatePhoto)
    .subscribe((photo: Photo) => {
      this.onPhotoEdit.emit(photo)
      this.onModalCancel.emit()
    })
  }

  closeModal(){
    this.onModalCancel.emit()
  }

  ngOnDestroy(){
    if(this.sub) this.sub.unsubscribe()
  }

}
