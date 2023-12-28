import axios from "axios";

const REACT_APP_API_KEY = "299f3d2e3d190a494322efb9e8995a16";
const weatherDescKo = {};

export const getWeatherData = async () => {
  try {
    const position = await new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });

    const lat = position.coords.latitude;
    const lon = position.coords.longitude;

    // 좌표를 도시 이름으로 변환하는 함수 호출
    const cityName = await getCityName(lat, lon);

    const res = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${REACT_APP_API_KEY}&units=metric`
    );

    const weatherId = res.data.weather[0].id;
    const weatherKo = weatherDescKo[weatherId];
    const weatherIcon = res.data.weather[0].icon;
    const weatherIconAdrs = `http://openweathermap.org/img/wn/${weatherIcon}@2x.png`;
    const temp = Math.round(res.data.main.temp);

    const currentDate = formatCurrentDate();

    const weatherData = {
      description: weatherKo,
      name: cityName, // 가져온 도시 이름 사용
      temp: temp,
      icon: weatherIconAdrs,
      currentDate: currentDate,
    };
    // 날씨 로그 찍는거
    // console.log(weatherData);

    return weatherData;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

const getCityName = async (lat, lon) => {
  try {
    const response = await axios.get(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`
    );

    const cityName =
      response.data.address.city ||
      response.data.address.town ||
      response.data.address.village;

    return cityName;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const formatCurrentDate = () => {
  const now = new Date();
  const month = now.getMonth() + 1;
  const date = now.getDate();
  return `${month}월 ${date}일`;
};
