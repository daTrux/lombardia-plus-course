const DateTimeInfo = class DateTimeInfo {
  dt;
  sunrise;
  sunset;
  temp;
  feels_like;
  weather;
  constructor(dti) {
    this.dt = new Date(dti.dt * 1000);
    this.sunrise = dti.sunrise;
    this.sunset = dti.sunset;
    this.temp = dti.temp;
    this.feels_like = dti.feels_like;
    this.weather = new WeatherInfo(dti.weather[0]);
  }
};

const WeatherInfo = class WeatherInfo {
  id;
  main;
  description;
  icon;

  constructor(inf) {
    this.id = inf.id;
    this.main = inf.main;
    this.description = inf.description;
    this.icon = inf.icon;
  }
};

const WeatherAPIObject = class WeatherAPIObject {
  current;
  daily;
  hourly;
  constructor(apiRet) {
    const dArr = [];
    const hArr = [];

    apiRet.daily.forEach(element => {
      dArr.push(new DateTimeInfo(element));
    });
    apiRet.hourly.forEach(element => {
      hArr.push(new DateTimeInfo(element));
    });
    this.daily = dArr;
    this.hourly = hArr;
    this.current = new DateTimeInfo(apiRet.current);
  }
};
