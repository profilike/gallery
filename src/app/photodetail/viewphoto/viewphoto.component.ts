import { Component, Input, EventEmitter,  Output } from '@angular/core';
import { Photo } from '../../shared/models/photo.model';

@Component({
  selector: 'vpb-viewphoto',
  templateUrl: './viewphoto.component.html',
  styleUrls: ['./viewphoto.component.scss']
})
export class ViewphotoComponent {

  @Input() photo: Photo
  @Output() onModalOpen = new EventEmitter<any>()

  openModal(){
    this.onModalOpen.emit()
  }

}
