// import base module
const ArcCore = require('../../build/arc-core');

// destructure module
const { ArcObject } = ArcCore.core;

// run unit tests
test('should return uuid', () => {
  const myArcObject = new ArcObject();

  expect(typeof myArcObject.uuid).toBe('string');
});

test('should return true', () => {
  const myArcObject = new ArcObject();

  expect(myArcObject.isArcObject).toBe(true);
});
