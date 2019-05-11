'use strict';
/* global state, $, api, state */
// eslint-disable-next-line no-unused-vars
const bookmark = (function () {
  function generateBookmarkElement(bookmark) {
    let bookmarkElement = `
    <li class="js-bookmark-element" data-bookmark-id="${bookmark.id}">
    <span class="bookmark-item">${bookmark.title}</span> 
    <div>${bookmark.rating} stars</div>
    <button id="bookmark-expand"class="bookmark-expand js-bookmark-expand">
      <span class="button-label">Expand</span>
    </button>
    <button class="bookmark-delete js-bookmark-delete">
      <span class="button-label">Delete</span>
    </button>
    </li>`;


    if (bookmark.expanded) {
      bookmarkElement = `<li class="js-bookmark-element" data-bookmark-id="${bookmark.id}">
      <span class="bookmark-item">${bookmark.title}</span>
      <div>${bookmark.desc}</div>
      <a id="bookmark-link" class="bookmark-link js-bookmark-link" href="${bookmark.url}" target="_blank">
        <span class="button-label">Visit Site</span>
      </a>
      <div>${bookmark.rating} stars</div>
        <button id="bookmark-expand-close" class="js-bookmark-expand js-bookmark-expand-close">
          <span class="button-label">Close</span>
        </button>
        <button class="bookmark-delete js-bookmark-delete">
          <span class="button-label">Delete</span>
        </button>
        </li>`;
    }

    return bookmarkElement;

  }

  function generateBookmarkString(bookmarks) {
    const bookmarkArray = bookmarks.map(bookmark => generateBookmarkElement(bookmark));
    return bookmarkArray.join('');
  }

  function render() {
    let bookmarks = [...state.bookmarks];
    if (state.addingNew) {
      $('#js-add-new-bookmark').removeClass('hidden');
      $('#js-add-button').addClass('hidden');
      $('#js-rating-filter').addClass('hidden');
    }
    else {
      $('#js-add-new-bookmark').addClass('hidden');
      $('#js-add-button').removeClass('hidden');
      $('#js-rating-filter').removeClass('hidden');
    }

    if (state.error !== null) {
      $('p').removeClass('hidden');
    }
    else {
      $('p').addClass('hidden');
    }
    const filteredBookmarks = bookmarks.filter(bookmark => bookmark.rating >= state.ratingFilter);
    const htmlString = generateBookmarkString(filteredBookmarks);
    $('.js-bookmark-list').html(htmlString);
  }

  function handleOpenAddForm() {
    $('#js-add-button').click(event => {
      event.preventDefault();
      if (state.addingNew === false) {
        state.toggleAddNew();
      }
      render();
    });
  }

  function handleAddFormClose() {
    $('#js-add-bookmark-form').on('reset', '#js-add-new-bookmark', event => {
      event.preventDefault();
      state.addingNew = false;
      state.error = null;
      render();
    });
  }

  function handleAddBookmark() {
    $('#js-add-bookmark-form').on('submit', '#js-add-new-bookmark', event => {
      event.preventDefault();
      const title = $('#js-title-input').val();
      const url = $('#js-url-input').val();
      const rating = $('#js-rating-input').val();
      const desc = $('#js-description-input').val();

      $('#js-title-input').val('');
      $('#js-url-input').val('');
      $('#js-rating-input').val('');
      $('#js-description-input').val('');

      const bookmark = {
        title,
        url,
        rating,
        desc,
        expanded: false,
      };
      api.createBookmark(bookmark)
        .then(newBookmark => {
          if (newBookmark.message) {
            state.updateError('Form Cannot be submitted');
          }
          else {
            state.addBookmark(newBookmark);
            state.addingNew = false;
            state.updateError(null);
          }
          render();
        });
    });
  }

  function getBookmarkIdFromElement(bookmark) {
    return $(bookmark)
      .closest('.js-bookmark-element')
      .data('bookmark-id');
  }

  function handleDeleteBookmark() {
    $('.js-bookmark-list').on('click', '.js-bookmark-delete', event => {
      const id = getBookmarkIdFromElement(event.target);
      api.deleteBookmark(id)
        .then(() => {
          state.findAndDelete(id);
          render();
        });
    });
  }

  function handleFilterClick() {
    $('#js-rating-filter').change(event => {
      const val = $(event.currentTarget).val();
      state.changeRatingFilter(val);
      render();
    });

  }

  function handleExpandClick() {
    $('.js-bookmark-list').on('click', '.js-bookmark-expand', event => {
      const id = getBookmarkIdFromElement(event.target);
      state.toggleExpanded(id);
      render();
    });
  }

  function bindEventListeners() {
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