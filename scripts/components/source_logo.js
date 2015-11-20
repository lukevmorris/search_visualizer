ApiStore = require("../stores/api_store");

var SourceLogo = React.createClass({
  _onChange: function() {
    var loading = ApiStore.isLoading(this.props.source);
    this.setState({ loading: loading });
  },

  getInitialState: function() {
    return { loading: false };
  },

  componentDidMount: function() {
    ApiStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    ApiStore.removeChangeListener(this._onChange);
  },

  iconClass: function() {
    var logoClass = null;
    if (this.props.source === "facebook") {
      logoClass = "fa fa-fw fa-facebook-square";
    } else if (this.props.source === "instagram") {
      logoClass = "fa fa-fw fa-instagram";
    } else if (this.props.source === "twitter") {
      logoClass = "fa fa-fw fa-twitter-square";
    }

    if (this.state.loading) {
      logoClass += " loading";
    }

    return logoClass;
  },

  render: function() {
    return (
      React.createElement("div", {className: "sourceLogo"},
        React.createElement("i", {className: this.iconClass()})
      )
    );
  }
});

module.exports = SourceLogo;
