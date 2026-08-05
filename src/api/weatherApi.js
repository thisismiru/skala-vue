import axios from 'axios'

const weatherClient = axios.create({
  baseURL: 'https://api.openweathermap.org/data/2.5',
  timeout: 5000,
  params: {
    appid: import.meta.env.VITE_OPENWEATHER_API_KEY,
    units: 'metric',
    lang: 'kr',
  },
})

const toWeatherItem = (cityMeta, data) => ({
  id: cityMeta.id,
  name: cityMeta.name,
  region: cityMeta.region,
  temp: Math.round(data.main.temp),
  status: data.weather?.[0]?.description ?? '정보 없음',
  humidity: data.main.humidity,
  windSpeed: data.wind?.speed ?? 0,
})

export const fetchWeatherByCity = async (cityMeta) => {
  const { data } = await weatherClient.get('/weather', {
    params: { q: cityMeta.query },
  })
  return toWeatherItem(cityMeta, data)
}

export const fetchWeatherList = (cityMetaList) => {
  return Promise.all(cityMetaList.map((cityMeta) => fetchWeatherByCity(cityMeta)))
}
