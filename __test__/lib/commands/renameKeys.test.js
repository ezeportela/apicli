const {renameKeys} = require('../../../utils');

test('test utils renameKeys', () => {
  const ctx = {n1: 1, n2: 2, n3: 3};
  const keys = {
    n1: 'one',
    n2: 'two',
  };
  const result = renameKeys(keys, ctx);
  expect(result).toEqual({one: 1, two: 2, n3: 3});
});
