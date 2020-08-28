const nextISSTimesForMyLocation = require('./iss_promised');

nextISSTimesForMyLocation().then((data) => {
  for (let item of data) {
    let duration = item.duration;
    let datetime = new Date(0);
    datetime.setUTCSeconds(item.risetime);
    console.log(`Next pass at ${datetime} for ${duration} seconds!`)
  }
});