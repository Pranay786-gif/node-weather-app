const request = require("request");

const forecast = (lat,lang,callback) => {

    const url =
      `http://api.weatherstack.com/current?access_key=e013a9f06df8a32d33a5f9fd00b0bddd&query=${lat},${lang}`;
  
    request({url, json: true }, (error, response) => {
      if (error) {
        callback("Unable to connect to weather service",undefined)
      } else if (response.body.error) {
        callback("unable to find location",undefined)
      } else {
       callback(undefined,{
          temperature:response.body.current.temperature,
          feelslike:response.body.current.feelslike,
          humidity:response.body.current.humidity
       })
      }
    });
  };
  
  module.exports=forecast;