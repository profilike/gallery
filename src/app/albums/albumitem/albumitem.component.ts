import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Album } from '../../shared/models/album.model';
import { CategoriesService } from '../../shared/services/categories.service';

@Component({
  selector: 'vpb-albumitem',
  templateUrl: './albumitem.component.html',
  styleUrls: ['./albumitem.component.scss']
})
export class AlbumitemComponent {

  @Input() album: Album
  @Output() onAlbumDeleted = new EventEmitter<Album>()
  @Output() onAlbumUpdated = new EventEmitter<Album>()
  

  isEdit: boolean = false

  constructor( private categoriesService: CategoriesService ) { }

  onEdit(){
    this.isEdit = true
  }
  onSave(album: Album){
    this.isEdit = false
    this.onAlbumUpdated.emit(album)
  }

  onDelete(album: Album){
    if(album.images > 0){
      window.confirm(`Are you sure? This album has ${album.images} photos.`) 
        ? this.onAlbumDeleted.emit(album)
        : false
    }else{
      this.onAlbumDeleted.emit(album)
    }
    
  }

}
