export const ADD_TO_BOOKMARK_LIST = 'ADD_TO_BOOKMARK_LIST';
export const REMOVE_FROM_BOOKMARK_LIST = 'REMOVE_FROM_BOOKMARK_LIST';
export const DOWNLOADED_BOOK ="DOWNLOADED_BOOK";
export const UPDATE_PROGRESS ="UPDATE_PROGRESS";
export const REMOVE_DOWNLOAD ="REMOVE_DOWNLOAD";
export const UPDATE_DARKMODE ="UPDATE_DARKMODE";


export const downloadBooks = bookdata => dispatch => {
  let downloadedBookData={
    id: bookdata.id,
    md5: bookdata.md5,
    title: bookdata.title,
    author: bookdata.author,
    extension: bookdata.extension,
    coverurl:bookdata.coverurl,
    path:null,
    progress:0,
    cflink:bookdata.cflink,
    task:{state:"DOWNLOADING"},
  }
  dispatch({
    type: DOWNLOADED_BOOK,
    payload: downloadedBookData
  });
};

export const addBookmark = book => dispatch => {
    dispatch({
      type: ADD_TO_BOOKMARK_LIST,
      payload: book
    });
  };
  
  export const removeBookmark = book => dispatch => {
    dispatch({
      type: REMOVE_FROM_BOOKMARK_LIST,
      payload: book
    });
  };

  export const updateProgress = book => dispatch => {
    dispatch({
      type: UPDATE_PROGRESS,
      payload: book
    });
  };
  
  export const removeDownload = book => dispatch => {
    dispatch({
      type: REMOVE_DOWNLOAD,
      payload: book
    });
  };
  
  export const configuretheme = theme => dispatch => {
    dispatch({
      type: UPDATE_DARKMODE,
      payload: theme
    });
  };

 