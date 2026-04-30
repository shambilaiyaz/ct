// EMAIL-CT — Email form handler
// ===================================================================================
// Handles email signup form submission via fetch (stays on page, no redirect).
// Requires: #email-input, #email-msg, #email-username, .email-form, .email-submit-btn
// ===================================================================================

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

    // Get CSRF token from meta tag
    var csrfToken = document.querySelector('meta[name="csrf-token"]');
    var csrfParam = document.querySelector('meta[name="csrf-param"]');
    var headers = {
      "X-Requested-With": "XMLHttpRequest",
      Accept: "application/json",
    };
    if (csrfToken) {
      headers["X-CSRF-Token"] = csrfToken.getAttribute("content");
    }
    // Also add CSRF param to formData if missing
    if (csrfParam && csrfToken) {
      var paramName = csrfParam.getAttribute("content");
      if (!formData.has(paramName)) {
        formData.append(paramName, csrfToken.getAttribute("content"));
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
      .catch(function (err) {
        emailMsg.textContent = "network error, try again";
        emailMsg.className = "email-alert";
        submitBtn.disabled = false;
        submitBtn.textContent = "save 🐾";
      });
  });
}

function fillEmailUsername(username) {
  var emailUsername = document.getElementById("email-username");
  if (emailUsername && username) {
    emailUsername.value = username;
  }
}

document.addEventListener("DOMContentLoaded", function () {
  initEmailForm();
});
