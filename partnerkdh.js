(() => {
  "use strict";

  // ===== SETTINGS =====
  const BTN_ID   = "partner-ceria-btn";
  const STYLE_ID = "partner-ceria-style";
  const LINK     = "https://goviplink.live/p4st15u5k5es";

  // posisi
  const RIGHT = 18; // px dari kanan
  const UP    = 99; // px dari bawah

  // tampil hanya di mobile
  const isMobile = () => window.matchMedia("(max-width: 768px)").matches;

  /**
   * ✅ PENTING:
   * Isi selector elemen yang PASTI ada setelah login selesai.
   * Contoh umum (pilih salah satu yang cocok di web kamu):
   * - "a[href*='logout']"
   * - ".user-avatar"
   * - ".account-menu"
   * - "#profileMenu"
   */
  const LOGIN_READY_SELECTOR = "a[href*='logout'], .user-avatar, .account-menu, #profileMenu";

  const isLoggedIn = () => !!document.querySelector(LOGIN_READY_SELECTOR);

  const injectStyle = () => {
    if (document.getElementById(STYLE_ID)) return;

    const style = document.createElement("style");
    style.id = STYLE_ID;
    style.textContent = `
      #${BTN_ID}{
        position: fixed;
        display: none;

        width: 72px;
        height: 72px;
        border-radius: 50%;

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
    `;
    document.head.appendChild(style);
  };

  const place = (btn) => {
    btn.style.right = `${RIGHT}px`;
    btn.style.bottom = `${UP}px`;
    btn.style.display = "block";
  };

  const showIfReady = () => {
    // hanya mobile
    if (!isMobile()) return hide();

    // hanya setelah login selesai
    if (!isLoggedIn()) return hide();

    let btn = document.getElementById(BTN_ID);
    if (!btn) {
      injectStyle();
      btn = document.createElement("a");
      btn.id = BTN_ID;
      btn.href = LINK;
      btn.target = "_blank";
      btn.rel = "noopener";
      btn.innerHTML = ""; // polos tanpa text
      document.body.appendChild(btn);
    }

    place(btn);
  };

  const hide = () => {
    const btn = document.getElementById(BTN_ID);
    if (btn) btn.remove();
  };

  const boot = () => {
    // cek awal
    showIfReady();

    // ✅ Observer: kalau login selesai tanpa reload, tombol tetap bisa muncul
    const obs = new MutationObserver(() => showIfReady());
    obs.observe(document.documentElement, { childList: true, subtree: true });

    // fallback ringan
    setInterval(showIfReady, 1000);

    // resize (mobile/desktop berubah)
    window.addEventListener("resize", showIfReady);
  };

  document.readyState === "loading"
    ? document.addEventListener("DOMContentLoaded", boot)
    : boot();
})();
