import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Album } from '../../shared/models/album.model';
import { CategoriesService } from '../../shared/services/categories.service';

@Component({
  selector: 'vpb-albumitem',
  templateUrl: './albumitem.component.html',
  styleUrls: ['./albumitem.component.scss']
})
export class AlbumitemComponent implements OnInit {

  @Input() album: Album
  @Output() onAlbumDeleted = new EventEmitter<Album>()

  isEdit: boolean = false

  constructor( private categoriesService: CategoriesService ) { }

  ngOnInit() {
  }

  onEdit(){
    this.isEdit = true
  }
  onSave(album: Album){
    this.isEdit = false
    this.categoriesService.updateCategory(album)
    .subscribe((res) => {
      
    })
  }

  onDelete(album: Album){
    this.categoriesService.deleteCategory(album)
    .subscribe((res) => {
      this.onAlbumDeleted.emit(album)
    })
  }

}
