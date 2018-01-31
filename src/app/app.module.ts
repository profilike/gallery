import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { AddphotoComponent } from './addphoto/addphoto.component';
import { GalleryComponent } from './gallery/gallery.component';
import { EditcatComponent } from './editcat/editcat.component';
import { PhotoService } from './shared/services/photo.service';
import { PhotodetailComponent } from './photodetail/photodetail.component';
import { CategoriesService } from './shared/services/categories.service';
import { FilterPipe } from './shared/pipes/filter.pipe';
import { EditModalComponent } from './photodetail/edit-modal/edit-modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ViewphotoComponent } from './photodetail/viewphoto/viewphoto.component';
import { AlbumitemComponent } from './editcat/albumitem/albumitem.component';
import { AlbumformComponent } from './editcat/albumform/albumform.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    AddphotoComponent,
    GalleryComponent,
    EditcatComponent,
    PhotodetailComponent,
    FilterPipe,
    EditModalComponent,
    ViewphotoComponent,
    AlbumitemComponent,
    AlbumformComponent
  ],
  imports: [  
    BrowserModule,
    HttpModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [PhotoService, CategoriesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
