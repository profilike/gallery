import { PhotoAction, PHOTO_ACTION } from "../actions/photos.action";

const initialState = {
    photo: {},
}

export function photoDetailReducer( state = initialState, action: PhotoAction ) {
    switch(action.type) {
        
        case PHOTO_ACTION.GET_PHOTO_BY_ID_SUCCESS: 
            return Object.assign({}, state, {
                photo: action.payload 
            });
            
        case PHOTO_ACTION.UPDATE_PHOTO_SUCCESS:
            return Object.assign({}, state, {
                photo: action.payload 
            });
        default:
            return state
    }
}