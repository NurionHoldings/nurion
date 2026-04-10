import { SOLAR_MAP_PACK, SOLAR_UNION_ADDON_URL } from "./solar-config.js";

const mapLink = document.getElementById("solarMapNavLink");
if (mapLink) {
  const u = new URL("solar-map/index.html", import.meta.url);
  u.searchParams.set("v", SOLAR_MAP_PACK);
  mapLink.href = u.href;
}

const unionBtn = document.getElementById("solarUnionOpenBtn");
const overlay = document.getElementById("solarUnionOverlay");
const frame = document.getElementById("solarUnionFrame");

if (SOLAR_UNION_ADDON_URL && unionBtn && overlay && frame) {
  unionBtn.hidden = false;
  unionBtn.addEventListener("click", () => {
    frame.src = SOLAR_UNION_ADDON_URL;
    overlay.classList.add("open");
    overlay.setAttribute("aria-hidden", "false");
  });
  overlay.addEventListener("click", (e) => {
    if (e.target.closest("[data-close-solar-union]")) {
      overlay.classList.remove("open");
      overlay.setAttribute("aria-hidden", "true");
      frame.src = "about:blank";
    }
  });
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && overlay.classList.contains("open")) {
      overlay.classList.remove("open");
      overlay.setAttribute("aria-hidden", "true");
      frame.src = "about:blank";
    }
  });
} else if (unionBtn) {
  unionBtn.hidden = true;
}
