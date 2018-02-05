import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store'
import { StoreDevtoolsModule } from '@ngrx/store-devtools'

import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { AddphotoComponent } from './addphoto/addphoto.component';
import { GalleryComponent } from './gallery/gallery.component';
import { AlbumsComponent } from './albums/albums.component';
import { PhotoService } from './shared/services/photo.service';
import { PhotodetailComponent } from './photodetail/photodetail.component';
import { CategoriesService } from './shared/services/categories.service';
import { FilterPipe } from './shared/pipes/filter.pipe';
import { EditModalComponent } from './photodetail/edit-modal/edit-modal.component';
import { ViewphotoComponent } from './photodetail/viewphoto/viewphoto.component';
import { AlbumitemComponent } from './albums/albumitem/albumitem.component';
import { AlbumformComponent } from './albums/albumform/albumform.component';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';
import { LoaderComponent } from './shared/components/loader/loader.component';

import { albumsReducer } from './redux/reducers/albums.reducers';
import { photosReducer } from './redux/reducers/gallery.reducers';
import { environment } from '../environments/environment.prod'
import { AppEffect } from './redux/effects/app.effects';
import { DropdownDirective } from './shared/directives/dropdown.directive';
import { addPhotoReducer } from './redux/reducers/addphoto.reducer';
import { photoDetailReducer } from './redux/reducers/photodetail.reducer';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    AddphotoComponent,
    GalleryComponent,
    AlbumsComponent,
    PhotodetailComponent,
    FilterPipe,
    EditModalComponent,
    ViewphotoComponent,
    AlbumitemComponent,
    AlbumformComponent,
    NotFoundComponent,
    LoaderComponent,
    DropdownDirective
  ],
  imports: [  
    BrowserModule,
    HttpModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    EffectsModule.forRoot([AppEffect]),
    StoreModule.forRoot(
      { 
        albumsPage: albumsReducer,
        galleryPage: photosReducer,
        addPhotoPage: addPhotoReducer,
        photoDetailPage: photoDetailReducer
      }),
    StoreRouterConnectingModule,
    StoreDevtoolsModule.instrument({
      logOnly: environment.production
    })
  ],
  providers: [PhotoService, CategoriesService],
  bootstrap: [AppComponent]
})
export class AppModule { } 
 