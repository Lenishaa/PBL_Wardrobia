/**
 * Suggestor module
 * Accepts an array of clothing items and scoring options, returns top N suggestions.
 * Clothing item shape example:
 * {
 *   id: 'c1', name: 'Blue T-Shirt', category: 'top', color: 'blue', warmth: 3,
 *   styles: ['casual','sport'], available: true
 * }
 */

function _defaultOptions() {
  return {
    limit: 3,
    desiredCategories: [], // prioritize these categories
    temperature: undefined, // in °C
    occasion: undefined, // reserved for future
    preferredColors: [],
    style: undefined,
  };
}

function _idealWarmthForTemp(temp) {
  if (temp === undefined || temp === null) return 5;
  if (temp > 24) return 1;
  if (temp >= 15) return 5;
  if (temp >= 5) return 8;
  return 10;
}

function scoreItem(item, opts) {
  if (!item || item.available === false) return -Infinity;
  let score = 0;

  // Category preference
  if (Array.isArray(opts.desiredCategories) && opts.desiredCategories.length) {
    if (opts.desiredCategories.includes(item.category)) score += 20;
    else score += 5;
  } else {
    score += 10;
  }

  // Style match
  if (opts.style && Array.isArray(item.styles) && item.styles.includes(opts.style)) score += 15;

  // Color preference
  if (Array.isArray(opts.preferredColors) && opts.preferredColors.includes(item.color)) score += 10;

  // Warmth suitability
  const ideal = _idealWarmthForTemp(opts.temperature);
  if (typeof item.warmth === 'number') {
    const diff = Math.abs(item.warmth - ideal);
    score += Math.max(0, 12 - diff); // closer to ideal gives up to +12
  }

  // Occasion and other advanced features can be added later

  // Slight tie breaker by id hash
  const tie = (String(item.id).split('').reduce((s,ch)=>s+ch.charCodeAt(0),0) % 5) / 100;
  score += tie;

  return score;
}

/**
 * Suggest top clothing items.
 * @param {Array<Object>} clothes
 * @param {Object} options
 * @returns {Array<Object>} top items (includes original item and _score)
 */
function suggest(clothes, options) {
  const opts = Object.assign(_defaultOptions(), options || {});
  if (!Array.isArray(clothes)) throw new Error('clothes must be an array');

  const scored = clothes.map(item => ({ item, _score: scoreItem(item, opts) }))
    .filter(r => isFinite(r._score))
    .sort((a,b) => b._score - a._score)
    .slice(0, opts.limit)
    .map(r => Object.assign({}, r.item, { _score: Number(r._score.toFixed(3)) }));

  return scored;
}

module.exports = { suggest };
