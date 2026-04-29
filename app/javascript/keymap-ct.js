// KEYMAP — keyboard shortcuts for ct
// ===================================================================================
// | Key | Action                |
// |-----|-----------------------|
// | T   | Click "ton" button    |
// | V   | Click "read for me"   |
// | 1   | Select rope           |
// | 2   | Select rat            |
// | 3   | Select feather        |
// | 4   | Select laser          |
// | H   | Open cats history     |
// | W   | Open Wildness link    |
// | N   | Focus note input      |
// | ?   | Show keymap help      |
// ===================================================================================

function isTyping() {
  let tag = document.activeElement.tagName.toLowerCase();
  return tag === "input" || tag === "textarea" || tag === "select";
}

function showKeymap() {
  alert(
    "KEYMAP\n" +
      "========================\n" +
      "T  →  ton button\n" +
      "v  →  read for me\n" +
      "1  →  rope\n" +
      "2  →  rat\n" +
      "3  →  feather\n" +
      "4  →  laser\n" +
      "H  →  cats history link\n" +
      "W  →  Wildness link\n" +
      "N  →  focus note input\n" +
      "?  →  show this help\n" +
      "========================",
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
