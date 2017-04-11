var microformats = require('microformat-node');
var cheerio = require('cheerio');

function scraper (html, callback) {
  var $ = cheerio.load(html);

  var options = { };
  options.node = $;

  microformats.get(options, function (err, data) {
    if (err) {
      callback(err);
    } else if (data.items.length) {
      callback(null, data.items[0]);
    } else {
      callback();
    }
  });
}

module.exports = exports = scraper;
