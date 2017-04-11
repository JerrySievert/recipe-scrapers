var url = require('url');

var request = require('request');

var scrapers = { };

function add_scraper (host, scraper) {
  scrapers[host] = scraper;
}

function scraper (location, callback) {
  var data = url.parse(location);

  if (scrapers[data.hostname] === undefined) {
    return callback("There are no scrapers available for " + data.hostname);
  }

  request.get(location, function (err, result, body) {
    if (err) {
      return callback(err);
    }

    callback(null, scrapers[data.hostname](body));
  });
}

exports.scraper = scraper;
exports.add_scraper = add_scraper;
