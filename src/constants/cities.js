export const CITIES = [
  { id: 'city_01', name: '서울', query: 'Seoul', region: '대한민국 서울특별시' },
  { id: 'city_02', name: '수원', query: 'Suwon', region: '대한민국 경기도 수원시' },
  { id: 'city_03', name: '부산', query: 'Busan', region: '대한민국 부산광역시' },
]

export const findCityById = (cityId) => CITIES.find((city) => city.id === cityId)
