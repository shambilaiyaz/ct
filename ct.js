function showAlert() {
  alert("welcome to ct web");
}
function playSound() {
  let screenreader = new Audio(
    "https://drive.proton.me/urls/KVD236APGW#cfGjbaEPEiVy",
  );
  screenreader.play();
}
function checkAccess() {
  let paskey = prompt("hint: what are you looking for in my web");
  if (paskey && paskey.trim() === "cat learning") {
    document.getElementById("ful page").style.display = "block";
  } else {
    alert(
      " 'error' if your looking for that, my web is useless for you! find some other web pages",
    );
    checkAccess();
  }
}
