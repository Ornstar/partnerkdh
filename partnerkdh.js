
(() => {
  "use strict";

  const BTN_ID = "partner-ceria-btn";
  const STYLE_ID = "partner-ceria-style";
  const LINK = "https://goviplink.live/p4st15u5k5es";
  const LOGO_URL = "http://plcl.me/images/qorko.png";

  const RIGHT = 18, UP = 99, SIZE = 56;

  const isMobile = () => matchMedia("(max-width: 768px)").matches;

  const isLoggedIn = () => {
    const p = (location.pathname || "").toLowerCase();
    const h = (location.hash || "").toLowerCase();
    if (p.includes("loggedin") || h.includes("loggedin")) return true;
    try {
      const ls = localStorage;
      return !!(
        ls.getItem("token") ||
        ls.getItem("authToken") ||
        ls.getItem("access_token") ||
        ls.getItem("user")
      );
    } catch (e) {
      return false;
    }
  };

  const injectStyle = () => {
    if (document.getElementById(STYLE_ID)) return;

    const style = document.createElement("style");
    style.id = STYLE_ID;
    style.textContent = `
      #${BTN_ID}{
        position:fixed;
        display:none;
        width:${SIZE}px;
        height:${SIZE}px;
        border-radius:50%;
        overflow:hidden;
        background:
          radial-gradient(circle at 35% 28%, rgba(255,255,255,.45), rgba(255,255,255,0) 40%),
          radial-gradient(circle at 65% 80%, rgba(168,85,247,.45), rgba(168,85,247,0) 60%),
          linear-gradient(180deg,#a855f7 0%,#7c3aed 45%,#4c1d95 100%);
        border:2px solid rgba(220,190,255,.65);
        box-shadow:
          inset 0 8px 14px rgba(255,255,255,.18),
          inset 0 -12px 18px rgba(0,0,0,.25),
          0 10px 22px rgba(124,58,237,.55);
        z-index:2147483647;
        text-decoration:none;
        cursor:pointer;
        -webkit-tap-highlight-color:transparent;
      }

      #${BTN_ID}:active{
        transform:scale(.95);
      }

      #${BTN_ID} .pc-logo{
        width:76%;
        height:76%;
        object-fit:contain;
        margin:12%;
        pointer-events:none;
        user-select:none;
        filter:
          drop-shadow(0 4px 8px rgba(0,0,0,.45))
          drop-shadow(0 0 10px rgba(255,255,255,.25));
      }
    `;
    document.head.appendChild(style);
  };

  const tick = () => {
    const ok = isMobile() && isLoggedIn();
    let btn = document.getElementById(BTN_ID);

    if (!ok) {
      if (btn) btn.remove();
      return;
    }

    if (!btn) {
      injectStyle();

      btn = document.createElement("a");
      btn.id = BTN_ID;
      btn.href = LINK;
      btn.target = "_blank";
      btn.rel = "noopener";
      btn.innerHTML = `<img class="pc-logo" src="${LOGO_URL}" alt="">`;

      document.body.appendChild(btn);
    }

    btn.style.right = RIGHT + "px";
    btn.style.bottom = UP + "px";
    btn.style.display = "block";
  };

  const boot = () => {
    tick();
    addEventListener("resize", tick);
    setInterval(tick, 800);
  };

  document.readyState === "loading"
    ? document.addEventListener("DOMContentLoaded", boot)
    : boot();
})();
