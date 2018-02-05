import { Album } from "../shared/models/album.model";
import { Photo } from "../shared/models/photo.model";

export interface AppState {
    albumsPage: {
        albums: Album[]
    },
    photosPage: {
        photos: Photo[]
    } 
}