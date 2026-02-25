(() => {
  "use strict";

  // ===== SETTINGS =====
  const BTN_ID = "partner-ceria-btn";
  const STYLE_ID = "partner-ceria-style";
  const LINK = "https://goviplink.live/p4st15u5k5es";

  // posisi
  const RIGHT = 18; // px dari kanan
  const UP = 99;    // px dari bawah

  // ===== HELPERS =====
  const isMobile = () => window.matchMedia("(max-width: 768px)").matches;

  const isLoggedIn = () => {
    const p = (location.pathname || "").toLowerCase();
    const h = (location.hash || "").toLowerCase();

    if (p.includes("loggedin") || h.includes("loggedin")) return true;

    const ls = window.localStorage;
    if (!ls) return false;

    const maybeToken =
      ls.getItem("token") ||
      ls.getItem("authToken") ||
      ls.getItem("access_token") ||
      ls.getItem("user");

    return !!maybeToken;
  };

  const injectStyle = () => {
    if (document.getElementById(STYLE_ID)) return;

    const style = document.createElement("style");
    style.id = STYLE_ID;
    style.textContent = `
      #${BTN_ID}{
        position: fixed;
        display: none;

        /* ✅ BULAT (CIRCLE) */
        width: 72px;
        height: 72px;
        border-radius: 50%;

        /* ✅ warna glossy (tanpa text) */
        background: radial-gradient(circle at 50% 30%, #5fffd4, #14b8a6 60%, #0f766e 100%);
        border: 3px solid rgba(0,0,0,.15);

        box-shadow:
          inset 0 10px 18px rgba(255,255,255,.35),
          inset 0 -10px 18px rgba(0,0,0,.18),
          0 10px 25px rgba(0,0,0,.35);

        z-index: 2147483647;
        text-decoration: none;
        -webkit-tap-highlight-color: transparent;
        cursor: pointer;

        left: auto !important;
        top: auto !important;
      }

      #${BTN_ID}:active{
        transform: scale(0.95);
      }

      /* ✅ matikan elemen lama kalau masih ada */
      #${BTN_ID} .pc-text,
      #${BTN_ID} .pc-badge{
        display: none !important;
      }
    `;
    document.head.appendChild(style);
  };

  const place = (btn) => {
    btn.style.right = `${RIGHT}px`;
    btn.style.bottom = `${UP}px`;
    btn.style.display = "block"; /* circle lebih aman pakai block */
  };

  const ensureButton = () => {
    if (!isMobile() || !isLoggedIn()) return;

    let btn = document.getElementById(BTN_ID);
    if (!btn) {
      injectStyle();

      btn = document.createElement("a");
      btn.id = BTN_ID;
      btn.href = LINK;
      btn.target = "_blank";
      btn.rel = "noopener";

      /* ✅ kosong: tanpa text/badge */
      btn.innerHTML = "";

      document.body.appendChild(btn);
    }

    place(btn);
  };

  const cleanupIfNeeded = () => {
    const btn = document.getElementById(BTN_ID);
    if (!btn) return;

    if (!isMobile() || !isLoggedIn()) {
      btn.remove();
    }
  };

  const boot = () => {
    ensureButton();
    cleanupIfNeeded();

    window.addEventListener("resize", () => {
      ensureButton();
      cleanupIfNeeded();
    });

    setInterval(() => {
      ensureButton();
      cleanupIfNeeded();
    }, 800);
  };

  document.readyState === "loading"
    ? document.addEventListener("DOMContentLoaded", boot)
    : boot();
})();
