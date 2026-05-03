// KEYMAP — keyboard shortcuts for ct
// ===================================================================================
// | Key(s)        | Action                |
// |---------------|-----------------------|
// | Ctrl+Shift+T  | Click "ton" button    |
// | Ctrl+Shift+V  | Click "read for me"   |
// | Ctrl+Shift+1  | Select rope           |
// | Ctrl+Shift+2  | Select rat            |
// | Ctrl+Shift+3  | Select feather        |
// | Ctrl+Shift+4  | Select laser          |
// | Ctrl+Shift+H  | Open cats history     |
// | Ctrl+Shift+W  | Open Wildness link    |
// | Ctrl+Shift+N  | Focus note input      |
// | Ctrl+Shift+?  | Show keymap help      |
// ===================================================================================

function isTyping() {
  let tag = document.activeElement.tagName.toLowerCase();
  return tag === "input" || tag === "textarea" || tag === "select";
}

function showKeymap() {
  alert(
    "KEYMAP\n" +
      "================================\n" +
      "Ctrl+Shift+T  →  ton button\n" +
      "Ctrl+Shift+V  →  read for me\n" +
      "Ctrl+Shift+1  →  rope\n" +
      "Ctrl+Shift+2  →  rat\n" +
      "Ctrl+Shift+3  →  feather\n" +
      "Ctrl+Shift+4  →  laser\n" +
      "Ctrl+Shift+H  →  cats history link\n" +
      "Ctrl+Shift+W  →  Wildness link\n" +
      "Ctrl+Shift+N  →  focus note input\n" +
      "Ctrl+Shift+?  →  show this help\n" +
      "================================",
  );
}

function selectOption(value) {
  let select = document.getElementById("opti");
  if (!select) return;
  select.value = value;
  changeImage();
}

document.addEventListener("keydown", function (e) {
  let key = e.key.toLowerCase();

  // handle Enter for specific inputs first (before isTyping check)
  if (key === "enter") {
    let focused = document.activeElement;
    if (focused && focused.id === "login-user") {
      e.preventDefault();
      submitLogin();
      return;
    }
    if (focused && focused.id === "login-email") {
      e.preventDefault();
      submitLogin();
      return;
    }

    if (focused && focused.id === "power-input") {
      e.preventDefault();
      handlePowerCommand();
      return;
    }
    if (focused && focused.id === "interType-input") {
      e.preventDefault();
      document
        .getElementById("interType-form")
        .dispatchEvent(new Event("submit", { cancelable: true }));
      return;
    }
  }

  // don't trigger shortcuts while typing in the note input or a select
  if (isTyping()) return;

  // require Ctrl+Shift to trigger shortcuts
  if (!(e.ctrlKey && e.shiftKey)) return;

  switch (key) {
    case "t":
      e.preventDefault();
      showAlert1();
      break;

    case "v":
      e.preventDefault();
      playSound();
      break;

    case "1":
      e.preventDefault();
      selectOption("rope");
      break;

    case "2":
      e.preventDefault();
      selectOption("rat");
      break;

    case "3":
      e.preventDefault();
      selectOption("bird");
      break;

    case "4":
      e.preventDefault();
      selectOption("laser");
      break;

    case "h":
      e.preventDefault();
      document.getElementById("history").parentElement.click();
      break;

    case "w":
      e.preventDefault();
      document.getElementById("plant").parentElement.click();
      break;

    case "n":
      e.preventDefault();
      document.querySelector("#note input").focus();
      break;

    case "?":
      e.preventDefault();
      showKeymap();
      break;
  }
});
