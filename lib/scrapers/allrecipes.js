var cheerio = require('cheerio');

function scraper (html, callback) {
  var recipe = {
    type: 'h-recipe',
    properties: {
      ingredient: [ ]
    }
  };

  var $ = cheerio.load(html);

  // name
  recipe.properties.name = [ $('h1[itemprop=name]').text() ];

  // ingredients
  $('span[itemprop=ingredients]').each(function (idx, elem) {
    recipe.properties.ingredient.push($(elem).text());
  });

  // duration
  recipe.properties.duration = [ $('time[itemprop=totalTime]').text() ];

  // instructions
  $('span.recipe-directions__list--item').each(function (idx, elem) {
    if (recipe.properties.instructions === undefined) {
      recipe.properties.instructions = [
        {
          html: '<ul>',
          value: ''
        }
      ];
    } else {
      recipe.properties.instructions[0].value += '\n';
    }

    recipe.properties.instructions[0].html += '<li>' + $(elem).html() + '</li>';
    recipe.properties.instructions[0].value += $(elem).text();
  });
  if (recipe.properties.instructions) {
    recipe.properties.instructions[0].html += '</ul>';
  }

  // photo
  recipe.properties.photo = [ $('.rec-photo').attr('src') ];

  // category
  var current = 0;
  $('.toggle-similar__title').each(function (idx, elem) {
    if (recipe.properties.category === undefined) {
      recipe.properties.category = [ ];
    }

    if (current >= 2) {
      recipe.properties.category.push($(elem).text().trim());
    }

    current++;
  });

  callback(null, recipe);
}

exports = module.exports = scraper;
