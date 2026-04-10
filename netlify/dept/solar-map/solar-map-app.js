import { SOLAR_MAP_PACK } from "../solar-config.js";

const mount = document.getElementById("solarMapMount");
const note = document.getElementById("solarMapNote");
const css = document.getElementById("solarMapCss");

if (css) {
  css.href = `./solar-map.css?v=${encodeURIComponent(SOLAR_MAP_PACK)}`;
}

if (mount) {
  mount.innerHTML = `
    <div class="solar-map-placeholder">
      <p><strong>SolarMap</strong> 정적 배포용 자리입니다.</p>
      <p>운영 중인 <strong>solar-map</strong> 프로젝트의 <strong>live-preview</strong> 산출물을 이 폴더(<code>dept/solar-map/</code>)에 덮어쓰면 됩니다.</p>
      <p>패키지 버전: <code>${SOLAR_MAP_PACK}</code> — <code>netlify/app.js</code>·<code>solar-config.js</code> 의 SOLAR_MAP_PACK 과 맞추세요.</p>
    </div>
  `;
}

if (note) {
  note.textContent =
    "live-preview 복사 후에는 index.html·번들·에셋 경로가 상대 경로로 깨지지 않는지 확인하세요.";
}
