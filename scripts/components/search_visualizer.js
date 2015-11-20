CardColumn = require("./card_column");
BufferingCollator = require("./buffering_collator");
RewindStream = require("./rewind_stream");
SearchQuery = require("./search_query");

var SearchVisualizer = React.createClass({
  render: function() {
    return (
      React.createElement("div", {className: "searchVisualizer"},
        React.createElement(CardColumn),
        React.createElement(BufferingCollator),
        React.createElement(RewindStream),
        React.createElement(SearchQuery)
      )
    );
  }
});

module.exports = SearchVisualizer;
