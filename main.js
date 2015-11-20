var SearchVisualizer = require("./scripts/components/search_visualizer");
var Playback = require("./scripts/playback");

ReactDOM.render(
  React.createElement(SearchVisualizer, null),
  document.getElementById("content")
);

Playback.initiate();

setInterval(function() {
  var viewport = document.getElementById("viewport");
  viewport.scrollTop = viewport.scrollHeight;
}, 1000);
