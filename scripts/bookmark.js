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
    if(state.addingNew){
      $('#js-add-bookmark-form').append(`<form id='js-add-new-bookmark'>
      <label for="title">Title: </label>
      <input type="text" name ="title" id = "js-title-input">
      <label for="url">URL: </label>
      <input type="url" name = "url" id ="js-url-input">
      <label for="description">Description: </label>
      <input type="text" name="description" id="js-description-input">
      <button type="submit">Submit</button>
      <button type="cancel" id="js-add-close">Close</button>`);
    }
    let bookmarks = [...state.bookmarks ];
    const htmlString = generateBookmarkString(bookmarks);
    $('#js-bookmark-list').html(htmlString);
  }

  function handleOpenAddForm(){
    $('#js-add-bookmark-form').submit(event => {
      event.preventDefault();
      state.toggleAddNew();
      render();
    });
  }

  function handleAddFormCancel(){

  }

  function handleAddBookmark(){
    $('#js-add-new-bookmark').submit(event => {
      event.preventDefault();
      const title = $('#js-title-input').val();
      const url = $('#js-url-input').val();
      const rating = $('#js-rating-input').val();
      const description = $('#js-description-input').val();

      const bookmark = {
        title,
        url,
        rating,
        description,
        expanded: false,
      };
      api.createBookmark(bookmark)
        .then(newBookmark => {
          state.addBookmark(newBookmark);
          render();
        });
      
    });
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