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

  // Kata yang biasanya muncul jika BELUM login
  const GUEST_TEXTS = ["Masuk", "Daftar"];

  // =====================
  // HELPERS
  // =====================
  const isMobile = () => window.matchMedia("(max-width: 768px)").matches;

  // ✅ Login detector: jika "Masuk/Daftar" masih ada => belum login
  const isLoggedIn = () => {
    const text = (document.body?.innerText || "").toLowerCase();
    const hasGuest = GUEST_TEXTS.some(t => text.includes(t.toLowerCase()));
    return !hasGuest;
  };

  const removeBtn = () => {
    const btn = document.getElementById(BTN_ID);
    if (btn) btn.remove();
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
    // hanya mobile + hanya setelah login
    if (!isMobile()) return removeBtn();
    if (!isLoggedIn()) return removeBtn();

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

  // =====================
  // INIT + WATCH (biar muncul setelah login tanpa reload)
  // =====================
  const init = () => {
    mount();

    window.addEventListener("resize", mount, { passive: true });

    // pantau perubahan halaman (SPA / login modal)
    const obs = new MutationObserver(() => mount());
    obs.observe(document.documentElement, { childList: true, subtree: true });
  };

  document.readyState === "loading"
    ? document.addEventListener("DOMContentLoaded", init)
    : init();
})();
