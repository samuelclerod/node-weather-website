const request = require('request')

const message = ({ temperature, precipProbability: rainProbability, apparentTemperature: feelTemperature }) => {
    return `It is currently ${temperature}C and feels like ${feelTemperature}C. There is a ${rainProbability}% chance of rain.`
}

const forecast = (latitude, longitude, callback) => {
    const url = `https://api.darksky.net/forecast/fc3e406b27b3d60d7df88acb68ad6214/${latitude},${longitude}?units=si`
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback("Unable to find location!", undefined)
        } else {
            callback(undefined, message(body.currently))
        }
    });
}

module.exports = forecast