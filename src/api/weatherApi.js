import axios from 'axios'

const weatherClient = axios.create({
    baseURL: 'https://api.openweathermap.org/data/2.5',
    timeout: 5000,
    paras: {
        appid: import.meta.env.VITE_OPENWEATHER_API_KEY,
        units: 'metric',
        lang: 'kr',
    },
})

export const fetchWeatherByCity = async (query) => {
    const response = await weatherClient.get('/weather', {
        params: { q: query },
    })
    return response.data
}