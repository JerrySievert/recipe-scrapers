# Recipe Scraper

Scrapes recipes and returns them in `h-recipe` format.

## Usage

```
var scraper = require('recipe-scraper');

scraper.scrape('http://allrecipes.com/recipe/16707/chicken-breasts-pierre', function (err, result) {
  console.log(result);
});
```

## Current Support

* allrecipes.com
