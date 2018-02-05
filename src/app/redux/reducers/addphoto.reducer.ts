import { PhotoAction, PHOTO_ACTION } from "../actions/photos.action";

const initialState = {
    photos: []
}

export function addPhotoReducer( state = initialState, action: PhotoAction ) {
    switch(action.type) {
        case PHOTO_ACTION.GET_PHOTOS_SUCCESS: 
            return { 
                ...state, 
                photos: [...action.payload] 
            }
        case PHOTO_ACTION.ADD_PHOTO_SUCCESS:
            return {
                ...state,
                photos: [...state.photos, action.payload]
            }
        default:
            return state
    }
}