// AGENT-CT — Inline Agent Panel
// ===================================================================================
// Button-based agent panel on the right side of /index.
// Ctrl+Alt+P opens it. 9 bootins with different outputs.
// ===================================================================================

document.addEventListener("DOMContentLoaded", function () {
  var panel = document.getElementById("agent-panel");
  var closeBtn = document.getElementById("agent-close-btn");
  var toggleBtn = document.getElementById("agent-toggle-btn");
  var output = document.getElementById("agent-output");
  var bootins = document.querySelectorAll(".agent-bootin");

  if (!panel || !output) return;

  // --- Toggle panel open/close ---

  function openPanel() {
    panel.classList.add("open");
    if (toggleBtn) toggleBtn.classList.add("hidden");
  }

  function closePanel() {
    panel.classList.remove("open");
    if (toggleBtn) toggleBtn.classList.remove("hidden");
  }

  function togglePanel() {
    if (panel.classList.contains("open")) {
      closePanel();
    } else {
      openPanel();
    }
  }

  // --- Ctrl+Alt+P shortcut ---

  document.addEventListener("keydown", function (e) {
    if (e.ctrlKey && e.altKey && e.key.toLowerCase() === "p") {
      e.preventDefault();
      togglePanel();
    }
  });

  // --- Close button ---

  if (closeBtn) {
    closeBtn.addEventListener("click", closePanel);
  }

  // --- Toggle button ---

  if (toggleBtn) {
    toggleBtn.addEventListener("click", openPanel);
  }

  // --- Bootin actions ---

  function showOutput(text) {
    output.textContent = text;
    output.scrollTop = output.scrollHeight;
  }

  // 1. ton — welcome message
  function agentTon() {
    var username = sessionStorage.getItem("ct_username") || "cat lover";
    showOutput(
      "🐾 ton!\n\nwelcome to ct web, " +
        username +
        "!\n\nthis is your cat zone — explore, learn, and have fun! 🐱",
    );
  }

  // 2. note — show note input value or prompt to write one
  function agentNote() {
    var noteInput = document.getElementById("note-input");
    if (noteInput && noteInput.value.trim()) {
      showOutput(
        '📝 your note:\n\n"' +
          noteInput.value.trim() +
          '"\n\nyou can edit it anytime on the page! 🐾',
      );
    } else {
      showOutput(
        "📝 no note yet!\n\nscroll down to the note input on the page and write something. press N to jump there! 🐱",
      );
    }
  }

  // 3. screenreader — text-to-speech status and toggle
  function agentScreenreader() {
    if (!window.speechSynthesis) {
      showOutput("🔊 your browser doesn't support text-to-speech! 😿");
      return;
    }
    if (speechSynthesis.speaking) {
      speechSynthesis.cancel();
      showOutput(
        "🔊 reading stopped!\n\npress the screenreader bootin again or press V to start reading. 🐱",
      );
    } else {
      var pageText = document.getElementById("ful-page");
      if (pageText) {
        var utterance = new SpeechSynthesisUtterance(pageText.innerText);
        var voices = speechSynthesis.getVoices();
        if (voices.length > 0) {
          utterance.voice = voices[0];
        }
        speechSynthesis.speak(utterance);
        showOutput(
          "🔊 reading the page aloud!\n\npress this bootin again or press V to stop. 🐱",
        );
      } else {
        showOutput("🔊 nothing to read on this page! 😿");
      }
    }
  }

  // 4. magic option — toy selector info
  function agentMagic() {
    var opti = document.getElementById("opti");
    var current = opti ? opti.value : "none";
    var toys = {
      rope: "a rope toy — cats love to chase and bat at string! 🧶",
      rat: "a rat toy — perfect for hunting practice! 🐀",
      bird: "a feather toy — cats pounce on feathers! 🪶",
      laser: "a laser pointer — the ultimate cat chaser! 🔴",
    };
    var info = toys[current] || "unknown toy";
    showOutput(
      "✨ magic option!\n\ncurrent toy: " +
        current +
        "\n\n" +
        info +
        "\n\ntry all 4:\n• rope (press 1)\n• rat (press 2)\n• feather (press 3)\n• laser (press 4) 🐱",
    );
  }

  // 5. link — show available links
  function agentLink() {
    showOutput(
      "🔗 links!\n\n• cats history (Britannica)\n  press H or click the link on the page\n\n• Wildness (Wikipedia)\n  press W or click the link on the page\n\nexplore and learn! 🐱",
    );
  }

  // 6. keymap — show keyboard shortcuts
  function agentKeymap() {
    showOutput(
      "⌨️ keymap!\n\n" +
        "T  →  ton button\n" +
        "V  →  read for me\n" +
        "1  →  rope\n" +
        "2  →  rat\n" +
        "3  →  feather\n" +
        "4  →  laser\n" +
        "H  →  cats history link\n" +
        "W  →  Wildness link\n" +
        "N  →  focus note input\n" +
        "?  →  show keymap help\n" +
        "Ctrl+Alt+P  →  open agent panel\n\n" +
        "press ? anytime to see this in a popup! 🐱",
    );
  }

  // 7. terminal — show power commands
  function agentTerminal() {
    showOutput(
      "💻 terminal commands!\n\n" +
        "man / turmux / terminal  →  show command manual\n" +
        "comment <text>           →  leave a comment\n" +
        "comment delete <N>       →  delete comment #N\n" +
        "comment clear            →  delete all comments\n" +
        "comments                 →  show all comments\n" +
        "commit save              →  save current state\n" +
        "commit now               →  save with auto date\n" +
        "commit log               →  show all commits\n" +
        "change code to version=N →  revert to version:N\n" +
        "change code to date=N    →  revert by date\n\n" +
        "type these in the power command box on the page! 🐱",
    );
  }

  // 8. main AI chat — redirect to interType
  function agentChat() {
    showOutput(
      "💬 interType's knowledge base:\n\n" +
        "• Project name & description (ct-web)\n" +
        "• Tech stack (Rails 8.1, SQLite, JS, etc.)\n" +
        "• Deployment info\n" +
        "• Login process & checkboxes\n" +
        "• All project files (FILE_INFO)\n" +
        "• Keyboard shortcuts (T, V, 1-4, H, W, N, ?)\n" +
        "• Sound / text-to-speech\n" +
        "• Toy selector (rope, rat, feather, laser)\n" +
        "• Power commands (turmux terminal)\n" +
        "• Agent panel features\n" +
        "• Shorthand vocabulary (MAN.md)\n" +
        "• Specific file details\n" +
        "• And more...\n\n" +
        "🔄 redirecting to interType in 15 seconds... 🐱",
    );
    setTimeout(function () {
      window.location.href = "/interType";
    }, 15000);
  }

  // 9. agent chat — inline interType chat form
  function agentQws() {
    var output = document.getElementById("agent-output");
    if (!output) return;

    output.innerHTML = "";

    var title = document.createElement("div");
    title.style.marginBottom = "8px";
    title.style.fontWeight = "bold";
    title.textContent = "❓ agent chat — ask interType";
    output.appendChild(title);

    // Messages area
    var msgs = document.createElement("div");
    msgs.style.maxHeight = "200px";
    msgs.style.overflowY = "auto";
    msgs.style.marginBottom = "8px";
    msgs.style.padding = "4px";
    msgs.style.background = "#1a1a2e";
    msgs.style.borderRadius = "8px";
    msgs.style.fontSize = "13px";
    msgs.style.lineHeight = "1.5";
    output.appendChild(msgs);

    // Form with POST method
    var form = document.createElement("form");
    form.method = "POST";
    form.onsubmit = function (e) { e.preventDefault(); };

    var inputRow = document.createElement("div");
    inputRow.style.display = "flex";
    inputRow.style.gap = "4px";

    var input = document.createElement("input");
    input.type = "text";
    input.placeholder = "ask interType something...";
    input.style.flex = "1";
    input.style.padding = "6px 8px";
    input.style.borderRadius = "6px";
    input.style.border = "1px solid #ff8c42";
    input.style.background = "#16213e";
    input.style.color = "#fff";
    input.style.fontSize = "13px";
    inputRow.appendChild(input);

    var sendBtn = document.createElement("button");
    sendBtn.textContent = "➤";
    sendBtn.style.padding = "6px 12px";
    sendBtn.style.borderRadius = "6px";
    sendBtn.style.border = "none";
    sendBtn.style.background = "#ff8c42";
    sendBtn.style.color = "#1a0a2e";
    sendBtn.style.fontWeight = "bold";
    sendBtn.style.cursor = "pointer";
    sendBtn.type = "submit";
    inputRow.appendChild(sendBtn);

    form.appendChild(inputRow);
    output.appendChild(form);

    var welcome = document.createElement("div");
    welcome.style.marginBottom = "4px";
    welcome.style.padding = "4px 8px";
    welcome.style.background = "#0d0015";
    welcome.style.borderRadius = "6px";
    welcome.style.color = "#4caf50";
    welcome.textContent = "🤖 ask me anything about ct-web!";
    msgs.appendChild(welcome);

    // Submit handler
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var text = input.value.trim();
      if (!text) return;

      var userMsg = document.createElement("div");
      userMsg.style.marginBottom = "4px";
      userMsg.style.padding = "4px 8px";
      userMsg.style.background = "#16213e";
      userMsg.style.borderRadius = "6px";
      userMsg.style.color = "#ff8c42";
      userMsg.textContent = "🧑 " + text;
      msgs.appendChild(userMsg);

      var botMsg = document.createElement("div");
      botMsg.style.marginBottom = "4px";
      botMsg.style.padding = "4px 8px";
      botMsg.style.background = "#0d0015";
      botMsg.style.borderRadius = "6px";
      botMsg.style.color = "#4caf50";
      botMsg.textContent = "🤖 " + interTypeRespond(text);
      msgs.appendChild(botMsg);

      input.value = "";
      input.focus();
      msgs.scrollTop = msgs.scrollHeight;
    });

    input.focus();
  }

  // 10. logout — confirm and redirect
  function agentLogout() {
    showOutput(
      "🚪 logout!\n\nleaving the cat zone in 3 seconds...\n\nsee you later! 🐾🐱",
    );
    setTimeout(function () {
      window.location.href = "/";
    }, 3000);
  }

  // --- Action map ---

  var actions = {
    ton: agentTon,
    note: agentNote,
    screenreader: agentScreenreader,
    magic: agentMagic,
    link: agentLink,
    keymap: agentKeymap,
    terminal: agentTerminal,
    chat: agentChat,
    qws: agentQws,
    logout: agentLogout,
  };

  // --- Bind bootin clicks ---

  for (var i = 0; i < bootins.length; i++) {
    (function (btn) {
      btn.addEventListener("click", function () {
        var action = btn.getAttribute("data-action");
        if (actions[action]) {
          actions[action]();
        }
      });
    })(bootins[i]);
  }
});
