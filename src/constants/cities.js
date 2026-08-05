export const CITIES = [
  { id: 'seoul', name: '서울', query: 'Seoul,KR', region: '아시아' },
  { id: 'tokyo', name: '도쿄', query: 'Tokyo,JP', region: '아시아' },
  { id: 'singapore', name: '싱가포르', query: 'Singapore,SG', region: '아시아' },
  { id: 'dubai', name: '두바이', query: 'Dubai,AE', region: '아시아' },
  { id: 'london', name: '런던', query: 'London,GB', region: '유럽' },
  { id: 'paris', name: '파리', query: 'Paris,FR', region: '유럽' },
  { id: 'newyork', name: '뉴욕', query: 'New York,US', region: '아메리카' },
  { id: 'losangeles', name: '로스앤젤레스', query: 'Los Angeles,US', region: '아메리카' },
  { id: 'saopaulo', name: '상파울루', query: 'Sao Paulo,BR', region: '아메리카' },
  { id: 'sydney', name: '시드니', query: 'Sydney,AU', region: '오세아니아' },
]

export const REGIONS = ['전체', '아시아', '유럽', '아메리카', '오세아니아']

export const findCityById = (cityId) => CITIES.find((city) => city.id === cityId)
