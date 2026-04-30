// DATA-CT — Data handling and email save
// ===================================================================================
// Handles saving emails to SQLite via fetch, CSRF token management,
// and any future data operations for ct-web.
// Extracted from check_box-ct.js (saveEmailToDb) and email-ct.js (form handler).
// ===================================================================================

// --- Get CSRF token from meta tag ---

function getCsrfToken() {
  var meta = document.querySelector('meta[name="csrf-token"]');
  return meta ? meta.getAttribute("content") : null;
}

// --- Save email to SQLite via the user_emails endpoint ---

function saveEmailToDb(email, username) {
  var csrfToken = getCsrfToken();
  var headers = {
    "X-Requested-With": "XMLHttpRequest",
    "Content-Type": "application/json",
    Accept: "application/json",
  };
  if (csrfToken) {
    headers["X-CSRF-Token"] = csrfToken;
  }

  return fetch("/user_emails", {
    method: "POST",
    headers: headers,
    credentials: "same-origin",
    body: JSON.stringify({
      user_email: { email: email, username: username },
    }),
  })
    .then(function (res) {
      if (!res.ok) {
        return res.json().catch(function () {
          return { errors: ["server error: " + res.status] };
        });
      }
      return res.json();
    })
    .catch(function () {
      return { errors: ["network error, try again"] };
    });
}

// --- Save email from login page (called by check_box-ct.js) ---

function saveEmailFromLogin(email, username) {
  saveEmailToDb(email, username).catch(function () {
    // silently fail — email save is non-critical
  });
}

// --- Handle email form submission via fetch (stays on page, no redirect) ---

function initEmailForm() {
  var emailForm = document.querySelector(".email-form");
  if (!emailForm) return;

  emailForm.addEventListener("submit", function (e) {
    e.preventDefault();
    var emailInput = document.getElementById("email-input");
    var emailMsg = document.getElementById("email-msg");
    var submitBtn = emailForm.querySelector(".email-submit-btn");
    var formData = new FormData(emailForm);

    submitBtn.disabled = true;
    submitBtn.textContent = "sving...";
    emailMsg.textContent = "";
    emailMsg.className = "";

    // Get CSRF token
    var csrfToken = getCsrfToken();
    var headers = {
      "X-Requested-With": "XMLHttpRequest",
      Accept: "application/json",
    };
    if (csrfToken) {
      headers["X-CSRF-Token"] = csrfToken;
    }
    // Also add CSRF param to formData if missing
    var csrfParam = document.querySelector('meta[name="csrf-param"]');
    if (csrfParam && csrfToken) {
      var paramName = csrfParam.getAttribute("content");
      if (!formData.has(paramName)) {
        formData.append(paramName, csrfToken);
      }
    }

    fetch(emailForm.action, {
      method: "POST",
      body: formData,
      headers: headers,
      credentials: "same-origin",
    })
      .then(function (res) {
        if (!res.ok) {
          return res.json().catch(function () {
            return { errors: ["server error: " + res.status] };
          });
        }
        return res.json();
      })
      .then(function (data) {
        if (data.message) {
          emailMsg.textContent = "🐾 email saved! thanks!";
          emailMsg.className = "email-notice";
          emailInput.value = "";
        } else if (data.errors) {
          emailMsg.textContent = data.errors[0] || "something went wrong";
          emailMsg.className = "email-alert";
        }
        submitBtn.disabled = false;
        submitBtn.textContent = "save 🐾";
      })
      .catch(function () {
        emailMsg.textContent = "network error, try again";
        emailMsg.className = "email-alert";
        submitBtn.disabled = false;
        submitBtn.textContent = "save 🐾";
      });
  });
}

// --- Fill hidden email-username field ---

function fillEmailUsername(username) {
  var emailUsername = document.getElementById("email-username");
  if (emailUsername && username) {
    emailUsername.value = username;
  }
}

// --- Init on DOM ready ---

document.addEventListener("DOMContentLoaded", function () {
  initEmailForm();
});
