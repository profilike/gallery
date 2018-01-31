import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';
import { GalleryComponent } from "./gallery/gallery.component";
import { AddphotoComponent } from "./addphoto/addphoto.component";
import { EditcatComponent } from "./editcat/editcat.component";
import { PhotodetailComponent } from "./photodetail/photodetail.component";

const routes: Routes =  [
    { path: '', component: GalleryComponent },
    { path: 'addphoto' , component: AddphotoComponent },
    { path: 'albums' , component: EditcatComponent },
    { path: 'gallery/:id', component: PhotodetailComponent }
]

@NgModule({
    imports: [
        [RouterModule.forRoot(routes)]
    ],
    exports: [RouterModule]
})
export class AppRoutingModule{}