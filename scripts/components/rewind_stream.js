SourceStream = require("./source_stream");

var RewindStream = React.createClass({
  render: function() {
    return (
      React.createElement("div", {className: "rewindStream"},
        React.createElement(SourceStream, {source: "twitter", cards: 25}),
        React.createElement(SourceStream, {source: "facebook", cards: 50}),
        React.createElement(SourceStream, {source: "instagram", cards: 75})
      )
    );
  }
});

module.exports = RewindStream;
