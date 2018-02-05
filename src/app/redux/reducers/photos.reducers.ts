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
        case PHOTO_ACTION.ADD_PHOTO_SUCCESS:
            return {
                ...state,
                photos: [...state.photos, action.payload]
            }
            case PHOTO_ACTION.DELETE_PHOTO_SUCCESS:
            return {
                ...state,
                photos: [...state.photos.filter(p => p.id !== action.payload.id)]
            }
        case PHOTO_ACTION.UPDATE_PHOTO_SUCCESS:
            const idx = state.photos.findIndex(p => p.id === action.payload.id)
            state.photos[idx] = action.payload
            return {
                ...state,
                photos: [...state.photos]
            }
        default:
            return state
    }
}