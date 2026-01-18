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
*{box-sizing:border-box;font-family:Inter,system-ui}
#launcher{
  position:fixed;bottom:24px;right:24px;
  background:linear-gradient(135deg,#4f8cff,#1e3cff);
  padding:12px 22px;border-radius:999px;
  color:white;font-weight:600;cursor:pointer;
  box-shadow:0 10px 30px rgba(0,0,0,.6)
}
#panel{
  position:fixed;
  top:135px;
  right:10px;
  left:auto;
   width:410px;
  height:450px;
  background:rgba(20,25,40,.88);
  backdrop-filter:blur(20px);
  border-radius:16px;
  box-shadow:0 20px 80px rgba(0,0,0,.8);
  display:none;flex-direction:column;color:white;
  overflow:hidden;resize:both
}
#header{
  padding:14px;
  display:flex;justify-content:space-between;
  align-items:center;cursor:move;
  background:linear-gradient(180deg,#111827,#0b1020)
}
#header .title{font-weight:700;font-size:16px}
#header .status{color:#22c55e;font-size:12px}
#controls button{
  background:none;border:none;color:white;
  font-size:18px;margin-left:12px;cursor:pointer
}
#tabs{
  display:flex;background:#0b1020;
  border-bottom:1px solid #1f2937
}
#tabs button{
  flex:1;padding:10px;
  background:none;border:none;
  color:#9ca3af;cursor:pointer
}
#tabs button.active{
  color:#60a5fa;border-bottom:2px solid #60a5fa
}
#body{
  flex:1;
  display:grid;
  grid-template-columns: 2fr 1fr;
  gap:12px;
  padding:12px;
  min-height:0;   /* CRITICAL */
}

#left{
  background:#0b1020;
  border-radius:12px;
  padding:14px;
  overflow-y:auto;  /* Enable scrolling */
  min-height:0;    /* CRITICAL */
}

#right{
  display:grid;
  grid-template-rows: auto 1fr auto auto;
  gap:10px;
  min-height:0;    /* CRITICAL */
}

#langToggle{
  display:flex;
  align-items:center;
  justify-content:center;
  gap:10px;
  background:#020617;
  border:1px solid #1f2937;
  border-radius:12px;
  padding:10px;
  cursor:pointer;
  color:#9ca3af;
}

#langSwitch{
  width:32px;
  height:16px;
  background:#1f2937;
  border-radius:999px;
  position:relative;
}

#langSwitch::after{
  content:"";
  position:absolute;
  width:14px;
  height:14px;
  background:#60a5fa;
  border-radius:50%;
  top:1px;
  left:2px;
  transition:.2s;
}

.hinglish #langSwitch::after{
  left:16px;
}

.hinglish #langHi{color:#60a5fa}
#langEn{color:#60a5fa}
.hinglish #langEn{color:#9ca3af}


#interviewBanner{
  background:linear-gradient(135deg,#1e3a8a,#1e293b);
  padding:12px;
  border-radius:12px;
  color:#60a5fa;
  font-size:13px;
}

  #userCode{
  width:100%;
  background:#020617;
  border:1px solid #1f2937;
  border-radius:12px;
  padding:12px;
  color:#e5e7eb;
  font-family:monospace;
  font-size:12px;
  resize:none;
}



#footer{
  padding:10px;background:#0b1020;
  display:flex;gap:10px
}
#smartGrid{
  display:grid;
  grid-template-columns:1fr 1fr;
  gap:10px;
}

/* Interview mode active glow */
.interview-on{
  color:#22c55e !important;
  text-shadow: 0 0 8px rgba(34,197,94,0.8);
  animation: interviewPulse 1.5s infinite;
}

@keyframes interviewPulse{
  0%{
    box-shadow: 0 0 0 0 rgba(34,197,94,0.6);
  }
  70%{
    box-shadow: 0 0 0 8px rgba(34,197,94,0);
  }
  100%{
    box-shadow: 0 0 0 0 rgba(34,197,94,0);
  }
}



#smartGrid button{
  background:#1f2937;
  border:none;
  color:white;
  padding:5px;
  border-radius:14px;
  cursor:pointer;
}

</style>

<div id="launcher">codeHelp</div>

