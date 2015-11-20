var QueryStore = require("../stores/query_store");

var SearchQuery = React.createClass({
  _onChange: function() {
    var search = QueryStore.getSearch();
    this.setState({ query: search.query, contentType: search.contentType });
  },

  getInitialState: function() {
    search = QueryStore.getSearch();
    return { query: search.query, contentType: search.contentType };
  },

  componentDidMount: function() {
    QueryStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    QueryStore.removeChangeListener(this._onChange);
  },

  contentTypeIcon: function() {
    var cType = this.state.contentType;
    if (cType === "videos") {
      return "fa fa-video-camera";
    } else if (cType === "photos") {
      return "fa fa-camera";
    } else if (cType === "conversations") {
      return "fa fa-comment";
    } else {
      return "fa fa-star";
    }
  },

  render: function() {
    return (
      React.createElement("div", {className: "searchQuery"},
        React.createElement("div", {}, this.state.query),
        React.createElement("div", {className: this.contentTypeIcon()})
      )
    );
  }
});

module.exports = SearchQuery;
