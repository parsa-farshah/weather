let $lightBtn = document.getElementById("lightBtn");
let $darkBtn = document.getElementById("darkBtn");
let $btnDarkLight = document.getElementById("btnDarkLight");
let $btnDarkLightWrapper = document.getElementById("btnDarkLightWrapper");
let $body = document.querySelector("body");

// loading
let $loading = document.querySelector("#loading");

// error search
let $errorSearch = document.querySelector("#errorSearch");

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
  $loading.classList.remove("hidden");
  $loading.classList.add("flex");
  let res = await fetch(url);
  if (res.ok) {
    $loading.classList.remove("flex");
    $loading.classList.add("hidden");
    let data = await res.json();
    return data;
  }
}

// select go to h3
let $cityName = document.querySelector("#cityName");
let $city = document.createElement("h3");
let $country = document.createElement("h3");

// search add to url word
let $search = document.querySelector("#search");
let $searchBtn = document.querySelector("#searchBtn");

let nameCitySearch = "tehran";

///////////////////////////////////////////////////// search button click
$searchBtn.addEventListener("click", () => {
  // reset when add new city
  $city.innerText = "";
  $country.innerText = "";
  // input value enter to api url

  // cant enter the number or script
  if ($search.value == "" || $search.value.search(/0-9/)) {
    $errorSearch.classList.remove("hidden");
    $errorSearch.classList.add("flex");
    setTimeout(() => {
      $errorSearch.classList.remove("flex");
      $errorSearch.classList.add("hidden");
    }, 3000);
  } else {
    nameCitySearch = $search.value;
    weatherApi();
    $search.value = "";
    $search.focus();
  }
});

function weatherApi() {
  asynAwait(
    `https://api.openweathermap.org/data/2.5/forecast?appid=14da3e989046810485f4fe023957b34b&q=${nameCitySearch}`
  ).then((result) => {
    // city add in document
    $city.innerText = "";
    $city.innerText = `${result.city.name}`;
    $city.classList.add("text-3xl", "font-black");
    $cityName.appendChild($city);

    // country add in document
    $country.innerText = `${result.city.country}`;
    $country.classList.add("text-lg", "mt-1.5", "font-black");
    $cityName.appendChild($country);
  });
}
weatherApi();

// https://api.weatherstack.com/current?access_key=7340fb13f2c32d5ab02d364f916ab6a2&query=tehran

// https://api.openweathermap.org/data/2.5/forecast?q=tehran&units=metric&appid=14da3e989046810485f4fe023957b34b
