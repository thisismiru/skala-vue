import axios from 'axios'
import { readCache, writeCache } from '@/utils/cache'

const CURRENT_TTL = 10 * 60 * 1000 // 10분
const FORECAST_TTL = 30 * 60 * 1000 // 30분

const weatherClient = axios.create({
  baseURL: '/api',
  timeout: 5000,
  params: {
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
  const cacheKey = `current:v2:${cityMeta.id}`

  const cached = readCache(cacheKey, CURRENT_TTL)
  if (cached) return cached

  const { data } = await weatherClient.get('/weather', {
    params: { q: cityMeta.query },
  })
  const item = toWeatherItem(cityMeta, data)

  writeCache(cacheKey, item)
  return item
}

export const fetchForecast = async (cityMeta) => {
  const cacheKey = `forecast:${cityMeta.id}`

  const cached = readCache(cacheKey, FORECAST_TTL)
  if (cached) return cached

  const { data } = await weatherClient.get('/forecast', {
    params: { q: cityMeta.query },
  })
  const forecast = toForecast(data)

  writeCache(cacheKey, forecast)
  return forecast
}

export const fetchWeatherList = async (cityMetaList) => {
  const results = await Promise.allSettled(cityMetaList.map(fetchWeatherByCity))

  return results.map((result, index) =>
    result.status === 'fulfilled'
      ? { ok: true, data: result.value }
      : { ok: false, city: cityMetaList[index], error: result.reason },
  )
}

export const toErrorMessage = (error) => {
  if (error.response?.status === 429) {
    return '요청이 너무 잦습니다. 잠시 후 자동 캐시로 다시 시도해 주세요.'
  }
  if (error.response?.status === 401) {
    return 'API 키가 유효하지 않습니다. 환경 변수 설정을 확인해 주세요.'
  }
  if (error.code === 'ECONNABORTED') {
    return '서버 응답이 늦어지고 있습니다. 잠시 후 다시 시도해 주세요.'
  }
  if (!error.response) {
    return '네트워크 연결을 확인해 주세요.'
  }
  return '날씨 정보를 불러오지 못했습니다. 잠시 후 다시 시도해 주세요.'
}
