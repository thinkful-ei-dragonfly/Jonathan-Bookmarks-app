'use strict';
/* global store, $, api, state */
// eslint-disable-next-line no-unused-vars

const bookmark = (function(){
  function generateBookmarkElement(bookmark){

  }

  function generateBookmarkString(bookmarks){
    generateBookmarkElement();

  }
  
  function render(){
    let bookmarks = [...state.bookmarks ];
    const htmlString = generateBookmarkString(bookmarks);
    $('#js-bookmark-list').html(htmlString);
  }

  function handleOpenAddForm(){

  }

  function handleAddFormCancel(){

  }

  function handleAddBookmark(){
    render();

  }

  function handleDeleteBookmark(){
    render();

  }

  function handleFilterClick(){
    render();

  }

  function handleExpandClick(){

  }

  function bindEventListeners(){
    handleOpenAddForm();
    handleAddFormCancel();
    handleAddBookmark();
    handleDeleteBookmark();
    handleFilterClick();
    handleExpandClick();
  }
  return {
    render,
    bindEventListeners,
  };
}());