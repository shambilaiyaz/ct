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
  var paskey = document.getElementById("login-pass").value.trim();
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

  if (paskey === "Yes") {
    sessionStorage.setItem("ct_username", username);
    sessionStorage.setItem("ct_email", email);
    handleRemember(username, email);
    // Save email to database via AJAX
    saveEmailToDb(email, username);
    window.location.href = "/index";
  } else {
    errorEl.textContent =
      "are you here to learn about cats? type Yes to enter!";
  }
}

// Save email to SQLite via the user_emails endpoint
function saveEmailToDb(email, username) {
  var csrfToken = document.querySelector('meta[name="csrf-token"]');
  var headers = {
    "X-Requested-With": "XMLHttpRequest",
    Accept: "application/json",
  };
  if (csrfToken) {
    headers["X-CSRF-Token"] = csrfToken.getAttribute("content");
  }
  fetch("/user_emails", {
    method: "POST",
    headers: headers,
    credentials: "same-origin",
    body: JSON.stringify({ user_email: { email: email, username: username } }),
  }).catch(function () {
    // silently fail — email save is non-critical
  });
}

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
  var loginPass = document.getElementById("login-pass");
  if (loginPass) {
    loginPass.addEventListener("keydown", function (e) {
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
