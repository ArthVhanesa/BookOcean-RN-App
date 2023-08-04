import {
  ADD_TO_BOOKMARK_LIST,
  REMOVE_FROM_BOOKMARK_LIST,
  DOWNLOADED_BOOK,
  UPDATE_PROGRESS,
  REMOVE_DOWNLOAD,
  UPDATE_DARKMODE
} from './actions';

const initialState = {
  bookmarks: [],
  downloads: [],
  theme: "dark"
};

function booksReducer(state = initialState, action) {
  switch (action.type) {

    case ADD_TO_BOOKMARK_LIST:
      return { ...state, bookmarks: [...state.bookmarks, action.payload] };
    case REMOVE_FROM_BOOKMARK_LIST:
      return {
        ...state,
        bookmarks: state.bookmarks.filter(book => book.id !== action.payload.id)
      };
    case REMOVE_DOWNLOAD:
      return {
        ...state,
        downloads: state.downloads.filter(book => book.id !== action.payload.id)
      };
    case DOWNLOADED_BOOK:
      return { ...state, downloads: [...state.downloads, action.payload] };

    case UPDATE_PROGRESS:
      return {
        ...state, downloads: [...state.downloads.map(a => {
          var returnValue = { ...a };

          if (a.id === action.payload.id) {
            returnValue.progress = action.payload.progress;
          }

          return returnValue
        })]
      }

    case UPDATE_DARKMODE:
      return { ...state,theme: action.payload };

    default:
      return state;
  }
}

export default booksReducer;