var SearchVisualizer = require("./scripts/components/search_visualizer");
var Playback = require("./scripts/playback");

ReactDOM.render(
  React.createElement(SearchVisualizer, null),
  document.getElementById("content")
);

window.addEventListener("storage", function(event) {
  console.log("Herro");
  if (event.key === "searchVisualizerStorage") {
    console.log("Something changed!");
  }
});

Playback.initiate();

setInterval(function() {
  var viewport = document.getElementById("viewport");
  viewport.scrollTop = viewport.scrollHeight;
}, 1000);
