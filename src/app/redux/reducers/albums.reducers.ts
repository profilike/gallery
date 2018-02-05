import { AlbumAction, ALBUM_ACTION } from "../actions/albums.action";

const initialState = {
    albums: []
}

export function albumsReducer( state = initialState, action: AlbumAction  ) {
    switch(action.type) {
        case ALBUM_ACTION.GET_ALBUMS_SUCCESS: 
            return { 
                ...state, 
                albums: [...action.payload] 
            }
        case ALBUM_ACTION.ADD_ALBUM_SUCCESS:
            return {
                ...state,
                albums: [...state.albums, action.payload]
            }
        case ALBUM_ACTION.DELETE_ALBUM_SUCCESS:
            return {
                ...state,
                albums: [...state.albums.filter(a => a.id !== action.payload.id)]
            } 
        case ALBUM_ACTION.UPDATE_ALBUM_SUCCESS:
            const idx = state.albums.findIndex(a => a.id === action.payload.id)
            state.albums[idx] = action.payload
            return {
                ...state,
                albums: [...state.albums]
            }
        default:
            return state
    }
}