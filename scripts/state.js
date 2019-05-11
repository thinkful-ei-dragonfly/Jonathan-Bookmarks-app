'use strict';
// eslint-disable-next-line no-unused-vars
const state = (function(){

  const findAndDelete = function(id){
    this.bookmarks = this.bookmarks.filter(item => item.id !== id);
  };

  function addBookmark(bookmark){
    bookmark.expanded = false; 
    this.bookmarks.push(bookmark);
  }

  function toggleAddNew() {
    this.addingNew = !this.addingNew;
  }

  function changeRatingFilter(rating){
    this.ratingFilter = rating;
  }

  function updateError(error) {
    this.error = error;
  }

  function toggleExpanded(id){
    const toggledObj = this.bookmarks.find(bookmark => bookmark.id === id);
    toggledObj.expanded = !toggledObj.expanded;
  }

  return {
    bookmarks: [],
    addingNew: false,
    ratingFilter: 0,
    error: null,
    addBookmark,
    toggleAddNew,
    toggleExpanded,
    changeRatingFilter,
    updateError,
    findAndDelete,
  };
})();