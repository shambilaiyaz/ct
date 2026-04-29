// BOOTIN-CT — Button functions and bindings
// ===================================================================================
// All button click handlers and their event bindings live here.
// ===================================================================================

// --- Button actions ---

function showAlert1() {
  alert("welcome to ct web");
}

function showAlert2() {
  alert("click ? for help!");
}

// --- Button event bindings ---

document.addEventListener("DOMContentLoaded", function () {
  // ton button
  var tonBtn = document.getElementById("ton");
  if (tonBtn) {
    tonBtn.addEventListener("click", showAlert1);
  }

  // reader button
  var readerBtn = document.getElementById("reader");
  if (readerBtn) {
    readerBtn.addEventListener("click", playSound);
  }

  // opti select
  var optiSelect = document.getElementById("opti");
  if (optiSelect) {
    optiSelect.addEventListener("change", changeImage);
  }

  // help button
  var helpBtn = document.getElementById("help");
  if (helpBtn) {
    helpBtn.addEventListener("click", showAlert2);
  }

  // power-btn button
  var powerBtn = document.getElementById("power-btn");
  if (powerBtn) {
    powerBtn.addEventListener("click", handlePowerCommand);
  }

  // power-input Enter key
  var powerInput = document.getElementById("power-input");
  if (powerInput) {
    powerInput.addEventListener("keydown", function (e) {
      if (e.key === "Enter") {
        e.preventDefault();
        handlePowerCommand();
      }
    });
  }

  // login-btn click
  var loginBtn = document.getElementById("login-btn");
  if (loginBtn) {
    loginBtn.addEventListener("click", submitLogin);
  }

  // login inputs Enter key
  var loginUser = document.getElementById("login-user");
  if (loginUser) {
    loginUser.addEventListener("keydown", function (e) {
      if (e.key === "Enter") {
        e.preventDefault();
        submitLogin();
      }
    });
  }
});
