import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Photo } from '../../shared/models/photo.model';
import { Album } from '../../shared/models/album.model';

@Component({
  selector: 'vpb-edit-modal',
  templateUrl: './edit-modal.component.html',
  styleUrls: ['./edit-modal.component.scss']
})
export class EditModalComponent implements OnInit {

  @Input() photo: Photo
  @Input() albums: Album[]
  @Output() onPhotoEdit = new EventEmitter<Photo>()
  @Output() onModalCancel = new EventEmitter<any>()

  currentAlbum: Album
  currentAlbumId: number = 0

  constructor( ) { }

  ngOnInit() {

    this.currentAlbum = this.albums
      .find(a => a.id === this.photo.category )
    if(this.currentAlbum){
      this.currentAlbumId = this.currentAlbum.id
    }
  }

  onSubmit( form: NgForm ){
    
    let { name, album, caption } =  form.value
    const photo = new Photo( name, +album, this.photo.date, caption, this.photo.url, this.photo.id )
 
    this.onPhotoEdit.emit(photo)
    this.onModalCancel.emit()

  }

  closeModal(){
    this.onModalCancel.emit()
  }

}
