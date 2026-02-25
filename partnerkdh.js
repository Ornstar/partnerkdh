(() => {
  "use strict";

  // ===== SETTINGS =====
  const BTN_ID = "partner-ceria-btn";
  const STYLE_ID = "partner-ceria-style";
  const LINK = "https://goviplink.live/p4st15u5k5es";

  // ✅ GANTI dengan URL langsung logo kuda (png/webp)
  const LOGO_URL = "https://i.postimg.cc/nhMTptFv/icon-kh88.webp";

  // posisi
  const RIGHT = 18; // px dari kanan
  const UP = 99;    // px dari bawah

  // ✅ ukuran tombol (kecilkan di sini)
  const SIZE = 56; // contoh: 52 / 56 / 60

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

        width: ${SIZE}px;
        height: ${SIZE}px;
        border-radius: 50%;
        overflow: hidden;

        /* ✅ GOLD premium (mirip gambar 2) */
        background:
          radial-gradient(circle at 35% 28%, rgba(255,255,255,.65), rgba(255,255,255,0) 42%),
          radial-gradient(circle at 60% 75%, rgba(255,210,120,.55), rgba(255,210,120,0) 55%),
          linear-gradient(180deg, #ffe08a 0%, #f3c24a 28%, #c98b12 62%, #7a4a06 100%);

        border: 2px solid rgba(255,232,160,.70);

        box-shadow:
          inset 0 10px 16px rgba(255,255,255,.28),
          inset 0 -12px 18px rgba(0,0,0,.22),
          0 10px 22px rgba(0,0,0,.35);

        z-index: 2147483647;
        text-decoration: none;
        -webkit-tap-highlight-color: transparent;
        cursor: pointer;

        left: auto !important;
        top: auto !important;
      }

      /* ✅ Logo di tengah */
      #${BTN_ID} .pc-logo{
        width: 72%;
        height: 72%;
        display: block;
        object-fit: contain;
        margin: 14%;
        filter: drop-shadow(0 3px 6px rgba(0,0,0,.35));
        user-select: none;
        pointer-events: none;
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
    btn.style.display = "block";
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

      // ✅ logo tengah (tanpa text)
      btn.innerHTML = `<img class="pc-logo" src="${LOGO_URL}" alt="">`;

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
