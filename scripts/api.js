'use strict';
// eslint-disable-next-line no-unused-vars
const api = (function(){
  const BASE_URL = 'https://thinkful-list-api.herokuapp.com/jonathan/bookmarks';

  const getBookmarks = function(){
    return fetch(BASE_URL)
    // eslint-disable-next-line indent
    .then(response => response.json);
  };

  const createBookmark = function(bookmark){
    const newBookmark = JSON.stringify(bookmark);
    const options = {
      method: 'POST',
      headers: new Headers({'Content-Type': 'application/json'}),
      body: newBookmark,
    };
    return fetch(BASE_URL, options)
      .then(res => res.json());
  };

  const deleteBookmark = function(id){
    const options = {
      method: 'DELETE',
    };
    fetch(`${BASE_URL}/${id}`, options);
  };
  
  return {
    getBookmarks,
    createBookmark,
    deleteBookmark,
  };
})();