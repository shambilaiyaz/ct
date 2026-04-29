// inter_type-ct.js — 63 interType AI Assistant (rebuilt)
// ===================================================================================
// Fixed knowledge base AI that only knows about the ct-web project.
// Never reveals passwords or secrets — checkboxes handle access now!
// ===================================================================================

// --- Knowledge base ---

var SHORTHAND = {
  plese: "please",
  valid: "validate",
  mak: "make",
  erl: "early",
  brose: "browse",
  voce: "voice",
  static: "fun / victory",
  kep: "keep",
  man: "manual",
  ed: "edit",
  msg: "message",
  col: "column",
  nw: "now",
  se: "see",
  loc: "location",
  sv: "save",
  late: "lately",
  wwt: "wait",
  sm: "some",
  latr: "later",
  evr: "ever",
  lang: "language",
  mem: "memory",
};

var KEYBOARD_SHORTCUTS = {
  T: "ton button — welcomes you to ct web",
  V: "read aloud — uses text-to-speech to read the page",
  1: "select rope toy",
  2: "select rat toy",
  3: "select feather (bird) toy",
  4: "select laser toy",
  H: "open cats history link (Britannica)",
  W: "open Wildness link (Wikipedia wildlife)",
  N: "focus the note input",
  "?": "show keymap help",
};

var POWER_COMMANDS = [
  {
    cmd: "man / terminal / turmux / terminator",
    desc: "show the command manual",
  },
  {
    cmd: "commit sv / commit save",
    desc: "save current page state as a new commit",
  },
  { cmd: "commit nw / commit now", desc: "save with auto date" },
  { cmd: "commit log", desc: "show all commits" },
  { cmd: "comment <text>", desc: "leave a comment for the site" },
  { cmd: "comment delete <N>", desc: "delete comment number N" },
  { cmd: "comment clear", desc: "delete all comments (needs password)" },
  { cmd: "comments", desc: "show all comments" },
  { cmd: "chnge code to date=N", desc: "revert page to commit by date" },
  { cmd: "chnge code to var=N", desc: "revert page to commit by var number" },
];

var FILE_INFO = {
  "index.html.erb":
    "main page with cat facts, toy selector, images, notes, and power command terminal",
  "login.html.erb":
    "login page with name, email, and checkboxes (no paskey needed — checkboxes confirm you're here to learn!)",
  "ct.js":
    "core login logic — Login() function (checkAccess removed, checkboxes handle access now)",
  "keymap-ct.js": "keyboard shortcuts — T, V, 1-4, H, W, N, ?",
  "sound-ct.js": "text-to-speech reader using Web Speech API",
  "act-ct.js": "image switcher for the toy selector dropdown",
  "bootin-ct.js":
    "button click handlers — ton, reader, help, power, login bindings",
  "check_box-ct.js":
    "checkbox and login validation — cat-learn, done, remember checks + submitLogin()",
  "turmux-ct.js":
    "power command system — commit, comment, time travel commands",
  "email-ct.js": "email signup form handler — saves to SQLite via fetch",
  "data-ct.js": "data handling and email save to database",
  "index-ct.js": "index page initialization — greet user, init power system",
  "ct.css": "all the styles for ct-web",
  "login-ct.css": "login page styles extracted from ct.css",
  "inter_type-ct.css": "interType AI assistant page styles",
};

// --- Helper: check if any keyword appears in the message (case-insensitive) ---

function matchesAny(msg, keywords) {
  var lower = msg.toLowerCase();
  for (var i = 0; i < keywords.length; i++) {
    if (lower.indexOf(keywords[i].toLowerCase()) !== -1) {
      return true;
    }
  }
  return false;
}

// --- Main response function ---

