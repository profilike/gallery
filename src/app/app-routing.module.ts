import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';
import { GalleryComponent } from "./gallery/gallery.component";
import { AddphotoComponent } from "./addphoto/addphoto.component";
import { AlbumsComponent } from "./albums/albums.component";
import { PhotodetailComponent } from "./photodetail/photodetail.component";
import { NotFoundComponent } from "./shared/components/not-found/not-found.component";

const routes: Routes =  [
    { path: '' , component: AddphotoComponent },
    { path: 'gallery', component: GalleryComponent },
    { path: 'gallery/:id', component: PhotodetailComponent },
    { path: 'albums' , component: AlbumsComponent },
    { path: '**', component: NotFoundComponent }
]

@NgModule({
    imports: [
        [RouterModule.forRoot(routes)]
    ],
    exports: [RouterModule]
})
export class AppRoutingModule{}