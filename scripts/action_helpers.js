var AppDispatcher = require("./dispatcher");

var ActionHelpers = {
  newQuery: function() {
    var args = Array.prototype.slice.call(arguments);
    var contentType = args[0];
    var query = args.slice(1).join(" ");
    AppDispatcher.dispatch({ actionType: "newQuery", query: query, contentType: contentType });
  },

  markLoading: function(api) {
    AppDispatcher.dispatch({ actionType: "markLoading", api: api });
  },

  markIdle: function(api) {
    AppDispatcher.dispatch({ actionType: "markIdle", api: api });
  },

  createCard: function(url, timestamp, source) {
    var card = { url: url, timestamp: +timestamp, source: source };
    AppDispatcher.dispatch({ actionType: "createCard", card: card});
  },

  moveCard: function(url, location) {
    AppDispatcher.dispatch({ actionType: "moveCard", url: url, location: location });
  }
}

module.exports = ActionHelpers;
