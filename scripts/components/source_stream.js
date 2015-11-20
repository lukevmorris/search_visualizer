SourceBuffer = require("./source_buffer");
SourceLogo = require("./source_logo");

var SourceStream = React.createClass({
  render: function() {
    return (
      React.createElement("div", {className: "sourceStream"},
        React.createElement(SourceBuffer, {source: this.props.source}),
        React.createElement(SourceLogo, {source: this.props.source})
      )
    );
  }
});

module.exports = SourceStream;
