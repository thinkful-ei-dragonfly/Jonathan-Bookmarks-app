'use strict';
/* global $, bookmark, api, state */

function main(){
  api.getBookmarks()
    .then(bookmarks =>{
      bookmarks.forEach(bookmark => state.addBookmark(bookmark));
      bookmark.render();
    });
  bookmark.bindEventListeners();
}

$(main);
