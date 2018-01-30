import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { CategoriesService } from '../shared/services/categories.service';
import { PhotoService } from '../shared/services/photo.service';
import { Photo } from '../shared/models/photo.model';
import { Album } from '../shared/models/album.model';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'vpb-photodetail',
  templateUrl: './photodetail.component.html',
  styleUrls: ['./photodetail.component.scss']
})
export class PhotodetailComponent implements OnInit, OnDestroy {

  sub: Subscription
  isLoaded = false
  photo: Photo
  album: Album

  constructor(
    private route: ActivatedRoute,
    private photoService: PhotoService,
    private categoriesService: CategoriesService

  ) { }

  ngOnInit() {
    this.sub = this.route.params
      .mergeMap(( params: Params ) => this.photoService.getPhotoById(params['id']) )
      .subscribe((photo: Photo) => {
        this.photo = photo
        this.isLoaded = true
      })
  }
  ngOnDestroy(){
    if(this.sub){
      this.sub.unsubscribe()
    }
  }

}
