# 날씨 대시보드

세계 10개 도시의 실시간 날씨와 현지 시각, 24시간 예보를 한 화면에 보여주는 대시보드입니다.
카드에 마우스를 올리면 배경이 그 도시의 하늘(새벽·아침·낮·노을·밤)로 바뀝니다.

SK AX SKALA Vue.js 과정 종합과제로 제작했습니다.

## 주요 기능

- **실시간 날씨** — 세계 10개 도시의 현재 날씨를 한 화면에서 확인. 일부 도시 조회가 실패해도 나머지는 정상 표시
- **시간대 연동 하늘** — 도시마다 현지 시각이 흐르고, 일출·일몰에 맞춰 새벽·아침·낮·노을·밤 하늘색이 카드와 배경에 반영
- **24시간 예보** — 상세 화면에서 기온 흐름을 부드러운 곡선 차트로 확인
- **검색 + 지역 필터** — 한글 입력에도 즉시 반응하는 검색과 대륙별 필터를 함께 사용
- **단위 전환** — ℃/℉ 전환이 목록·상세·차트 전체에 한 번에 적용
- **빠른 재방문** — 조회 결과를 잠시 저장해 두어 다시 열면 즉시 표시
- **로딩·오류 안내** — 기다리는 동안 카드 모양 스켈레톤을 보여주고, 오류는 상황별로 다르게 안내

## 기술 스택

| 영역 | 사용                                                                                               |
| ---- | -------------------------------------------------------------------------------------------------- |
| 코어 | Vue 3 (Composition API), Vite, Vue Router, Pinia                                                   |
| HTTP | Axios (인스턴스 + 어댑터 패턴)                                                                     |
| 차트 | ApexCharts (vue3-apexcharts)                                                                       |
| UI   | 커스텀 디자인 시스템(유리·시간대 토큰), Naive UI(스켈레톤), Lucide(아이콘), Meteocons(날씨 아이콘) |
| 실습 | Element Plus (`/practices` 라우트의 학습 결과물 전용)                                              |

## 시작하기

```bash
git clone https://github.com/thisismiru/skala-vue.git
cd skala-vue
npm install
```

[OpenWeather](https://home.openweathermap.org/api_keys)에서 무료 API 키를 발급받아 프로젝트 루트에 `.env.local`을 만듭니다:

```bash
# .env.local
OPENWEATHER_API_KEY=발급받은_키
```

키는 브라우저 번들에 포함되지 않습니다 — 개발 서버의 proxy(로컬)와 서버리스 함수(배포)가
서버 측에서 키를 붙여 OpenWeather로 중계합니다.

```bash
npm run dev
```

## 스크립트

| 명령              | 동작                    |
| ----------------- | ----------------------- |
| `npm run dev`     | 개발 서버               |
| `npm run build`   | 프로덕션 빌드 (`dist/`) |
| `npm run preview` | 빌드 결과 로컬 확인     |
| `npm run lint`    | oxlint + ESLint         |
| `npm run format`  | Prettier                |

## 배포 (Vercel)

Vercel Git 연동으로 `main` 브랜치에 push하면 자동 배포됩니다.

- SPA 라우팅: `vercel.json`의 rewrite가 `/api`를 제외한 모든 경로를 `index.html`로 돌려 history 모드를 유지합니다
- API 프록시: `api/weather.js`·`api/forecast.js` 서버리스 함수가 키를 서버 측에 보관한 채 OpenWeather를 중계하고, 엣지 캐시(10분/30분)로 호출 한도를 보호합니다
- 환경 변수: Vercel 프로젝트 설정에 `OPENWEATHER_API_KEY`를 등록해야 합니다

## 프로젝트 구조

```
src/
├── api/            # axios 인스턴스 + 응답 어댑터 + 에러 매퍼
├── assets/         # 디자인 토큰(base.css), 유틸리티(main.css)
├── components/
│   ├── exercise/   # 대시보드 컴포넌트 (카드·검색·차트·토글)
│   └── practices/  # 수업 실습 결과물 (장별 보존)
├── composables/    # useNow, useLocalTime, useSky, useStuck
├── constants/      # 도시 목록
├── router/
├── stores/         # configStore (단위 설정)
├── utils/          # localStorage 캐시, 날씨 아이콘 매핑
└── views/
```

설계 과정에서의 선택과 근거는 [TRADEOFFS.md](./TRADEOFFS.md)에 정리했습니다.
