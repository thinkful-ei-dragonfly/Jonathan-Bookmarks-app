'use strict';
/* global store, $, api, state */
// eslint-disable-next-line no-unused-vars

const bookmark = (function(){
  function generateBookmarkElement(bookmark){
    let bookmarkElement = `<span class="bookmark-item">${bookmark.title}</span>`;
    return `
    <li class="js-bookmark-element" data-bookmark-id="${bookmark.id}">
    ${bookmarkElement} 
    <div>${bookmark.rating} stars</div>
    <button class="bookmark-expand js-bookmark-expand">
      <span class="button-label">Expand</span>
    </button>
    <button class="bookmark-delete js-bookmark-delete">
      <span class="button-label">Delete</span>
    </button>
    </li>`;
  }

  function generateBookmarkString(bookmarks){
    const bookmarkArray = bookmarks.map(bookmark => generateBookmarkElement(bookmark));
    return bookmarkArray.join('');
  }
  
  function render(){
    if(state.addingNew){
      $('#js-add-new-bookmark').removeClass('hidden');
    }
    else{
      $('#js-add-new-bookmark').addClass('hidden');
    }
    let bookmarks = [...state.bookmarks ];
    const htmlString = generateBookmarkString(bookmarks);
    $('.js-bookmark-list').html(htmlString);
  }

  function handleOpenAddForm(){
    $('#js-add-button').click(event => {
      event.preventDefault();
      state.toggleAddNew();
      render();
    });
  }

  function handleAddFormClose(){

  }

  function handleAddBookmark(){
    $('#js-add-bookmark-form').on('submit', '#js-add-new-bookmark', event => {
      event.preventDefault();
      const title = $('#js-title-input').val();
      const url = $('#js-url-input').val();
      const rating = $('.rating').val();
      const description = $('#js-description-input').val();

      $('#js-title-input').val('');
      $('#js-url-input').val('');
      $('#js-rating-input').val('');
      $('#js-description-input').val('');

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
          state.addingNew = false;
          render();
        });
      
    });
  }

  function getBookmarkIdFromElement(bookmark){
    return $(bookmark)
      .closest('.js-bookmark-element')
      .data('bookmark-id');
  }
  
  function handleDeleteBookmark(){
    $('.js-bookmark-list').on('click', '.js-bookmark-delete', event =>{
      const id = getBookmarkIdFromElement(event.target);
      api.deleteBookmark(id)
        .then(response => {
          state.findAndDelete(id);
          render();
        });
    });
  }

  function handleFilterClick(){
    render();

  }

  function handleExpandClick(){

  }

  function bindEventListeners(){
    handleOpenAddForm();
    handleAddFormClose();
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