function interTypeRespond(userMessage) {
  var msg = userMessage.trim();
  if (!msg) return "type smthing! I'm here to help 🐱";
  if (matchesAny(msg, ["MAN", "manual", "help", "ct"])) {
    return "what do you need help with?";
  }

  // help neded stuff

  if (
    matchesAny(msg, [
      "what is this button run mean?",
      "what is this black spot?",
    ])
  ) {
    return "that's a terminal run command ~man first it's gonn'a teach you what commands are functioning here, and if you don't no what those other things does than tap on it or fell free to ask";
  }
  // --- Secret/password blocking (always check first!) ---
  if (
    matchesAny(msg, [
      "password",
      "secret",
      "login code",
      "access code",
      "enter code",
    ])
  ) {
    return "nice try! 😼 ct-web doesn't use passwords or paskeys anymore — the checkboxes confirm you're here to learn! 🐾";
  }

  // --- Greetings ---
  if (
    matchesAny(msg, [
      "hello",
      "hi",
      "hey",
      "greetings",
      "howdy",
      "yo",
      "sup",
      "what's up",
      "whats up",
      "good morning",
      "good evening",
      "good afternoon",
    ])
  ) {
    return "meow there! 🐱 I'm 63 interType — your ct-web assistant! Ask me about the project's features, files, keyboard shortcuts, power commands, or anything ct-web related!";
  }

  // --- Who are you / about the bot ---
  if (
    matchesAny(msg, [
      "who are you",
      "what are you",
      "your name",
      "about you",
      "intertype",
      "63",
    ])
  ) {
    return "I'm 63 interType! 🐱 A fixed knowledge base AI that only knows about the ct-web project. I can tell you about its files, features, keyboard shortcuts, power commands, shorthand, and more. I never reveal secrets though! 😼";
  }

  // --- Project name ---
  if (
    matchesAny(msg, [
      "project name",
      "name of the project",
      "what is this project",
      "what project",
      "what's this",
      "what is this",
      "ct web",
      "cat web",
      "ct-web",
    ])
  ) {
    return "this project is called ct-web (also known as cat web or ct web)! 🐱 It's a cat-themed web application built to learn about cats and web development at the same time.";
  }

  // --- Built with / tech stack ---
  if (
    matchesAny(msg, [
      "built with",
      "made with",
      "tech stack",
      "technology",
      "technologies",
      "what is it built",
      "what is it made",
      "framework",
      "language",
      "languages used",
      "stack",
    ])
  ) {
    return "ct-web is built with: 🐱\n\n• HTML & CSS — for structure and styling\n• JavaScript — for interactivity (all those -ct.js files!)\n• Ruby on Rails 8.1 — the backend framework\n• SQLite — the database (stores emails and stuff)\n• Puma — the web server\n• Propshaft — the asset pipeline\n\npretty pawsome stack, right? 😼";
  }

  // --- Deployment ---
  if (
    matchesAny(msg, [
      "deploy",
      "deployment",
      "how to deploy",
      "hosting",
      "server",
      "puma",
      "rails version",
      "rails 8",
    ])
  ) {
    return "ct-web is deployed with: 🐱\n\n• Ruby on Rails 8.1 — the framework\n• SQLite — the database\n• Puma — the web server\n• Propshaft — asset pipeline\n• Docker — containerized deployment\n\nit's ready to deploy anywhere with Kamal! 🐾";
  }

  // --- Login (checkboxes handle access) ---
  if (
    matchesAny(msg, [
      "login",
      "log in",
      "sign in",
      "how to log in",
      "enter",
      "access",
      "authenticate",
    ])
  ) {
    return 'to log in to ct-web, just fill in your name and email! 🐱 Then check "I want to learn about cats" and "done" checkboxes to enter the cat zone. No paskey needed — the checkboxes confirm you\'re here to learn! 😼🐾';
  }

  // --- Files / structure ---
  if (
    matchesAny(msg, [
      "files",
      "file structure",
      "what files",
      "codebase",
      "source code",
      "project structure",
      "directory",
      "directories",
      "scripts",
      "javascript files",
      "js files",
    ])
  ) {
    var response = "here are all the ct-web files! 🐱\n\n";
    var files = Object.keys(FILE_INFO);
    for (var i = 0; i < files.length; i++) {
      response += "• " + files[i] + " — " + FILE_INFO[files[i]] + "\n";
    }
    response += "\nwant details on any specific file? just ask! 🐾";
    return response;
  }

  // --- Specific file questions ---
  if (matchesAny(msg, ["index.html", "main page", "home page"])) {
    return 'index.html.erb is the main page of ct-web! 🐱 It has:\n\n• A hero section with welcome message and cat image\n• A note input for writing notes\n• A "read for me" button (text-to-speech)\n• Cat facts section\n• Toy selector (rope, rat, feather, laser)\n• Links to cats history and wildlife\n• Power command terminal\n• Logout link\n\nit\'s where all the cat magic happens! 🐾';
  }

  if (matchesAny(msg, ["login.html", "login page", "login form"])) {
    return 'login.html.erb is the login page! 🐱 It has:\n\n• Name input ("whats your name human?")\n• Email input ("whats your email?")\n• "I want to learn about cats" checkbox 😺\n• "remember me" checkbox 🐾\n• "done" checkbox ✅\n• The enter button (disabled until checkboxes are checked)\n\nno paskey needed — the checkboxes confirm you\'re here to learn! 😼🐾';
  }

  if (matchesAny(msg, ["ct.js", "core logic", "core file"])) {
    return "ct.js is the core login logic! 🐱 It has:\n\n• Login() — opens the login overlay\n\ncheckAccess() was removed — checkboxes now handle access! submitLogin() lives in check_box-ct.js for better organization! 🐾";
  }

  // --- Keyboard shortcuts ---
  if (
    matchesAny(msg, [
      "keymap",
      "keyboard",
      "shortcut",
      "shortcuts",
      "hotkey",
      "hotkeys",
      "key bindings",
    ])
  ) {
    var resp = "here are the ct-web keyboard shortcuts! 🐱\n\n";
    var keys = Object.keys(KEYBOARD_SHORTCUTS);
    for (var j = 0; j < keys.length; j++) {
      resp += "• " + keys[j] + " → " + KEYBOARD_SHORTCUTS[keys[j]] + "\n";
    }
    resp += "\npress ? anytime to see them in the app! 🐾";
    return resp;
  }

  // --- Sound ---
  if (
    matchesAny(msg, [
      "sound",
      "speech",
      "text-to-speech",
      "read aloud",
      "reader",
      "voice",
    ])
  ) {
    return 'sound-ct.js handles the text-to-speech reader! 🐱 It uses the Web Speech API to read the page aloud. Click the "read for me" button or press V to activate. Press again to stop! 🐾';
  }

  // --- Act / toy selector ---
  if (
    matchesAny(msg, [
      "act",
      "image switch",
      "toy selector",
      "toy select",
      "toys",
      "select toy",
    ])
  ) {
    return "act-ct.js is the image switcher for the toy selector! 🐱 It has an imageUrls object with URLs for:\n\n• rope 🧶\n• rat 🐀\n• bird (feather) 🪶\n• laser 🔴\n\nwhen you pick a toy from the dropdown, changeImage() swaps the image! 🐾";
  }

  // --- Bootin ---
  if (matchesAny(msg, ["bootin", "button", "buttons", "click handler"])) {
    return 'bootin-ct.js has all the button click handlers! 🐱\n\n• showAlert1() — the "ton" button welcome alert\n• showAlert2() — the "?" help alert\n• Binds click events for: ton, reader, opti (toy selector), help, power-btn, login-btn\n\nit\'s the event binding hub! 🐾';
  }

  // --- Check box ---
  if (
    matchesAny(msg, [
      "checkbox",
      "check_box",
      "validation",
      "validate",
      "login validation",
    ])
  ) {
    return 'check_box-ct.js handles checkboxes and login validation! 🐱\n\n• isCatLearnChecked() — checks the "I want to learn about cats" box\n• isDoneChecked() — checks the "done" box\n• allRequiredChecked() — both must be checked to enable login\n• handleRemember() — saves/loads username & email to localStorage\n• submitLogin() — validates name, email, and checkboxes\n\nthe checkboxes are the gatekeeper — no paskey needed! 😼🐾';
  }

  // --- Turmux ---
  if (
    matchesAny(msg, [
      "turmux",
      "power command",
      "terminal",
      "commit",
      "time travel",
      "command system",
    ])
  ) {
    var r = "turmux-ct.js is the power command system! 🐱 It supports:\n\n";
    for (var k = 0; k < POWER_COMMANDS.length; k++) {
      r += "• " + POWER_COMMANDS[k].cmd + " — " + POWER_COMMANDS[k].desc + "\n";
    }
    r +=
      "\nit uses localStorage to save commits and supports time travel (reverting to previous states)! 🐾";
    return r;
  }

  // --- Email ---
  if (matchesAny(msg, ["email", "signup", "sign up", "email form"])) {
    return 'email-ct.js and data-ct.js handle the email signup! 🐱 They:\n\n• Submit via fetch (no page redirect)\n• Include CSRF token for security\n• Show success message: "🐾 email svd! thanks!"\n• Save emails to SQLite database\n• Pre-fill username if logged in\n\nemails get stored in the cat-web database! 🐾';
  }

  // --- Styles ---
  if (matchesAny(msg, ["ct.css", "styles", "styling", "css"])) {
    return "ct-web has modular styles! 🐱\n\n• ct.css — main styles for index page\n• login-ct.css — login overlay, box, inputs, animations\n• inter_type-ct.css — interType AI assistant page\n\nall cat-themed with warm oranges, pinks, and creams! 🐾";
  }

  // --- Features ---
  if (
    matchesAny(msg, [
      "feature",
      "features",
      "what can",
      "what does",
      "functionality",
      "capabilities",
    ])
  ) {
    return "here's what ct-web can do! 🐱\n\n1. 🔐 Login with checkboxes (just confirm you're here to learn!)\n2. ⌨️ Keyboard shortcuts (T, V, 1-4, H, W, N, ?)\n3. 🐱 Cat facts and toy selector\n4. 🔊 Text-to-speech reader\n5. 💻 Power command terminal (commit sv, commit log, comment, chnge code to var=N)\n6. 📧 Email signup saved to SQLite\n7. 📝 Remember me feature\n8. 🐾 Cat-themed everything!\n\nwant details on any feature? just ask! 😼";
  }

  // --- Cat facts ---
  if (
    matchesAny(msg, [
      "cat fact",
      "facts about cat",
      "cat info",
      "learn about cat",
      "cat knowledge",
    ])
  ) {
    return "ct-web says: cats like to be clean and act at their own style! 🐱 They like to discover about wigly things. Also, cats hate green! Want to learn more? Check out the cats history link (press H) or the Wildness link (press W)! 🐾";
  }

  // --- Shorthand ---
  if (
    matchesAny(msg, [
      "shorthand",
      "abbreviation",
      "abbreviations",
      "man.md",
      "vocabulary",
      "short word",
    ])
  ) {
    var shResp = "here's the ct-web shorthand vocabulary from MAN.md! 🐱\n\n";
    var shKeys = Object.keys(SHORTHAND);
    for (var s = 0; s < shKeys.length; s++) {
      shResp += "• " + shKeys[s] + " → " + SHORTHAND[shKeys[s]] + "\n";
    }
    shResp +=
      "\ntotal: " + shKeys.length + " shorthands! Kep this man handy! 🐾";
    return shResp;
  }

  // --- Remember username ---
  if (matchesAny(msg, ["remember", "username", "remember me", "save name"])) {
    return 'ct-web has a "remember me" feature! 🐱 When you check the "remember me 🐾" checkbox on login, your username and email get saved to localStorage. Next time you visit, they\'re pre-filled! The checkboxes also auto-check so you can log in faster! 🐾';
  }

  // --- Thank you ---
  if (matchesAny(msg, ["thank", "thanks", "thx", "appreciate"])) {
    return "you're very welcome! 🐱 Happy to help you navigate the cat zone! 😼🐾";
  }

  // --- Goodbye ---
  if (
    matchesAny(msg, [
      "bye",
      "goodbye",
      "see you",
      "later",
      "cya",
      "farewell",
      "goodnight",
    ])
  ) {
    return "see you later, cat lover! 🐱 Come back anytime you need help with ct-web! 🐾";
  }

  // --- Help ---
  if (
    matchesAny(msg, [
      "help",
      "what can you do",
      "what do you know",
      "what do you talk about",
      "commands",
      "options",
    ])
  ) {
    return "I can help you with ct-web! 🐱 Try asking about:\n\n• project name / what is this\n• tech stack / built with\n• files / file structure\n• features / what can it do\n• login / how to log in\n• keyboard shortcuts\n• power commands / terminal\n• shorthand / vocabulary\n• specific files (ct.js, sound-ct.js, etc.)\n• cat facts\n• deployment\n• remember me\n\nno paskeys here — checkboxes are the gatekeeper! 😼🐾";
  }

  // --- Cat-related fun ---
  if (matchesAny(msg, ["meow", "purr", "kitty", "kitten", "miao"])) {
    return "meow! 🐱😺 I sense a fellow cat enthusiast! This is the ct-web project after all — everything here is cat-themed! Want to learn about the project? Just ask! 🐾";
  }

  // --- Fun / jokes ---
  if (
    matchesAny(msg, ["joke", "funny", "make me laugh", "tell me something"])
  ) {
    return "why did the cat sit on the computer? 🐱 Because it wanted to keep an eye on the mouse! 😼 But seriously, I only know about ct-web — want to hear about its features? 🐾";
  }
  // ?
  if (matchesAny(msg, ["do you know about the options"])) {
    return "hmm do you mean the option below the blue lines?";
  }
  // ANS
  if (matchesAny(msg, ["yes under the blue lines", "yes what are those"])) {
    return "yea so those, press it then choose something to press and then you will see some magic!";
  }
  // --- Default fallback ---
  return "I only know about the ct-web project! Ask me about its features, files, or how it works 🐱";
}

// --- Add message to chat box ---

function addInterTypeMessage(text, sender) {
  var chatBox = document.getElementById("interType-chat");
  if (!chatBox) return;

  var div = document.createElement("div");
  div.className = "interType-msg interType-" + sender;

  var p = document.createElement("p");
  p.textContent = text;
  div.appendChild(p);
  chatBox.appendChild(div);
  chatBox.scrollTop = chatBox.scrollHeight;
}

// --- Form submit handler (called from inline script in the view) ---

function handleInterTypeSubmit(e) {
  e.preventDefault();
  var input = document.getElementById("interType-input");
  var chatBox = document.getElementById("interType-chat");
  if (!input) return;

  var text = input.value.trim();
  if (!text) return;

  // Add user message
  addInterTypeMessage(text, "user");

  // Get bot response
  var response = interTypeRespond(text);

  // Add bot message
  addInterTypeMessage(response, "bot");

  // Clear and focus
  input.value = "";
  input.focus();
  if (chatBox) chatBox.scrollTop = chatBox.scrollHeight;
}
