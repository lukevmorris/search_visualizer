var http = require("http");
var ActionHelpers = require("./action_helpers");

var Playback = {
  initiate: function() {
    http.get({ path: "/playback/fast_justin_bieber" }, function(response) {
      var result = "";
      response.on("data", function(buffer) { result += buffer; });
      response.on("end", function() { Playback.wholeSearch(result); });
    });
  },

  wholeSearch: function(search) {
    var lines = search.split("\n");
    var timeStart = +lines[0].split(" ")[0];

    for (i=0; i<lines.length; i++) {
      var line = lines[i];
      if (line !== "") {
        this.oneLine(timeStart, line);
      }
    }
  },

  oneLine: function(timeStart, line) {
    var details = line.split(" ");
    var timestamp = +details[0],
        command = details[1],
        params = details.slice(2);

    var fn = ActionHelpers[command];
    var delay = timestamp - timeStart;

    setTimeout(function() {
      fn.apply(this, params);
    }, delay);
  }
}

module.exports = Playback;
