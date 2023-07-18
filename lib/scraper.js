import * as cheerio from 'cheerio';
import fs from 'fs-extra';

const mcuOrder = 'https://www.imdb.com/list/ls029032797/';

async function scrapeData() {
  try {
    // reach out to imdb list page and get html
    const res = await fetch(mcuOrder);
    const resHtml = await res.text();

    // init cheerio with fetched html
    const $ = cheerio.load(resHtml);

    // get list item
    const items = $('.lister-item');

    const order = [];

    // loop through els and get text of a tags
    items.each((i, el) => {
      const title = $(el).children('.lister-item-content').children('.lister-item-header').children('a').text();
      const desc = $(el).children('.list-description').children('p').text();
      order.push({title, desc});
    });

    // write to json output file
    fs.writeJSONSync('./_data/order.json', order);
  } catch (err) {
    console.error(err);
  }
}

scrapeData();