function checkAccess() {
  let paskey = prompt(
    "hint: what are you looking for in my web, learning? (Y/N)",
  );
  if (paskey && paskey.trim() === "Yes") {
    document.getElementById("ful-page").style.display = "block";
  } else {
    alert(
      " 'error' if your looking for that, my web is useless for you! find some other web pages",
    );
    checkAccess();
  }
}
// ===================================================================================
function Login() {
  // show the login modal on page load
  document.getElementById("login-overlay").style.display = "flex";
}

function submitLogin() {
  let username = document.getElementById("login-user").value.trim();
  let paskey = document.getElementById("login-pass").value.trim();
  let errorEl = document.getElementById("login-error");

  if (!username) {
    errorEl.textContent = "plese enter your username!";
    return;
  }

  if (paskey === "Yes") {
    document.getElementById("login-overlay").style.display = "none";
    document.getElementById("ful-page").style.display = "block";
    document.getElementById("welcom").textContent =
      "learn about cat! " + username + "!";
    errorEl.textContent = "";
  } else {
    errorEl.textContent =
      "'error' if your looking for that, my web is useless for you! find some other web pages";
  }
}
