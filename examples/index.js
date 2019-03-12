console.log(ARCCORE);

const count = 1000000;
const trialCount = 10;

const trials = [];

function testUUID() {
  trials.push(Date.now());
  
  for (let i = 0; i < count; i += 1) {
    ARCCORE.utils.uuid();
  }

  trials[trials.length - 1] = Date.now() - trials[trials.length - 1];
}

for (let i = 0; i < trialCount; i += 1) {
  testUUID();
}

let results = 0;

trials.forEach(time => {
  results += time;
});
results /= trials.length;

console.log(`took an average of ${results}ms to generate ${count} uuids per trial over ${trialCount} trials`);