/**
 * 태양광 페이지 상단 네비만 연결: 본문 HTML은 수정하지 않음.
 * URL은 solar-config.js 한 곳에서만 설정.
 */
import { SOLAR_MAP_PACK, SOLAR_UNION_ADDON_URL, SOLAR_COOP_UNION_URL } from "./solar-config.js";

const mapLink = document.getElementById("solarMapNavLink");
if (mapLink) {
  const u = new URL("solar-map/index.html", import.meta.url);
  u.searchParams.set("v", SOLAR_MAP_PACK);
  mapLink.href = u.href;
}

const unionLink = document.getElementById("solarUnionLink");
if (unionLink) {
  const url = String(SOLAR_UNION_ADDON_URL || "").trim();
  if (url) {
    unionLink.href = url;
    unionLink.hidden = false;
  } else {
    unionLink.hidden = true;
  }
}

const coopUnionLink = document.getElementById("solarCoopUnionLink");
if (coopUnionLink) {
  const u = String(SOLAR_COOP_UNION_URL || "").trim();
  if (u) coopUnionLink.href = u;
}
