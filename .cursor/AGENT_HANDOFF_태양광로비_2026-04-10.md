# 에이전트 인수인계 — 태양광 로비 / SolarMap (2026-04-10)

이 파일만 열어도 **무엇을 어디에 맞춰야 하는지** 이어서 작업할 수 있도록 정리한 메모입니다. 배포 중인 저장소를 열면 **먼저 이 문서와 현재 트리·diff를 대조**한 뒤 진행하세요.

---

## 1. 배경: 작업 폴더·배포 루트

- 과거에 **잘못된(옛) 폴더 복사본**에서 작업했을 수 있습니다.
- **실제 Netlify(또는 운영)에 올라가는 배포 루트**와 동일한 클론/경로에서만 수정·머지하세요.
- 로컬 미러 예: `d:\보관자료\3D_lobby\` — 워크스페이스 경로가 달라도 **내용·상대 경로(`netlify/`, `dept/`)** 기준으로 맞춥니다.

---

## 2. solar_union Add-on

- **역할**: 태양광 관련 외부/임베드 UI(예: 지도·정보 패널)를 로비와 연동할 때 쓰는 애드온 쪽 작업입니다.
- **맞출 위치(일반적)**:
  - **엔드포인트 URL**: `netlify/app.js` 내 상수(또는 설정 객체) — iframe·fetch 대상.
  - **모달**: 데스크/사업부 진입 시 열리는 모달 DOM·`data-action`·이벤트 핸들러.
  - **오버레이**: 전체 화면·반투명 레이어, z-index, `pointer-events`, 닫기 동선.
- 코드베이스에서 `solar_union`, `union`, `iframe` 등으로 검색해 **배포본과 동일한 분기**인지 확인하세요.

---

## 3. 태양광 사업부 (solar)

| 항목 | 설명 |
|------|------|
| **dept 키** | `solar` |
| **DOM** | `index.html` 계열의 `#dept-solar` (`<section id="dept-solar" data-dept="solar">`) |
| **정적 페이지** | `netlify/dept/solar.html` |
| **해시** | `#dept-solar` (다른 사업부: `#dept-consulting` 등과 동일 패턴) |
| **app.js 연동** | `DESK_TO_DEPTKEY`의 `'태양광 사업': 'solar'`, `DESK_LINKS.plane061` → `dept/solar.html`, `DEPT_CONTENT.solar`, `deptPages` Map의 `'solar'` |

- **구 smartcity** 이름으로 된 북마크·외부 링크가 남아 있으면 **`solar`/`Solar`/`dept-solar`로 리다이렉트** 규칙을 Netlify `_redirects` 또는 동일 효과의 정책으로 유지하세요. (예: `/smartcity` → `/dept/solar.html` 또는 `/netlify/dept/solar.html` — 실제 배포 구조에 맞게)

---

## 4. SolarMap

- **소스 진실**: 운영 중인 **solar-map 프로젝트의 `live-preview` 빌드**가 기준입니다.  
  이 저장소의 `netlify/dept/solar-map/` 등에 넣을 때는 **실제 운영 live-preview 산출물을 복사**해야 하며, 개발용 임시 빌드와 섞이지 않게 하세요.
- **배치 예**: `netlify/dept/solar-map/` (HTML·JS·CSS·에셋)
- **코드 연동**:
  - **`SOLAR_MAP_PACK`** (또는 동일 역할의 상수명): 번들·경로·캐시 버스트를 한곳에서 관리.
  - **내비게이션**: `solar.html` 또는 상위 레이아웃에서 SolarMap 진입 링크·버튼.
  - **스타일**: `solar-map` 전용 CSS가 로비/사업부 테마와 충돌하지 않는지 확인.

---

## 5. Netlify: `bundle.js` 재생성 (esbuild)

- 브라우저가 읽는 건 **`netlify/bundle.js`** 입니다. **`netlify/app.js`만 수정하고 빌드하지 않으면 반영되지 않습니다.**

프로젝트 루트에서:

```bash
npm run build:netlify
```

- 개발 중 연속 반영: `npm run watch:netlify`
- 내부적으로 `esbuild netlify/app.js --bundle --outfile=netlify/bundle.js --format=esm --platform=browser` (앞에 `verify-netlify-assets` 스크립트가 붙을 수 있음).

---

## 6. 배포 폴더에서 할 일 체크리스트

- [ ] `git status` / diff가 **배포 대상 브랜치**와 의도한 변경만 포함하는지 확인.
- [ ] `netlify/app.js` 변경 후 **`npm run build:netlify`** 실행 및 `bundle.js` 커밋 포함 여부 결정.
- [ ] `#dept-solar`, `dept/solar.html`, SolarMap 경로가 **배포 URL 기준**으로 깨지지 않는지(상대 경로·`lobby-asset-base`).
- [ ] 구 **smartcity** URL 리다이렉트 유지.
- [ ] SolarMap은 **live-preview**와 동일 소스인지 확인 후 동기화.
- [ ] 필요 시 `LOBBY_BUILD_STAMP` 등 스탬프를 올려 캐시·디버깅 혼선 방지.

---

## 7. 검색 키워드 (빠른 탐색)

`SOLAR_MAP_PACK`, `solar-map`, `dept-solar`, `#dept-solar`, `dept/solar.html`, `plane061`, `solar_union`, `smartcity`, `DESK_LINKS`, `DEPT_CONTENT`, `esbuild`, `build:netlify`, `bundle.js`

---

## 8. 한 줄 요약

**태양광·지도 연동은 배포 루트 기준으로 `app.js`·번들·`#dept-solar`·`dept/solar.html`·SolarMap(`live-preview` 동기화)을 한 세트로 맞추고, 구 smartcity는 리다이렉트로 흡수한다.**
