import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Album } from '../../shared/models/album.model';
import { CategoriesService } from '../../shared/services/categories.service';

@Component({
  selector: 'vpb-albumform',
  templateUrl: './albumform.component.html',
  styleUrls: ['./albumform.component.scss']
})
export class AlbumformComponent implements OnInit {

  @Output() onAlbumAdd = new EventEmitter<Album>()

  albumName: string = ''

  constructor(
    private categoriesService: CategoriesService
  ) { }

  ngOnInit() {
  }

  onAdd(){
    if( this.albumName === '' ) return;

    const album = new Album(this.albumName)
    this.categoriesService.addCategory(album)
    .subscribe(( album: Album ) => {
      this.onAlbumAdd.emit(album)
      this.albumName = ''
    })

  }

}