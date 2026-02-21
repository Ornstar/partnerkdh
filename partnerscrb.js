(() => {
  "use strict";

  // =====================
  // SETTINGS
  // =====================
  const BTN_ID = "partner-ceria-btn";
  const STYLE_ID = "partner-ceria-style";
  const LINK = "https://goviplink.live/p4st15u5k5es";

  const RIGHT = 18;
  const UP = 99;

  // =====================
  // HELPERS
  // =====================
  const isMobile = () => window.matchMedia("(max-width: 768px)").matches;

  // ✅ Login detector (lebih akurat):
  // Anggap SUDAH login jika menemukan salah satu indikator ini di halaman
  const isLoggedIn = () => {
    const t = (document.body?.innerText || "").toLowerCase();

    // indikator login (dari screenshot kamu)
    const hasBalance = t.includes("idr") && /\bidr\s*[\d.,]+/i.test(document.body?.innerText || "");
    const hasLoyalty = t.includes("loyalty point") || t.includes("lp");

    // indikator kuat lain yang biasanya hanya ada setelah login
    const hasDepoWd = t.includes("depo/wd") || t.includes("depo wd") || t.includes("depo") && t.includes("wd");

    return hasBalance || hasLoyalty || hasDepoWd;
  };

  const removeBtn = () => {
    const el = document.getElementById(BTN_ID);
    if (el) el.remove();
  };

  const ensureCSS = () => {
    if (document.getElementById(STYLE_ID)) return;

    const style = document.createElement("style");
    style.id = STYLE_ID;
    style.textContent = `
      #${BTN_ID}{
        position: fixed;
        right: ${RIGHT}px;
        bottom: calc(${UP}px + env(safe-area-inset-bottom, 0px));
        width: 64px;
        height: 64px;
        border-radius: 999px;
        z-index: 999999;
        display: flex;
        align-items: center;
        justify-content: center;
        text-decoration: none;
        -webkit-tap-highlight-color: transparent;

        background: radial-gradient(circle at 50% 50%,
          #F7E81B 0 22%,
          #EA1E24 22% 50%,
          #39A7C6 50% 76%,
          #0A0A0A 76% 100%
        );

        box-shadow:
          0 10px 25px rgba(0,0,0,.28),
          0 0 0 1px rgba(255,255,255,.10) inset;

        transform: translateZ(0);
      }

      #${BTN_ID} .pc-arrow{
        width: 30px;
        height: 30px;
        border-radius: 999px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 900;
        font-size: 18px;
        line-height: 1;
        color: #0A0A0A;
        background: rgba(255,255,255,.70);
        box-shadow: 0 2px 10px rgba(0,0,0,.18);
      }

      #${BTN_ID} .pc-badge{
        position: absolute;
        top: -6px;
        right: -6px;
        width: 20px;
        height: 20px;
        border-radius: 999px;
        background: #EA1E24;
        color: #fff;
        font-weight: 800;
        font-size: 12px;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 6px 16px rgba(0,0,0,.22);
      }

      #${BTN_ID}:active{ transform: scale(.96); }
    `;
    document.head.appendChild(style);
  };

  const mount = () => {
    // hanya mobile
    if (!isMobile()) return removeBtn();

    // hanya setelah login
    if (!isLoggedIn()) return removeBtn();

    // sudah ada
    if (document.getElementById(BTN_ID)) return;

    ensureCSS();

    const btn = document.createElement("a");
    btn.id = BTN_ID;
    btn.href = LINK;
    btn.target = "_blank";
    btn.rel = "noopener";
    btn.innerHTML = `
      <div class="pc-arrow">➜</div>
      <div class="pc-badge">1</div>
    `;
    document.body.appendChild(btn);
  };

  const init = () => {
    mount();

    window.addEventListener("resize", mount, { passive: true });

    // Pantau perubahan DOM (untuk kasus login tanpa reload)
    const obs = new MutationObserver(() => mount());
    obs.observe(document.documentElement, { childList: true, subtree: true });

    // Backup polling (kalau ada elemen muncul telat)
    const timer = setInterval(mount, 500);
    setTimeout(() => clearInterval(timer), 15000); // cukup 15 detik
  };

  document.readyState === "loading"
    ? document.addEventListener("DOMContentLoaded", init)
    : init();
})();
