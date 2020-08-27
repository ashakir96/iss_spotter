const { nextISSTimesForMyLocation } = require("./iss");

nextISSTimesForMyLocation((error, data) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  else {
    for (let item of data) {
      let duration = item.duration;
      let datetime = new Date(0);
      datetime.setUTCSeconds(item.risetime);
      console.log(`Next pass at ${datetime} for ${duration} seconds!`)
    }
  }
})