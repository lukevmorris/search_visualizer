var assign = require("object-assign");
var EventEmitter = require("events").EventEmitter;
var AppDispatcher = require("../dispatcher");

_query = "";
_contentType = "";

function updateSearch(query, contentType) {
  _query = query;
  _contentType = contentType;
}

var QueryStore = assign({}, EventEmitter.prototype, {
  getSearch: function() {
    return {query: _query, contentType: _contentType};
  },

  emitChange: function() {
    this.emit("change");
  },

  addChangeListener: function(callback) {
    this.on("change", callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener("change", callback);
  },

  dispatcherIndex: AppDispatcher.register(function(payload) {
    switch(payload.actionType) {
      case "newQuery":
        updateSearch(payload.query, payload.contentType);
        QueryStore.emitChange()
        break;
    }
  })
});

module.exports = QueryStore;
