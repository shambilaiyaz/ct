function showAlert() {
  alert("welcome to ct web");
}
// ===================================================================================
function playSound() {
  let screenreader = new Audio(
    "https://drive.proton.me/urls/KVD236APGW#cfGjbaEPEiVy",
  );
  screenreader.play();
}
// ===================================================================================
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
let imageUrls = {
  rope: "https://imgs.search.brave.com/MFR2dtplD4WReIGtOCbt0FSAQYT9WRp_ShFvOXDgTqA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMucGV4ZWxzLmNv/bS9waG90b3MvMTQw/NDU1NjIvcGV4ZWxz/LXBob3RvLTE0MDQ1/NTYyLmpwZWc_YXV0/bz1jb21wcmVzcyZj/cz10aW55c3JnYiZk/cHI9MSZ3PTUwMA",
  rat: "https://imgs.search.brave.com/PLUhgzPcx7WVbzLNawovn9FOUj7WUCMio3ScEGAi6Go/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvQkQz/MTY0LTAwMS9waG90/by9yYXQtY2xvc2Ut/dXAuanBnP3M9NjEy/eDYxMiZ3PTAmaz0y/MCZjPTlDQ1ZqbGV1/YnZ3VkhDOTFwTThH/MWtlbXY5QlF0d0Y5/bERzRGlBYXhYbm89",
  bird: "https://imgs.search.brave.com/BiBfMqLy9uy7SC8CoPMbDPxroOJCjF9neiXA-OXOMl0/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9hYmNi/aXJkcy5vcmcvd3At/Y29udGVudC91cGxv/YWRzLzIwMjUvMDcv/V2VzdGVybi1LaW5n/YmlyZF9TaGFyaWYt/VWRkaW5fTWFjYXVs/YXktTGlicmFyeS1h/dC10aGUtQ29ybmVs/bC1MYWItb2YtT3Ju/aXRob29neV9BbWVy/aWNhbi1CaXJkLUNv/bnNlcnZhbmN5LTMw/MHgzMDAud2VicA",
  laser:
    "https://imgs.search.brave.com/Jolxhuvom6OKqx550OndS1_-1NyNoHeotsqd-qACunY/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/dGhlc3BydWNlcGV0/cy5jb20vdGhtYi9N/SkdodXVrN3N0Y2hU/VjhjQkNHWkdtTDFi/Vnc9L2ZpdC1pbi8x/NTAweDEwMDAvZmls/dGVyczpub191cHNj/YWxlKCk6c3RyaXBf/aWNjKCk6Zm9ybWF0/KHdlYnApL3Vtb3Np/cy1hdXRvbWF0aWMt/Y2F0LWxhc2VyLXRv/eS1pbnRlcmFjdGl2/ZS1jYXQtdG95cy05/YWQxM2JlMWRkZTE0/ZGY1YjQwMTE3NjU1/NDNiMWE2MC5qcGc",
};
// ===================================================================================
function changeImage() {
  let select = document.getElementById("opti");
  let selectedValue = select.value;
  let img = document.getElementById("img_opti");

  if (imageUrls[selectedValue]) {
    img.src = imageUrls[selectedValue];
    img.alt = selectedValue + "{img}";
  }
}
