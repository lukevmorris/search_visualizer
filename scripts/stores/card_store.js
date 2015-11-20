var assign = require("object-assign");
var EventEmitter = require("events").EventEmitter;
var AppDispatcher = require("../dispatcher");

var _cards = {}

function createCard(card) {
  var entropy = parseInt(Math.random() * 1998 - 999);
  _cards[card.id] = {
    id: card.id,
    location: "apiBuffer",
    timestamp: card.timestamp + entropy,
    source: card.source
  };
}

function moveCard(id, location) {
  _cards[id].location = location;
}

function sortCards(cards) {
  cards.sort(function(cardA, cardB) {
    if (cardB.timestamp < cardA.timestamp) {
      return -1;
    } else if (cardA.timestamp === cardB.timestamp) {
      return 0;
    } else {
      return 1;
    }
  });
}

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
        createCard(payload.card);
        CardStore.emitChange();
        break;

      case "moveCard":
        moveCard(payload.id, payload.location);
        CardStore.emitChange();
        break;

    }

    return true;
  })

});

module.exports = CardStore;
