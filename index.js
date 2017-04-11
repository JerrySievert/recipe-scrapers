var scraper = require('./lib/scraper');

scraper.add_scraper('allrecipes.com', require('./lib/scrapers/allrecipes'));
scraper.add_scraper('makeitperfectly.com', require('./lib/scrapers/hrecipe'));

exports.scrape = scraper.scraper;
