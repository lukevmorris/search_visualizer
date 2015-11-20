CardStore = require("../stores/card_store");
Card = require("./card");

var BufferingCollator = React.createClass({
  _cards: function() {
    return CardStore.inBufferingCollator();
  },

  _onChange: function() {
    this.setState({ cards: this._cards() });
  },

  getInitialState: function() {
    return { cards: this._cards() };
  },

  componentDidMount: function() {
    CardStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    CardStore.removeChangeListener(this._onChange);
  },

  render: function() {
    var cardComponents = [];
    for(var i=0; i<this.state.cards.length; i++) {
      var card = this.state.cards[i];
      var newCard = React.createElement(Card, {key: card.id, card: card});
      cardComponents.push(newCard);
    }
    return (
      React.createElement("div", {className: "bufferingCollator"}, cardComponents)
    );
  }
});

module.exports = BufferingCollator;
