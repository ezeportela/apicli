const {mapObject} = require('../../../utils');

test('test utils mapObject', () => {
  const ctx = {n1: 1, n2: 2};
  const keys = {
    one: 'ctx.n1',
    two: 'ctx.n2',
  };
  const result = mapObject(keys, ctx);
  expect(result).toEqual({one: 1, two: 2});
});
