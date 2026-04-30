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
      "💬 main AI chat!\n\nheading to interType — your ct-web AI assistant!\n\nredirecting in 3 seconds... 🐱",
    );
    setTimeout(function () {
      window.location.href = "/interType";
    }, 3000);
  }

  // 9. logout — confirm and redirect
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
