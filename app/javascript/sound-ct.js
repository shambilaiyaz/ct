// SOUND-CT — Text-to-speech reader
// ===================================================================================

function playSound() {
  if (!window.speechSynthesis) {
    alert("Sorry, your browser does not support reading aloud!");
    return;
  }
  if (speechSynthesis.speaking) {
    speechSynthesis.cancel();
    document.getElementById("reader").textContent = "read for me";
    return;
  }
  let container = document.getElementById("ful-page");
  let pageText = container.innerText;
  // Collect alt text from all images so screenreader describes them too
  let images = container.querySelectorAll("img[alt]");
  for (let i = 0; i < images.length; i++) {
    let alt = images[i].getAttribute("alt").trim();
    if (alt) {
      pageText += ". " + alt + ".";
    }
  }
  let utterance = new SpeechSynthesisUtterance(pageText);
  let voices = speechSynthesis.getVoices();
  if (voices.length === 0) {
    speechSynthesis.addEventListener(
      "voiceschanged",
      function handler() {
        speechSynthesis.removeEventListener("voiceschanged", handler);
        utterance.voice = speechSynthesis.getVoices()[0];
        speechSynthesis.speak(utterance);
      },
      { once: true },
    );
  } else {
    utterance.voice = voices[0];
    speechSynthesis.speak(utterance);
  }
  utterance.onend = function () {
    document.getElementById("reader").textContent = "read for me";
  };
  document.getElementById("reader").textContent = "stop reading";
}
