var scraper = require('./lib/scraper');

scraper.add_scraper('allrecipes.com', require('./lib/scrapers/allrecipes'));

exports.scrape = scraper.scraper;
