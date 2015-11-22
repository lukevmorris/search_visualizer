var assign = require("object-assign");
var EventEmitter = require("events").EventEmitter;
var AppDispatcher = require("../dispatcher");

var _cards = {};
var _commands = [];
var _index = 0;

function asyncCommand(command) {
  _commands.push(command);
}

var CardCommands = {
  createCard: function(card) {
    _cards[card.url] = {
      url: card.url,
      location: "apiBuffer",
      timestamp: card.timestamp,
      source: card.source,
      index: 0
    };
  },

  moveCard: function(url, location) {
    _cards[url].location = location;
    if (location === "bufferingCollator") {
      _cards[url].index = _index;
      _index++;
    }
  }
}

function sortCards(cards) {
  cards.sort(function(cardA, cardB) {
    if (cardA.index < cardB.index) {
      return -1;
    } else if (cardA.index === cardB.index) {
      return 0;
    } else {
      return 1;
    }
  });
}

setInterval(function() {
  var command = _commands.shift();
  if(command !== undefined) {
    var fnName = command[0];
    var fnArgs = command.slice(1);
    CardCommands[fnName].apply(this, fnArgs);
    CardStore.emitChange();
  }
}, 5);

var CardStore = assign({}, EventEmitter.prototype, {
  inApiBuffer: function(source) {
    var apiBufferCards = [];

    for (var id in _cards) {
      var card = _cards[id];
      if (card.location === "apiBuffer" && card.source === source) {
        apiBufferCards.push(card);
      }
    }

    sortCards(apiBufferCards);
    return apiBufferCards;
  },

  inBufferingCollator: function() {
    var buffCollatorCards = [];

    for (var id in _cards) {
      var card = _cards[id];
      if (card.location === "bufferingCollator") {
        buffCollatorCards.push(card);
      }
    }

    sortCards(buffCollatorCards);
    return buffCollatorCards;
  },

  inViewport: function() {
    var viewportCards = [];

    for (var id in _cards) {
      var card = _cards[id];
      if (card.location === "viewport") {
        viewportCards.push(card);
      }
    }

    sortCards(viewportCards);
    return viewportCards;
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
      case "createCard":
        asyncCommand(["createCard", payload.card])
        break;

      case "moveCard":
        asyncCommand(["moveCard", payload.url, payload.location]);
        break;

    }

    return true;
  })

});

module.exports = CardStore;
