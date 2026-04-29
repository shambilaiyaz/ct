// CHECK_BOX-CT — Checkbox and login logic
// ===================================================================================
// Handles:
//   cat-learn-check  → must be checked to enable login button
//   done-check       → must be checked to enable login button
//   remember-check   → saves/loads username from localStorage
//   submitLogin      → validates and redirects on success
// ===================================================================================

// Check if all required checkboxes are checked
function isCatLearnChecked() {
  var checkbox = document.getElementById("cat-learn-check");
  return checkbox && checkbox.checked;
}

function isDoneChecked() {
  var checkbox = document.getElementById("done-check");
  return checkbox && checkbox.checked;
}

function allRequiredChecked() {
  return isCatLearnChecked() && isDoneChecked();
}

// Save or remove remembered username and email on login
function handleRemember(username, email) {
  var rememberCheck = document.getElementById("remember-check");
  if (rememberCheck && rememberCheck.checked) {
    localStorage.setItem("ct_remember_username", username);
    if (email) localStorage.setItem("ct_remember_email", email);
  } else {
    localStorage.removeItem("ct_remember_username");
    localStorage.removeItem("ct_remember_email");
  }
}

// Submit login form
function submitLogin() {
  var username = document.getElementById("login-user").value.trim();
  var email = document.getElementById("login-email")
    ? document.getElementById("login-email").value.trim()
    : "";
  var errorEl = document.getElementById("login-error");

  if (!username) {
    errorEl.textContent = "plese enter your username!";
    return;
  }

  if (!email) {
    errorEl.textContent = "plese enter your email!";
    return;
  }

  if (!isCatLearnChecked()) {
    errorEl.textContent = "are you here to learn about cats? check the box!";
    return;
  }

  if (!isDoneChecked()) {
    errorEl.textContent = "mark done to enter the cat zone!";
    return;
  }

  sessionStorage.setItem("ct_username", username);
  sessionStorage.setItem("ct_email", email);
  handleRemember(username, email);
  // Save email to database via AJAX (see data-ct.js)
  saveEmailFromLogin(email, username);
  window.location.href = "/index";
}

// saveEmailToDb moved to data-ct.js — now called saveEmailFromLogin()

// Bind checkbox listeners and fill remembered username after DOM is ready
document.addEventListener("DOMContentLoaded", function () {
  // Enable/disable login button based on required checkboxes
  var catLearnCheck = document.getElementById("cat-learn-check");
  var doneCheck = document.getElementById("done-check");
  var loginBtn = document.getElementById("login-btn");

  function updateLoginButton() {
    if (loginBtn) {
      loginBtn.disabled = !allRequiredChecked();
    }
  }

  if (catLearnCheck) {
    catLearnCheck.addEventListener("change", updateLoginButton);
  }
  if (doneCheck) {
    doneCheck.addEventListener("change", updateLoginButton);
  }

  // Bind login button click
  if (loginBtn) {
    loginBtn.addEventListener("click", submitLogin);
  }

  // Bind Enter key on login inputs
  var loginUser = document.getElementById("login-user");
  if (loginUser) {
    loginUser.addEventListener("keydown", function (e) {
      if (e.key === "Enter") {
        e.preventDefault();
        submitLogin();
      }
    });
  }

  // Fill in remembered username and email on page load
  var savedName = localStorage.getItem("ct_remember_username");
  var savedEmail = localStorage.getItem("ct_remember_email");
  if (savedName) {
    var userInput = document.getElementById("login-user");
    var rememberCheck = document.getElementById("remember-check");
    if (userInput) {
      userInput.value = savedName;
    }
    if (rememberCheck) {
      rememberCheck.checked = true;
    }
    if (catLearnCheck) {
      catLearnCheck.checked = true;
    }
    // Enable login button only if both required checkboxes are checked
    updateLoginButton();
  }
  if (savedEmail) {
    var emailInput = document.getElementById("login-email");
    if (emailInput) {
      emailInput.value = savedEmail;
    }
  }

  // Show the login overlay on page load
  var loginOverlay = document.getElementById("login-overlay");
  if (loginOverlay) {
    loginOverlay.style.display = "flex";
  }
});
