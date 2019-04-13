const full = ['api', 'database', 'logging', 'web'];
const partial = ['api', 'web'];
const nonexistent = ['non', 'existent'];
const partialWithNonexistent = [...partial, ...nonexistent];
const fullWithNonexistent = [...full, ...nonexistent];

module.exports = {
  full,
  partial,
  nonexistent,
  partialWithNonexistent,
  fullWithNonexistent,
};
