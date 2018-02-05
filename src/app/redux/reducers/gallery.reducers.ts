import { PhotoAction, PHOTO_ACTION } from "../actions/photos.action";

const initialState = {
    photos: []
}

export function photosReducer( state = initialState, action: PhotoAction ) {
    switch(action.type) {
        case PHOTO_ACTION.GET_PHOTOS_SUCCESS: 
            return { 
                ...state, 
                photos: [...action.payload] 
            }
            
        case PHOTO_ACTION.DELETE_PHOTO_SUCCESS:
            return {
                ...state,
                photos: [...state.photos.filter(p => p.id !== action.payload.id)]
            }
        default:
            return state
    }
}