var assign = require("object-assign");
var EventEmitter = require("events").EventEmitter;
var AppDispatcher = require("../dispatcher");

_apis = {
  "twitter": "idle",
  "facebook": "idle",
  "instagram": "idle"
}

function markIdle(api) {
  _apis[api] = "idle";
}

function markLoading(api) {
  _apis[api] = "loading";
}

var ApiStore = assign({}, EventEmitter.prototype, {
  isLoading: function(api) {
    return _apis[api] === "loading";
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
      case "markLoading":
        markLoading(payload.api);
        ApiStore.emitChange();
        break;

      case "markIdle":
        markIdle(payload.api);
        ApiStore.emitChange();
        break;
    }
  })
});

module.exports = ApiStore;
