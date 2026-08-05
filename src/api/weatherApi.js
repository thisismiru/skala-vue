import axios from 'axios'
import { readCache, writeCache } from '@/utils/cache'

const CURRENT_TTL = 10 * 60 * 1000 // 10분
const FORECAST_TTL = 30 * 60 * 1000 // 1시간

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
  timezone: data.timezone,
  sunrise: data.sys.sunrise,
  sunset: data.sys.sunset,
  icon: data.weather?.[0]?.icon,
  feelsLike: Math.round(data.main.feels_like),
  pressure: data.main.pressure,
})

const toForecast = (data) => ({
  timezone: data.city.timezone,
  points: data.list.slice(0, 8).map(({ dt, main, weather, pop }) => ({
    dt,
    temp: Math.round(main.temp),
    icon: weather?.[0]?.icon,
    pop: pop ?? 0,
  })),
})

export const fetchWeatherByCity = async (cityMeta) => {
  const cacheKey = `current:${cityMeta.id}`

  const cached = readCache(cacheKey, CURRENT_TTL)
  if (cached) return cached

  const { data } = await weatherClient.get('/weather', {
    params: { q: cityMeta.query },
  })
  const item = toWeatherItem(cityMeta, data)

  writeCache(cacheKey, item)
  return item
}

export const fetchWeatherList = async (cityMetaList) => {
  const results = await Promise.allSettled(cityMetaList.map(fetchWeatherByCity))

  return results.map((result, index) =>
    result.status === 'fulfilled'
      ? { ok: true, data: result.value }
      : { ok: false, city: cityMetaList[index], error: result.reason },
  )
}