<div id="panel">
  <div id="header">
    <div>
      <div class="title">🧠 codeHelp AI</div>
      <div class="status">AI Tutor Online</div>
    </div>
    <div id="controls">
      <button id="interview">🎤</button>
      <button id="close">✖</button>
    </div>
  </div>

  <div id="tabs">
    <button class="active">Explain</button>
    <button>Hints</button>
    <button id="solveTab">Solve</button>
    <button>Debug</button>
    <button>Test</button>
  </div>

  <div id="body">
    <div id="left">Select a tab to start</div>
    <div id="right">
  <div id="interviewBanner">Interview Mode OF: Solve tab is open  </div>

  <textarea id="userCode" placeholder="Ask your questions.Related to problem 🔍"></textarea>

  <div id="langToggle">
  <span id="langEn">EN</span>
  <div id="langSwitch"></div>
  <span id="langHi">HE</span>
</div>

</div>


  <div id="smartGrid">
  <button>Check My Code</button>
  <button>Ask question</button>
</div>

</div>
`;

  /* ================= LOGIC ================= */

  const panel = shadow.getElementById("panel");
  const launcher = shadow.getElementById("launcher");
  const closeBtn = shadow.getElementById("close");
  const header = shadow.getElementById("header");
  const interview = shadow.getElementById("interview");
  const banner = shadow.getElementById("interviewBanner");
  const solveTab = shadow.getElementById("solveTab");
  // banner.style.display = "none";




  let interviewMode = false;



  const codeHelp_API = "https://codehelp-backened.onrender.com";

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
  const langToggle = shadow.getElementById("langToggle");

  langToggle.onclick = () => {
    explainLang = explainLang === "en" ? "hi" : "en";
    panel.classList.toggle("hinglish", explainLang === "hi");
  };

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

  const smartButtons = shadow.querySelectorAll("#smartGrid button");

  smartButtons.forEach(btn => {
    const text = btn.innerText.toLowerCase();

    if (text.includes("check")) {
      btn.onclick = () => {

        // 1️⃣ Auto extract code
        const found = syncEditorCode(true);

        if (!found) {
          left.innerText = "⚠️ Code editor se code nahi mila";
          return;
        }

        // 2️⃣ Call backend (debug)
        callcodeHelp("debug");
      };
    }
    if (text.includes("ask")) {

      btn.onclick = () => {


        const found = userCode.value;

        if (!found) {
          left.innerText = "⚠️ No question asked ";
          return;
        }

        // 2️⃣ Call backend (debug)
        callcodeHelp("ask");
      };

    }
  });


  left.scrollTop = 0;





  async function callcodeHelp(mode) {
    if (interviewMode && mode === "solve") {
      left.innerText = "🔒 Solve disabled in Interview Mode";
      return;
    }

    left.innerText = "Thinking…";

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

      if (!res.ok) throw new Error("Server error");

      const data = await res.json();
      left.innerText = data.response;
      left.scrollTop = 0;


    } catch (err) {
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

    /* Dragging */
    if (drag) {
      panel.style.left = e.clientX - offX + "px";
      panel.style.top = e.clientY - offY + "px";
    }
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

  shadow.querySelectorAll("#tabs button").forEach(btn => {
    btn.onclick = () => {
      shadow.querySelectorAll("#tabs button").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      const label = btn.innerText.toLowerCase();

      if (label.includes("explain")) callcodeHelp("explain");
      if (label.includes("hints")) callcodeHelp("hints");
      if (label === "solve") callcodeHelp("solve");
      if (label.includes("debug")) callcodeHelp("debug");
      if (label.includes("test")) callcodeHelp("test");
    };
  });

  shadow.querySelectorAll("#footer button").forEach(btn => {
    if (btn.innerText.includes("Optimize")) {
      btn.onclick = () => callcodeHelp("optimize");
    }
  });

  /* Interview Mode */
  interview.onclick = () => {
    if (!interviewMode) {
      banner.innerHTML = "Interview Mode ON: Solve tab is Closed ";
    }
    else {
      banner.innerHTML = "Interview Mode OF:\n Solve tab is Open ";

    }
    interviewMode = !interviewMode;



    solveTab.style.opacity = interviewMode ? "0.3" : "1";
    solveTab.style.pointerEvents = interviewMode ? "none" : "auto";

    // 🔥 Glow effect
    interview.classList.toggle("interview-on", interviewMode);
  };



}


/* ================= ROOT + SHADOW ================= */
