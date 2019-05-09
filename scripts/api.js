'use strict';
/* eslint-disable no-unused-vars */
const api = (function(){
  const BASE_URL = 'https://thinkful-list-api.herokuapp.com/jonathan/bookmarks';

  function getBookmarks(){
    return fetch(BASE_URL)
    // eslint-disable-next-line indent
    .then(response => response.json);
  }

  function createBookmark(bookmark){
    const newBookmark = JSON.stringify(bookmark);
    const options = {
      method: 'POST',
      headers: new Headers({'Content-Type': 'application/json'}),
      body: newBookmark,
    };
    return fetch(BASE_URL, options);
  }

  function deleteBookmark(id){
    const options = {
      method: 'DELETE',
    };
    fetch(`${BASE_URL}/${id}`, options);
  }
  
  return {
    getBookmarks,
    createBookmark,
    deleteBookmark,
  };
})();