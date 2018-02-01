import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { CategoriesService } from '../shared/services/categories.service';
import { PhotoService } from '../shared/services/photo.service';
import { Photo } from '../shared/models/photo.model';
import { Album } from '../shared/models/album.model';
import { Subscription } from 'rxjs/Subscription';
import { Message } from '../shared/models/message.model';

@Component({
  selector: 'vpb-photodetail',
  templateUrl: './photodetail.component.html',
  styleUrls: ['./photodetail.component.scss']
})
export class PhotodetailComponent implements OnInit, OnDestroy {

  sub: Subscription
  isLoaded = false
  photo: Photo
  albums: Album[] = []

  isModalOpen: boolean = false
  message: Message

  constructor(
    private route: ActivatedRoute,
    private photoService: PhotoService,
    private categoriesService: CategoriesService

  ) { }

  ngOnInit() {
    this.message = new Message('danger', '');

    this.sub = this.route.params
      .mergeMap(( params: Params ) => this.photoService.getPhotoById(params['id']) )
      .mergeMap((photo: Photo) =>{
        this.photo = photo
        return this.categoriesService.getCategories()
      })
      .subscribe((categories: Album[]) => {
        this.albums = categories
        this.isLoaded = true
      })
  }

  private toggleModalVisibility(dir: boolean) {
    this.isModalOpen = dir
  }

  openModal(){
    this.toggleModalVisibility(true)
  }

  onModalCancel(){
    this.toggleModalVisibility(false)
  }

  photoWasEdited(photo: Photo){
    this.photo = photo
    this.message.type = "success"
    this.message.text = "Photo was updated"
    window.setTimeout(() => this.message.text = '', 5000)
  }

  ngOnDestroy(){
    if(this.sub){
      this.sub.unsubscribe()
    }
  }

}
