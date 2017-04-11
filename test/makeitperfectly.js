var test = require('tape');
var fs = require('fs');

var scraper = require('../lib/scrapers/hrecipe');

var html = fs.readFileSync(__dirname + '/fixtures/makeitperfectly.html', 'utf8');

test('hrecipe finds ingredients', function (t) {
  t.plan(1);

  scraper(html, function (err, recipe) {
    t.equal(recipe.properties.ingredient.length, 11, 'has the correct number of ingredients');
  });
});

test('hrecipe find name', function (t) {
  t.plan(2);

  scraper(html, function (err, recipe) {
    t.equal(recipe.properties.name.length, 1, 'has the correct number of names');
    t.equal(recipe.properties.name[0], 'Brioche', 'the name is correct');
  });
});

test('hrecipe find photo', function (t) {
  t.plan(3);

  scraper(html, function (err, recipe) {
    t.equal(recipe.properties.photo.length, 2, 'has the correct number of photos');
    t.equal(recipe.properties.photo[0], 'https://s3.amazonaws.com/perfectcontent/images/f9bc3ff0-1954-11e6-bced-45404e44cb61.jpg', 'image is correct');
    t.equal(recipe.properties.photo[1], 'https://s3.amazonaws.com/perfectcontent/images/f9bc3ff0-1954-11e6-bced-45404e44cb61.jpg', 'image is correct');
  });
});
