const request = require('superagent');
const { parse } = require('node-html-parser');

const scrapeNames = async (url) => {
  const names = await request.get(url)
    .then(res => res.text)
    .then(parse)
    .then(findCharLink)
    .then(findCharNames)
    .then(names => names.filter(function (str) {
        return !str.includes('File:')
      })
    );
  return names;
};

const findCharLink = html => html.querySelectorAll('.category-page__member-link');

const findCharNames = objs => {
  const names = objs.map(obj => obj.childNodes[0].rawText);
  return names.filter(name => !name.includes('Category:'));
};

module.exports = {
  scrapeNames
}