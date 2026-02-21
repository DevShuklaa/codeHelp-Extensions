if (!document.getElementById("codeHelp-root")) {
  // ALL your codeHelp code goes here

  window.getcodeHelpProblem = () => {
    const selectors = [
      ".description__24sA",              // LeetCode
      "[data-cy=challenge-description]",// HackerRank
      "#problem-statement",             // CodeChef
      ".problem-statement"
    ];

    for (const s of selectors) {
      const el = document.querySelector(s);
      if (el && el.innerText.length > 200) {
        return el.innerText.trim();
      }
    }

    return document.body.innerText.slice(0, 10000);
  };


  const root = document.createElement("div");
  root.id = "codeHelp-root";
  root.style.position = "fixed";
  root.style.zIndex = "2147483647";
  document.body.appendChild(root);

  const shadow = root.attachShadow({ mode: "open" });

  /* ================= HTML ================= */

  shadow.innerHTML = `
<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

:host {
  --bg-main: #0B101A;
  --bg-panel: #11151c;
  --bg-box: #161c24;
  --bg-header: #1c232d;
  --bg-btn: #2a3241;
  --border-light: #2a3241;
  --text-main: #FFFFFF;
  --text-muted: #8c94a4;
  --accent-primary: #ffa116;
  --success: #22c55e;
  --shadow-lg: 0 10px 40px rgba(0, 0, 0, 0.5);
  --radius-md: 8px;
  --transition: all 0.2s ease;
}

* {
  box-sizing: border-box;
  font-family: 'Inter', system-ui, sans-serif;
  margin: 0;
  padding: 0;
}

::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}
::-webkit-scrollbar-track {
  background: transparent;
}
::-webkit-scrollbar-thumb {
  background: var(--bg-btn);
  border-radius: 4px;
}
::-webkit-scrollbar-thumb:hover {
  background: var(--text-muted);
}

#launcher {
  position: fixed;
  bottom: 32px;
  right: 32px;
  background: var(--bg-panel);
  padding: 12px 24px;
  border-radius: 999px;
  color: var(--text-main);
  font-weight: 600;
  font-size: 15px;
  cursor: pointer;
  box-shadow: var(--shadow-lg);
  transition: var(--transition);
  z-index: 999999;
  display: flex;
  align-items: center;
  gap: 8px;
  border: 1px solid var(--border-light);
}

#launcher:hover {
  background: var(--bg-header);
  border-color: var(--accent-primary);
  color: var(--accent-primary);
  transform: translateY(-2px);
}

#panel {
  position: fixed;
  top: max(100px, 15vh);
  right: 24px;
  left: auto;
  width: 410px;
  height: 650px;
  max-height: 85vh;
  background: var(--bg-panel);
  border: 1px solid var(--border-light);
  border-radius: 12px;
  box-shadow: var(--shadow-lg);
  display: none;
  flex-direction: column;
  color: var(--text-main);
  overflow: hidden;
  resize: both;
  z-index: 999999;
}

#pm-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  background: var(--bg-panel);
  cursor: move;
  user-select: none;
}
.brand {
  font-size: 16px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 8px;
}
.controls-right {
  display: flex;
  gap: 12px;
  align-items: center;
}
#pm-mic, #pm-close {
  background: none;
  border: none;
  cursor: pointer;
  color: var(--text-muted);
  font-size: 16px;
  transition: var(--transition);
}
#pm-mic:hover { color: var(--text-main); }
#pm-close:hover { color: #ef4444; }

#pm-tabs {
  display: flex;
  border-bottom: 1px solid var(--border-light);
  padding: 0 16px;
}
#pm-tabs button {
  flex: 1;
  background: none;
  border: none;
  color: var(--text-muted);
  padding: 8px 0;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  position: relative;
  transition: var(--transition);
}
#pm-tabs button:hover {
  color: var(--text-main);
}
#pm-tabs button.active {
  color: var(--accent-primary);
}
#pm-tabs button.active::after {
  content: '';
  position: absolute;
  bottom: -1px; left: 0; right: 0;
  height: 2px;
  background: var(--accent-primary);
}

#pm-body {
  flex: 1;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  overflow: hidden;
  min-height: 0;
}

.pm-box {
  background: var(--bg-box);
  border: 1px solid var(--border-light);
  border-radius: var(--radius-md);
  display: flex;
  flex-direction: column;
  min-height: 0;
}

.pm-box-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 14px;
  background: var(--bg-header);
  border-bottom: 1px solid var(--border-light);
  border-top-left-radius: var(--radius-md);
  border-top-right-radius: var(--radius-md);
}
.box-title {
  font-size: 13px;
  font-weight: 600;
  color: var(--text-main);
}
.box-badge {
  color: var(--accent-primary);
  font-size: 12px;
  font-weight: 600;
}

.pm-box-content {
  padding: 12px;
  flex: 1;
  min-height: 0;
  display: flex;
  flex-direction: column;
  font-size: 13px;
}

#userCode {
  width: 100%;
  display: block;
  background: transparent;
  border: none;
  color: var(--text-main);
  font-family: 'Inter', system-ui, sans-serif;
  font-size: 13px;
  line-height: 1.5;
  resize: none;
  outline: none;
  height: 20px;
  transition: height 0.3s ease;
  overflow: hidden;
}
#userCode:focus, #userCode:not(:placeholder-shown) {
  height: 80px;
  overflow-y: auto;
}
#userCode::placeholder {
  color: var(--text-muted);
}

.output-container {
  overflow-y: auto;
  color: var(--text-main);
  font-family: monospace;
  font-size: 13px;
  line-height: 1.5;
  white-space: pre-wrap;
  word-break: break-word;
  display: block;
}

#pm-footer {
  padding: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid var(--border-light);
}
.footer-left {
  display: flex;
  gap: 12px;
}
.btn-run {
  background: var(--bg-btn);
  color: var(--text-main);
  border: none;
  border: 1px solid rgba(255,255,255,0.1);
  padding: 4px 10px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
  cursor: pointer;
  transition: var(--transition);
}
.btn-run:hover {
  background: #394254;
}
.btn-submit {
  background: var(--accent-primary);
  color: #11151c;
  border: none;
  padding: 4px 10px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 700;
  cursor: pointer;
  transition: var(--transition);
}
.btn-submit:hover {
  background: #ffb74d;
}
.login-input {
  width: 100%;
  background: var(--bg-input);
  border: 1px solid var(--border-light);
  color: var(--text-main);
  padding: 10px;
  border-radius: 6px;
  margin-bottom: 12px;
  outline: none;
  font-family: inherit;
  font-size: 13px;
}
.login-input:focus { border-color: var(--accent-primary); }
.footer-right {
  display: flex;
  align-items: center;
  gap: 12px;
}
.interview-label, .hinglish-label {
  font-size: 12px;
  color: var(--text-main);
  font-weight: 500;
  transition: var(--transition);
}
.toggle-wrapper {
  display: flex;
  align-items: center;
  gap: 6px;
}
/* Toggle Switch */
.switch {
  position: relative;
  display: inline-block;
  width: 36px;
  height: 20px;
}
.switch input { display: none; }
.slider {
  position: absolute;
  cursor: pointer;
  top: 0; left: 0; right: 0; bottom: 0;
  background-color: var(--bg-btn);
  transition: .2s;
  border-radius: 20px;
}
.slider:before {
  position: absolute;
  content: "";
  height: 14px;
  width: 14px;
  left: 3px;
  bottom: 3px;
  background-color: white;
  transition: .2s;
  border-radius: 50%;
}
input:checked + .slider {
  background-color: var(--success);
}
input:checked + .slider:before {
  transform: translateX(16px);
}

.interview-on .interview-label, .hinglish-on .hinglish-label {
  color: var(--accent-primary);
}

/* Loading state for API calls */
.loading {
  opacity: 0.6;
}

</style>

<div id="launcher">🧠 codeHelp</div>

<div id="panel">
  <!-- Top Header -->
  <div id="pm-header">
    <div class="brand">🧠 codeHelp</div>
    <div class="controls-right">
      <button id="pm-close" title="Close Panel">✕</button>
    </div>
  </div>

  <!-- Main Tabs -->
  <div id="pm-tabs">
    <button class="active">Explain</button>
    <button>Hint</button>
    <button>Debug</button>
    <button>Test</button>
    <button>Review</button>
  </div>

  <div id="pm-body">
    <!-- Top Box (Question) -->
    <div class="pm-box" style="flex: 0 0 auto;">
      <div class="pm-box-content" style="padding: 12px 14px; display: block; min-height: unset; flex: unset;">
        <textarea id="userCode" placeholder="Ask your questions here..."></textarea>
      </div>
    </div>

    <!-- Bottom Box (Answer/Code) -->
    <div class="pm-box" style="flex: 1;">
      <div class="pm-box-header">
        <span class="box-title">Output</span>
      </div>
      <div class="pm-box-content output-container" id="left">
        Select a tab to start
      </div>
    </div>
  </div>

  <div id="loginView" style="display: none; flex: 1; padding: 24px; flex-direction: column; justify-content: center; align-items: center; text-align: center;">
    <h3 style="margin-bottom: 16px; color: var(--text-main);">Login to codeHelp</h3>
    <input type="text" id="loginUsername" class="login-input" placeholder="Enter username..." />
    <button id="btnLogin" class="btn-submit" style="width: 100%; font-size: 13px; padding: 10px;">Login</button>
  </div>

  <div id="reviewView" style="display: none; flex: 1; padding: 16px; flex-direction: column; gap: 16px; overflow-y: auto; overflow-x: hidden; min-height: 0; justify-content: flex-start;">
    <div class="pm-box" style="flex: 0 0 auto; min-height: 250px;">
      <div class="pm-box-header"><span class="box-title">Weakness Analysis</span></div>
      <div class="pm-box-content output-container" id="weaknessOutput" style="display: block; flex: unset; min-height: unset; overflow: visible;"></div>
    </div>
    <div class="pm-box" style="flex: 0 0 auto;">
      <div class="pm-box-header"><span class="box-title">Usage Stats</span></div>
      <div class="pm-box-content output-container" id="statsOutput" style="display: block; flex: unset; min-height: unset; overflow: visible;"></div>
    </div>
  </div>

  <!-- Footer Actions -->
  <div id="pm-footer">
    <div class="footer-left">
      <button id="btn-ask" class="btn-run">Ask question</button>
      <button id="btn-solve" class="btn-submit">Solve</button>
    </div>
    <div class="footer-right">
       <div class="toggle-wrapper">
         <span class="hinglish-label">Hinglish</span>
         <label class="switch">
           <input type="checkbox" id="hinglish-toggle">
           <span class="slider"></span>
         </label>
       </div>
       <div class="toggle-wrapper">
         <span class="interview-label">Interview Mode</span>
         <label class="switch">
           <input type="checkbox" id="interview-toggle">
           <span class="slider"></span>
         </label>
       </div>
    </div>
  </div>
</div>
`;

  /* ================= LOGIC ================= */

  const panel = shadow.getElementById("panel");
  const launcher = shadow.getElementById("launcher");
  const closeBtn = shadow.getElementById("pm-close");
  const header = shadow.getElementById("pm-header");
  const interviewToggle = shadow.getElementById("interview-toggle");
  const hinglishToggle = shadow.getElementById("hinglish-toggle");
  const footerRight = shadow.querySelector(".footer-right");
  const btnSolve = shadow.getElementById("btn-solve");
  const btnAsk = shadow.getElementById("btn-ask");

  const pmTabs = shadow.getElementById("pm-tabs");
  const pmBody = shadow.getElementById("pm-body");
  const pmFooter = shadow.getElementById("pm-footer");
  const loginView = shadow.getElementById("loginView");
  const reviewView = shadow.getElementById("reviewView");
  const btnLogin = shadow.getElementById("btnLogin");
  const loginUsername = shadow.getElementById("loginUsername");

  function checkLogin() {
    const user = localStorage.getItem("codeHelp_user");
    if (user) {
      loginView.style.display = "none";
      pmBody.style.display = "flex";
      pmFooter.style.display = "flex";
      pmTabs.style.display = "flex";
      const userLogo = "👤";
      shadow.querySelectorAll(".brand").forEach(b => b.innerHTML = `${userLogo} ${user}`);
      launcher.innerHTML = `${userLogo} ${user}`;
    } else {
      loginView.style.display = "flex";
      pmBody.style.display = "none";
      pmFooter.style.display = "none";
      reviewView.style.display = "none";
      pmTabs.style.display = "none";
      shadow.querySelectorAll(".brand").forEach(b => b.innerHTML = `🧠 codeHelp`);
      launcher.innerHTML = `🧠 codeHelp`;
    }
  }

  btnLogin.onclick = () => {
    if (loginUsername.value.trim()) {
      localStorage.setItem("codeHelp_user", loginUsername.value.trim());
      checkLogin();
    }
  };
  checkLogin();

  let interviewMode = false;

  const codeHelp_API = "https://codehelp-backened-7368.onrender.com/api/ai";

  const ENDPOINTS = {
    explain: "/explain",
    hints: "/hints",
    solve: "/solve",
    debug: "/debug",
    test: "/test",
    optimize: "/optimize",
    ask: "/ask"
  };

  let explainLang = "en";

  hinglishToggle.addEventListener('change', (e) => {
    explainLang = e.target.checked ? "hi" : "en";
    panel.classList.toggle("hinglish", explainLang === "hi");
    e.target.closest('.toggle-wrapper').classList.toggle("hinglish-on", explainLang === "hi");
  });

  const left = shadow.getElementById("left");
  const userCode = shadow.getElementById("userCode");

  window.getcodeHelpCode = () => {
    /* ================= LeetCode (Monaco) ================= */
    const lc = document.querySelectorAll(".view-lines > div");
    if (lc.length) {
      return Array.from(lc).map(l => l.innerText).join("\n");
    }

    /* ================= HackerRank (Ace Editor) ================= */
    const ace = document.querySelector(".ace_text-layer");
    if (ace) {
      return Array.from(ace.querySelectorAll(".ace_line"))
        .map(l => l.innerText)
        .join("\n");
    }

    /* ================= CodeChef (Textarea / Ace) ================= */
    const textarea = document.querySelector("textarea");
    if (textarea && textarea.value.length > 10) {
      return textarea.value;
    }

    const ccAce = document.querySelector(".ace_text-layer");
    if (ccAce) {
      return Array.from(ccAce.querySelectorAll(".ace_line"))
        .map(l => l.innerText)
        .join("\n");
    }

    return "";
  };

  function syncEditorCode(force = false) {
    const extracted = window.getcodeHelpCode();
    if (!extracted || extracted.length < 20) return false;
    if (force || !userCode.value.trim()) {
      userCode.value = extracted;
    }
    return true;
  }

  /* Bottom Actions (Run/Submit equivalent) */
  btnAsk.onclick = () => {
    const found = userCode.value;
    if (!found) {
      left.innerText = "⚠️ No question asked ";
      return;
    }
    callcodeHelp("ask");
  };

  btnSolve.onclick = () => {
    callcodeHelp("solve");
  };

  left.scrollTop = 0;

  function getCurrentProblemId() {
    // Use the URL path to precisely uniquely identify the current problem
    return window.location.pathname.replace(/[^a-zA-Z0-9]/g, '_');
  }

  function trackUsage(type) {
    const prob = getCurrentProblemId();
    const totalKey = `codeHelp_${type}_total`;
    const probKey = `codeHelp_${type}_${prob}`;
    localStorage.setItem(totalKey, parseInt(localStorage.getItem(totalKey) || "0") + 1);
    localStorage.setItem(probKey, parseInt(localStorage.getItem(probKey) || "0") + 1);
  }

  function updateReviewTab() {
    const prob = getCurrentProblemId();
    const eTotal = localStorage.getItem(`codeHelp_explain_total`) || 0;
    const eProb = localStorage.getItem(`codeHelp_explain_${prob}`) || 0;
    const hTotal = localStorage.getItem(`codeHelp_hints_total`) || 0;
    const hProb = localStorage.getItem(`codeHelp_hints_${prob}`) || 0;

    shadow.getElementById("statsOutput").innerHTML = `
      <b style="color:var(--accent-primary)">Current Problem:</b><br/>
      • Explain used: ${eProb} time(s)<br/>
      • Hint used: ${hProb} time(s)<br/><br/>
      <b style="color:var(--accent-primary)">All-Time Total:</b><br/>
      • Explain used: ${eTotal} time(s)<br/>
      • Hint used: ${hTotal} time(s)<br/>
    `;

    const weaknesses = JSON.parse(localStorage.getItem("codeHelp_weaknesses") || "{}");
    if (Object.keys(weaknesses).length === 0) {
      shadow.getElementById("weaknessOutput").innerHTML = "No weakness data yet. Use Debug to analyze.";
    } else {
      const latest = localStorage.getItem("codeHelp_latest_weakness") || "None identified yet";
      const currentArray = JSON.parse(localStorage.getItem("codeHelp_current_weaknesses") || "[]");

      let html = `<div style="margin-bottom: 12px; padding: 8px; background: rgba(255,161,22,0.1); border-left: 3px solid var(--accent-primary); border-radius: 4px;">
        <span style="color:var(--text-muted); font-size:11px; text-transform:uppercase; font-weight:700;">Latest Identified Weakness</span><br/>
        <span style="color:var(--accent-primary); font-size:14px; font-weight:600;">${latest}</span>
      </div>`;

      if (currentArray.length > 0) {
        html += "<b style='color:var(--accent-primary)'>Current Weaknesses (Last " + currentArray.length + "):</b><br/>";
        currentArray.forEach((w, i) => {
          html += `• ${i + 1}. ${w}<br/>`;
        });
        html += "<br/>";
      }

      let totalAllTime = 0;
      for (const count of Object.values(weaknesses)) {
        totalAllTime += count;
      }

      html += "<b style='color:var(--accent-primary)'>All-Time Weaknesses (Average):</b><br/>";
      for (const [w, count] of Object.entries(weaknesses)) {
        let avg = Math.round((count / totalAllTime) * 100);
        html += `• ${w}: ${avg}% (${count} times)<br/>`;
      }
      shadow.getElementById("weaknessOutput").innerHTML = html;
    }
  }

  async function callcodeHelp(mode) {
    if (interviewMode && mode === "solve") {
      left.innerText = "🔒 Solve disabled in Interview Mode";
      return;
    }

    if (mode === "explain") trackUsage("explain");
    if (mode === "hints") trackUsage("hints");

    left.innerText = "Thinking…";
    left.classList.add("loading");

    try {
      const res = await fetch(codeHelp_API + ENDPOINTS[mode], {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          problem: window.getcodeHelpProblem(),
          language: "Java",
          code: userCode.value || "",
          outputLang: explainLang === "hi" ? "hinglish" : "english"
        })
      });

      left.classList.remove("loading");
      if (!res.ok) throw new Error("Server error");

      const data = await res.json();

      if (mode === "debug") {
        const feedback = data.mistakesAndFeedback || "";
        const perfect = data.perfectCode ? `\n\nPerfect Code:\n${data.perfectCode}` : "";
        left.innerText = `Feedback:\n${feedback}${perfect}`;
        left.scrollTop = 0;

        const rawWeakness = data.userWeaknesses || "";
        let weakness = rawWeakness.replace(/['"]+/g, '').trim();
        if (!weakness) weakness = "General Logic";
        else weakness = weakness.charAt(0).toUpperCase() + weakness.slice(1);

        if (weakness.split(" ").length > 6 || weakness.length > 50) {
          weakness = "General Logic";
        }

        // --- Current Weakness (Last 6) ---
        let currentArray = JSON.parse(localStorage.getItem("codeHelp_current_weaknesses") || "[]");
        currentArray.unshift(weakness);
        if (currentArray.length > 6) {
          currentArray.pop();
        }
        localStorage.setItem("codeHelp_current_weaknesses", JSON.stringify(currentArray));
        localStorage.setItem("codeHelp_latest_weakness", weakness);

        // --- All-time Weakness ---
        let wmap = JSON.parse(localStorage.getItem("codeHelp_weaknesses") || "{}");
        wmap[weakness] = (wmap[weakness] || 0) + 1;
        localStorage.setItem("codeHelp_weaknesses", JSON.stringify(wmap));
      } else {
        left.innerText = data.response;
        left.scrollTop = 0;
      }

    } catch (err) {
      left.classList.remove("loading");
      left.innerText = "❌ codeHelp server not reachable";
    }
  }

  function openPanel() {
    panel.style.display = "flex";
    launcher.style.display = "none";
    localStorage.codeHelp_open = "true";
  }
  function closePanel() {
    panel.style.display = "none";
    launcher.style.display = "block";
    localStorage.codeHelp_open = "false";
  }

  closePanel();
  launcher.onclick = openPanel;
  closeBtn.onclick = closePanel;

  if (localStorage.codeHelp_open === "true") openPanel();

  /* Dragging */
  let drag = false, offX = 0, offY = 0;
  header.onmousedown = e => {
    drag = true;
    offX = e.clientX - panel.offsetLeft;
    offY = e.clientY - panel.offsetTop;
  };

  document.onmousemove = e => {
    if (!drag) return;
    panel.style.left = e.clientX - offX + "px";
    panel.style.top = e.clientY - offY + "px";
  };

  document.onmouseup = () => {
    if (!drag) return;
    drag = false;
    localStorage.codeHelp_panel = JSON.stringify({
      left: panel.style.left,
      top: panel.style.top
    });
  };

  shadow.querySelectorAll("#pm-tabs button").forEach(btn => {
    btn.onclick = () => {
      shadow.querySelectorAll("#pm-tabs button").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      const label = btn.innerText.toLowerCase();

      if (label === "review") {
        pmBody.style.display = "none";
        reviewView.style.display = "flex";
        updateReviewTab();
        return;
      } else {
        pmBody.style.display = "flex";
        pmFooter.style.display = "flex";
        reviewView.style.display = "none";
      }

      if (label === "test") callcodeHelp("test");
      if (label === "explain") callcodeHelp("explain");
      if (label === "hint") callcodeHelp("hints");
      if (label === "debug") {
        // "Make Debug and Check my code as one button" -> Debug tab auto-checks code
        const found = syncEditorCode(true);
        if (!found) {
          left.innerText = "⚠️ Code editor se code nahi mila";
          return;
        }
        callcodeHelp("debug");
      }
    };
  });

  /* Interview Mode */
  interviewToggle.addEventListener('change', (e) => {
    interviewMode = e.target.checked;

    // Smoothly transition the solve button state without layout shift
    btnSolve.style.opacity = interviewMode ? "0.3" : "1";
    btnSolve.style.pointerEvents = interviewMode ? "none" : "auto";

    e.target.closest('.toggle-wrapper').classList.toggle("interview-on", interviewMode);
  });

}

/* ================= ROOT + SHADOW ================= */
