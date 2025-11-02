let $lightBtn = document.getElementById("lightBtn");
let $darkBtn = document.getElementById("darkBtn");
let $btnDarkLight = document.getElementById("btnDarkLight");
let $btnDarkLightWrapper = document.getElementById("btnDarkLightWrapper");
let $body = document.querySelector("body");

$btnDarkLight.addEventListener("click", () => {
  $btnDarkLightWrapper.classList.toggle("bg-black/60");

  $btnDarkLight.classList.toggle("left-[78%]");
  $btnDarkLight.classList.toggle("left-[22%]");
  $btnDarkLight.classList.toggle("bg-white");
  $btnDarkLight.classList.toggle("bg-black");

  $lightBtn.classList.toggle("hidden");
  $lightBtn.classList.toggle("flex");
  $darkBtn.classList.toggle("hidden");
  $darkBtn.classList.toggle("flex");

  //   body
  $body.classList.toggle("bg-black");
  $body.classList.toggle("text-white");
//   $body.classList.toggle("bg-white");
});
