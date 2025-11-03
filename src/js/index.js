let $lightBtn = document.getElementById("lightBtn");
let $darkBtn = document.getElementById("darkBtn");
let $btnDarkLight = document.getElementById("btnDarkLight");
let $btnDarkLightWrapper = document.getElementById("btnDarkLightWrapper");
let $body = document.querySelector("body");

// location logo select
let $shadowBlack = document.querySelector("#shadowBlack");
let $locationBlack = document.querySelector("#locationBlack");
let $locationWhite = document.querySelector("#locationWhite");
let $shadowWhite = document.querySelector("#shadowWhite");

$btnDarkLight.addEventListener("click", () => {
  $btnDarkLightWrapper.classList.toggle("bg-[#ececec]");
  $btnDarkLightWrapper.classList.toggle("bg-[#222222f6]");

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

  //   logo city location color change
  $shadowBlack.classList.toggle("hidden");
  $locationBlack.classList.toggle("hidden");
  $locationWhite.classList.toggle("hidden");
  $locationWhite.classList.toggle("flex");
  $shadowWhite.classList.toggle("hidden");
  $shadowWhite.classList.toggle("flex");
});

async function asynAwait(url) {
  let res = await fetch(url);
  let data = await res.json();
  return data;
}

let $cityName = document.querySelector("#cityName");


function weatherApi() {
  asynAwait(
    "https://api.weatherstack.com/current?access_key=7340fb13f2c32d5ab02d364f916ab6a2&query=tehran"
  ).then((result) => {
    let $city = document.createElement("h3");
    let $country = document.createElement("h3");

    // city add in document
    $city.innerText = `${result.location.name}`;
    $city.classList.add("text-3xl", "font-black");
    $cityName.appendChild($city);

    // country add in document
    $country.innerText = `${result.location.country}`;
    $country.classList.add("text-lg", "mt-1.5", "font-black");
    $cityName.appendChild($country);
  });
}
weatherApi();
