const request = require("request");
const endpoint =
  "https://api.openweathermap.org/data/2.5/weather?lat=35.9940&lon=-78.8986&APPID=YOUR APP ID";
const key = "YOUR KEY";
const getWeather = () => {
  return new Promise((resolve, reject) => {
    request(
      {
        method: "GET",
        url: endpoint
      },
      (error, response, body) => {
        if (error) {
          console.log(error);
          reject(error);
        } else {
          console.log(body);
          let jbody = JSON.parse(body);
          console.log(jbody.weather);
          const date = new Date();
          if (jbody.weather[0].id < 800) {
            if (date.getHours() > 7 && date.getHours() < 17) {
              resolve("Rain-Light");
            } else {
              resolve("Rain-Dark");
            }
          } else {
            if (date.getHours() > 7 && date.getHours() < 17) {
              resolve("Clear-Light");
            } else {
              resolve("Clear-Dark");
            }
          }
        }
      }
    );
  });
};
module.exports = { getWeather };
