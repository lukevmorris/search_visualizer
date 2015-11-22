Card = require("./card");
CardStore = require("../stores/card_store");

var CardViewport = React.createClass({
  _cards: function() {
    return CardStore.inViewport();
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
    for (i=0; i<this.state.cards.length; i++) {
      var card = this.state.cards[i];
      var newCard = React.createElement(Card, {key: card.url, card: card});
      cardComponents.push(newCard);
    }
    return (
      React.createElement("div", {id: "viewport", className: "cardViewport"}, cardComponents)
    );
  }
});

module.exports = CardViewport;
