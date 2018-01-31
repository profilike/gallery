import { Component, OnInit, Input, EventEmitter,  Output } from '@angular/core';
import { Photo } from '../../shared/models/photo.model';

@Component({
  selector: 'vpb-viewphoto',
  templateUrl: './viewphoto.component.html',
  styleUrls: ['./viewphoto.component.scss']
})
export class ViewphotoComponent implements OnInit {

  @Input() photo: Photo
  @Output() onModalOpen = new EventEmitter<any>()

  constructor() { }

  ngOnInit() {
  }

  openModal(){
    this.onModalOpen.emit()
  }

}
