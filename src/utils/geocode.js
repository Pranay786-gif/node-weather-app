const request = require("request");

const geocode=(address,callback)=>{
    const url =
   `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1IjoicHJhbmF5NDUiLCJhIjoiY2t4c3R1dm9vMGZ3eTJvbzVkbmNjanRtNyJ9.XqV0RwWF2sffGAcdaZlgyA&limit=1`;
   request({ url, json: true }, (error, response) => {
    if (error) {
     callback("Unable to connect to map service",undefined)
    } else if (response.body.features.length === 0) {
       callback("unable to find lat and lang",undefined)
    } else {
      callback(undefined,{
       lattitude:response.body.features[0].center[1],
       longitude:response.body.features[0].center[0],
       location:response.body.features[0].place_name
 
      })
    }
  });
 
 }
 module.exports=geocode;