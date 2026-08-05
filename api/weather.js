export default async function handler(req, res) {
  const { q, lat, lon } = req.query

  if (!q && !(lat && lon)) {
    res.status(400).json({ message: 'q 또는 lat/lon 파라미터가 필요합니다.' })
    return
  }

  const url = new URL('https://api.openweathermap.org/data/2.5/weather')
  url.searchParams.set('units', 'metric')
  url.searchParams.set('lang', 'kr')
  for (const [key, value] of Object.entries(req.query)) {
    url.searchParams.set(key, String(value))
  }
  url.searchParams.set('appid', process.env.OPENWEATHER_API_KEY)

  try {
    const upstream = await fetch(url)
    const data = await upstream.json()

    if (upstream.ok) {
      res.setHeader('Cache-Control', 's-maxage=600, stale-while-revalidate=60')
    }
    res.status(upstream.status).json(data)
  } catch {
    res.status(502).json({ message: '날씨 서버에 연결하지 못했습니다.' })
  }
}
