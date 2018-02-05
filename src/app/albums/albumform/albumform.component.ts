import { Component, EventEmitter, Output } from '@angular/core';
import { Album } from '../../shared/models/album.model';
import { CategoriesService } from '../../shared/services/categories.service';

@Component({
  selector: 'vpb-albumform',
  templateUrl: './albumform.component.html',
  styleUrls: ['./albumform.component.scss']
})
export class AlbumformComponent {

  @Output() onAlbumAdd = new EventEmitter<Album>()

  albumName: string = ''

  constructor(
    private categoriesService: CategoriesService
  ) { }

  onAdd(){
    if( this.albumName === '' ) return;

    const album = new Album(this.albumName)
    this.onAlbumAdd.emit(album)
    this.albumName = ''
  
  }

}
