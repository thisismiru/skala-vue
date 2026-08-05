import clearDay from '@bybas/weather-icons/production/fill/openweathermap/01d.svg'
import clearNight from '@bybas/weather-icons/production/fill/openweathermap/01n.svg'
import fewCloudsDay from '@bybas/weather-icons/production/fill/openweathermap/02d.svg'
import fewCloudsNight from '@bybas/weather-icons/production/fill/openweathermap/02n.svg'
import scatteredDay from '@bybas/weather-icons/production/fill/openweathermap/03d.svg'
import scatteredNight from '@bybas/weather-icons/production/fill/openweathermap/03n.svg'
import brokenDay from '@bybas/weather-icons/production/fill/openweathermap/04d.svg'
import brokenNight from '@bybas/weather-icons/production/fill/openweathermap/04n.svg'
import showerDay from '@bybas/weather-icons/production/fill/openweathermap/09d.svg'
import showerNight from '@bybas/weather-icons/production/fill/openweathermap/09n.svg'
import rainDay from '@bybas/weather-icons/production/fill/openweathermap/10d.svg'
import rainNight from '@bybas/weather-icons/production/fill/openweathermap/10n.svg'
import thunderDay from '@bybas/weather-icons/production/fill/openweathermap/11d.svg'
import thunderNight from '@bybas/weather-icons/production/fill/openweathermap/11n.svg'
import snowDay from '@bybas/weather-icons/production/fill/openweathermap/13d.svg'
import snowNight from '@bybas/weather-icons/production/fill/openweathermap/13n.svg'
import mistDay from '@bybas/weather-icons/production/fill/openweathermap/50d.svg'
import mistNight from '@bybas/weather-icons/production/fill/openweathermap/50n.svg'

const WEATHER_ICONS = {
  '01d': clearDay,
  '01n': clearNight,
  '02d': fewCloudsDay,
  '02n': fewCloudsNight,
  '03d': scatteredDay,
  '03n': scatteredNight,
  '04d': brokenDay,
  '04n': brokenNight,
  '09d': showerDay,
  '09n': showerNight,
  '10d': rainDay,
  '10n': rainNight,
  '11d': thunderDay,
  '11n': thunderNight,
  '13d': snowDay,
  '13n': snowNight,
  '50d': mistDay,
  '50n': mistNight,
}

export const getWeatherIcon = (code) => WEATHER_ICONS[code] ?? scatteredDay
