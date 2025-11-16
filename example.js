const { suggest } = require('./suggestor');

const clothes = [
  { id: 'c1', name: 'Blue T-Shirt', category: 'top', color: 'blue', warmth: 3, styles: ['casual'], available: true },
  { id: 'c2', name: 'Wool Coat', category: 'outer', color: 'black', warmth: 10, styles: ['formal'], available: true },
  { id: 'c3', name: 'Jeans', category: 'bottom', color: 'blue', warmth: 6, styles: ['casual'], available: true },
  { id: 'c4', name: 'Sneakers', category: 'shoes', color: 'white', warmth: 2, styles: ['casual','sport'], available: true },
  { id: 'c5', name: 'Silk Shirt', category: 'top', color: 'white', warmth: 2, styles: ['formal'], available: true },
  { id: 'c6', name: 'Rain Jacket', category: 'outer', color: 'yellow', warmth: 4, styles: ['casual'], available: true },
];

const options = {
  limit: 3,
  desiredCategories: ['top','outer','bottom','shoes'],
  temperature: 12, // cool
  preferredColors: ['blue','white'],
  style: 'casual',
};

const top = suggest(clothes, options);

console.log('Top suggestions:');
top.forEach((c, idx) => {
  console.log(`#${idx+1}: ${c.name} (${c.category}) — score: ${c._score}`);
});
