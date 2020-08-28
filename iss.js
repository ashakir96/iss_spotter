const request = require('request');

const fetchMyIP = function(callback) {
  request('https://api.ipify.org/?format=json', (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    if (response.statusCode !== 200) {
      const message = `Status code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(message), null);
      return;
    }
    let ip = JSON.parse(body).ip;
    callback(null, ip);
  });
};

const fetchCoordsByIP = (ip, callback) => {
  request(`https://ipvigilante.com/${ip}`, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    if (response.statusCode !== 200) {
      callback(Error(`Ran into error ${response.statusCode}. Response ${body}`), null);
      return;
    }
    let location = {latitude: JSON.parse(body).data.latitude, longitude: JSON.parse(body).data.longitude};
    callback(null, location);
  });
};

const fetchISSFlyOverTimes = (coords, callback) => {
  request(`http://api.open-notify.org/iss-pass.json?lat=${coords.latitude}&lon=${coords.longitude}`, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    if (response.statusCode !== 200) {
      callback(Error(`Ran into error ${response.statusCode}. Response ${body}`), null);
      return;
    }
    let times = JSON.parse(body).response;
    callback(null, times);
  });
};

const nextISSTimesForMyLocation = (callback) => {
  fetchMyIP((error, ip) => {
    if (error) {
      callback(error, null);
      return;
    }
    fetchCoordsByIP(ip, (error, coords) => {
      if (error) {
        callback(error, null);
        return;
      }
      fetchISSFlyOverTimes(coords, (error, passTimes) => {
        if (error) {
          callback(error, null);
          return;
        }
        callback(null, passTimes);
      });
    });
  });
};


module.exports = {
  nextISSTimesForMyLocation
};