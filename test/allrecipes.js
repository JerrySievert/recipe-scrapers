var test = require('tape');
var fs = require('fs');

var scraper = require('../lib/scrapers/allrecipes');

var html = fs.readFileSync(__dirname + '/fixtures/allrecipes.html', 'utf8');

test('finds ingredients', function (t) {
  t.plan(1);

  var recipe = scraper(html);

  t.equal(recipe.properties.ingredient.length, 16, 'has the correct number of ingredients');
});

test('find name', function (t) {
  t.plan(2);

  var recipe = scraper(html);

  t.equal(recipe.properties.name.length, 1, 'has the correct number of names');
  t.equal(recipe.properties.name[0], 'Chicken Breasts Pierre', 'the name is correct');
});

test('find duration', function (t) {
  t.plan(2);

  var recipe = scraper(html);

  t.equal(recipe.properties.duration.length, 1, 'has the correct number of durations');
  t.equal(recipe.properties.duration[0], '1 h 10 m', 'has the correct duration');
});

test('find instructions', function (t) {
  t.plan(3);

  var recipe = scraper(html);

  t.equal(recipe.properties.instructions.length, 1, 'has the correct number of instructions');
  t.equal(recipe.properties.instructions[0].html.length, 635, 'html is the correct length');
  t.equal(recipe.properties.instructions[0].value.length, 601, 'value is the correct length');
});

test('find photo', function (t) {
  t.plan(2);

  var recipe = scraper(html);

  t.equal(recipe.properties.photo.length, 1, 'has the correct number of photos');
  t.equal(recipe.properties.photo[0], 'http://images.media-allrecipes.com/userphotos/560x315/1009113.jpg', 'image is correct');
});

test('find category', function (t) {
  t.plan(5);

  var recipe = scraper(html);

  t.equal(recipe.properties.category.length, 4, 'has the correct number of categories');
  t.equal(recipe.properties.category[0], 'Meat and Poultry', 'first is correct');
  t.equal(recipe.properties.category[1], 'Chicken', 'second is correct');
  t.equal(recipe.properties.category[2], 'Chicken Breasts', 'third is correct');
  t.equal(recipe.properties.category[3], 'Skillet', 'fourth is correct');
});
