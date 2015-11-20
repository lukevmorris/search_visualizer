var Card = React.createClass({
  render: function() {
    var cardClass = "card " + this.props.card.source;
    return (
      React.createElement("div", {className: cardClass, title: this.props.card.timestamp})
    );
  }
});

module.exports = Card;
