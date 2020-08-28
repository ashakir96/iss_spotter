const request = require('request-promise-native');

const fetchMyIP = () => {
  return request('https://api.ipify.org/?format=json')
}

const fetchCoordsByIP = (body) => {
  let ip = JSON.parse(body).ip;
  return request(`https://ipvigilante.com/json/${ip}`)
}

const fetchISSFlyOverTimes = (location) => {
  let coords = {latitude: JSON.parse(location).data.latitude, longitude: JSON.parse(location).data.longitude};
  return request(`http://api.open-notify.org/iss-pass.json?lat=${coords.latitude}&lon=${coords.longitude}`)
}

const nextISSTimesForMyLocation = () => {
  return fetchMyIP()
          .then(fetchCoordsByIP)
          .then(fetchISSFlyOverTimes)
          .then((body) => {
              let times = JSON.parse(body).response;
              return times;
          })
          .catch((error) => {
            console.log("It didn't work!", error);
          })
}

module.exports = nextISSTimesForMyLocation;