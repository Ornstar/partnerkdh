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

  /**
   * Deteksi login:
   * - cocok untuk kasus URL punya "loggedin"
   * - + fallback kalau ada cookie/token umum
   * Silakan sesuaikan kalau kamu punya penanda login yang lebih pasti.
   */
  const isLoggedIn = () => {
    const p = (location.pathname || "").toLowerCase();
    const h = (location.hash || "").toLowerCase();

    // 1) dari url
    if (p.includes("loggedin") || h.includes("loggedin")) return true;

    // 2) fallback (opsional) - kalau web kamu simpan token di localStorage
    // ganti key sesuai website kamu kalau ada
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
        align-items: center;
        justify-content: center;
        gap: 6px;
        padding: 6px 14px;
        border-radius: 999px;
        background: linear-gradient(135deg,#7c3aed,#4c1d95);
        border: 1.5px solid rgba(255,255,255,.25);
        box-shadow: 0 0 14px rgba(124,58,237,.55);
        z-index: 2147483647;
        text-decoration: none;
        font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Arial,sans-serif;
        letter-spacing: .3px;
        -webkit-tap-highlight-color: transparent;

        left: auto !important;
        top: auto !important;
      }

      #${BTN_ID} .pc-text{
        font-size: 11px;
        font-weight: 800;
        color: #fff;
        white-space: nowrap;
        text-transform: uppercase;
      }

      #${BTN_ID} .pc-badge{
        position: absolute;
        right: -4px;
        top: -4px;
        width: 18px;
        height: 18px;
        border-radius: 50%;
        background: #ff2d55;
        color: #fff;
        font-size: 11px;
        font-weight: 800;
        display: flex;
        justify-content: center;
        align-items: center;
        box-shadow: 0 0 6px rgba(0,0,0,.55);
      }
    `;
    document.head.appendChild(style);
  };

  const place = (btn) => {
    btn.style.right = `${RIGHT}px`;
    btn.style.bottom = `${UP}px`;
    btn.style.display = "flex";
  };

  const ensureButton = () => {
    // syarat tampil
    if (!isMobile() || !isLoggedIn()) return;

    let btn = document.getElementById(BTN_ID);
    if (!btn) {
      injectStyle();

      btn = document.createElement("a");
      btn.id = BTN_ID;
      btn.href = LINK;
      btn.target = "_blank";
      btn.rel = "noopener";

      // ✅ TANPA PANAH
      btn.innerHTML = `
        <div class="pc-text">PARTNER CERIABET</div>
        <div class="pc-badge">1</div>
      `;

      document.body.appendChild(btn);
    }

    place(btn);
  };

  const cleanupIfNeeded = () => {
    const btn = document.getElementById(BTN_ID);
    if (!btn) return;

    // hapus kalau bukan mobile atau lagi logout
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

    // SPA / login tanpa reload
    setInterval(() => {
      ensureButton();
      cleanupIfNeeded();
    }, 800);
  };

  document.readyState === "loading"
    ? document.addEventListener("DOMContentLoaded", boot)
    : boot();
})();
