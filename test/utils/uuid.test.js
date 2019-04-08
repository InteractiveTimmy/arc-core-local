// import base module
const ArcCore = require('../../build/arc-core');

// destructure module
const { uuid } = ArcCore.utils;

// run unit tests
test('should be 36 characters long', () => {
  const myUuid = uuid();

  expect(myUuid.length).toBe(36);
});

test('should be unique [ out of 1000 ]', () => {
  const myUuid = uuid();

  for(let i = 0; i < 1000; i += 1) {
    expect(myUuid).not.toBe(uuid());
  }
});