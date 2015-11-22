CardViewport = require("./card_viewport");
CardCache = require("./card_cache");

var CardColumn = React.createClass({
  render: function() {
    return (
      React.createElement("div", {className: "cardColumn"},
        React.createElement(CardViewport)
      )
    );
  }
});

module.exports = CardColumn;
