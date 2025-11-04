let $lightBtn = document.getElementById("lightBtn");
let $darkBtn = document.getElementById("darkBtn");
let $btnDarkLight = document.getElementById("btnDarkLight");
let $btnDarkLightWrapper = document.getElementById("btnDarkLightWrapper");
let $body = document.querySelector("body");

// loading
let $loading = document.querySelector("#loading");

// error search
let $errorSearch = document.querySelector("#errorSearch");

// error city not found
let $errorCity = document.querySelector("#errorCity");

// location logo select
let $shadowBlack = document.querySelector("#shadowBlack");
let $locationBlack = document.querySelector("#locationBlack");
let $locationWhite = document.querySelector("#locationWhite");
let $shadowWhite = document.querySelector("#shadowWhite");

// dark light theme
let $updatingDot = document.querySelector("#updatingDot");

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

  // updating change color dot
  $updatingDot.classList.toggle("bg-black");
  $updatingDot.classList.toggle("bg-white");
  // search change color dark and light
  $searchBtn.classList.toggle("bg-[#ececec]");
  $searchBtn.classList.toggle("bg-[#222222f6]");

  $search.classList.toggle("placeholder:text-white");
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

  if ($search.value == "" || $search.value.search(/0-9/) !== -1) {
    $errorSearch.classList.remove("hidden");
    $errorSearch.classList.add("flex");
    setTimeout(() => {
      $errorSearch.classList.remove("flex");
      $errorSearch.classList.add("hidden");
    }, 3000);
    weatherApi();
    $search.value = "";
    $search.focus();
  } else {
    nameCitySearch = $search.value;
    weatherApi();
    $search.value = "";
    $search.focus();
  }
});

function weatherApi() {
  asynAwait(
    `https://api.openweathermap.org/data/2.5/forecast?appid=14da3e989046810485f4fe023957b34b&q=${nameCitySearch}&units=metric`
  ).then((result) => {
    // error city is not found
    if (result == undefined) {
      $errorCity.classList.remove("hidden");
      $errorCity.classList.add("flex");

      setTimeout(() => {
        $errorCity.classList.remove("flex");
        $errorCity.classList.add("hidden");
      }, 2500);

      nameCitySearch = "tehran";
      weatherApi();
      return;
    }

    // city add in document
    $city.innerText = "";
    $city.innerText = `${result.city.name}`;
    $city.classList.add("text-xl", "md:text-3xl", "font-black");
    $cityName.appendChild($city);

    // country add in document
    $country.innerText = `${result.city.country}`;
    $country.classList.add("text-sm", "mt-1.5", "font-black", "md:text-lg");
    $cityName.appendChild($country);

    // wheater main
    let $weatherMain = document.querySelector("#weatherMain");
    let $weatherMainval = result.list[0].weather[0].description;

    $weatherMain.innerText = $weatherMainval;

    // main temp
    let $mainTempHtml = document.querySelector("#mainTemp");
    let $mainTemp = Math.round(result.list[0].main.temp) + "°";
    $mainTempHtml.innerText = $mainTemp;

    // feels Like
    let $feelsLike = document.querySelector("#feelsLike");
    let $feelsLikeVal =
      "Feels Like " + Math.round(result.list[0].main.feels_like) + "°";
    $feelsLike.innerText = $feelsLikeVal;

    // temp max min
    let $tempMaxMin = document.querySelector("#tempMaxMin");
    console.log(result);
    let $tempMin = Math.round(result.list[0].main.temp_min) + "°";
    let $tempMax = Math.round(result.list[0].main.temp_max) + "°";

    let $tempMaxMinVal = ` ${$tempMax}/${$tempMin}`;
    $tempMaxMin.innerText = $tempMaxMinVal;

    // icons for change weather image
    let $weatherIcon = result.list[0].weather[0].icon;
    let $iconCurrent = document.querySelector("#iconCurrent");

    function changeIcon(src) {
      $iconCurrent.setAttribute("src", src);
    }

    let $src = "";

    switch ($weatherIcon) {
      case "01d":
        $src = "src/icons/800.png";
        break;
      case "01n":
        $src = "src/icons/01n.png";
        break;

      case "02d":
        $src = "src/icons/02d.png";
        break;
      case "02n":
        $src = "src/icons/02n.png";
        break;
      case "03d":
        $src = "src/icons/801.png";
        break;
      case "03n":
        $src = "src/icons/801.png";
        break;
      case "04d":
        $src = "src/icons/04.png";
        break;
      case "04n":
        $src = "src/icons/04.png";
        break;
      case "09d":
        $src = "src/icons/301.png";
        break;
      case "09n":
        $src = "src/icons/301.png";
        break;
      case "10d":
        $src = "src/icons/10d.png";
        break;
      case "10n":
        $src = "src/icons/10n.png";
        break;
      case "11d":
        $src = "src/icons/202.png";
        break;
      case "11n":
        $src = "src/icons/202.png";
        break;
      case "13d":
        $src = "src/icons/600.png";
        break;
      case "13n":
        $src = "src/icons/600.png";
        break;
      case "50d":
        $src = "src/icons/65.png";
        break;
      case "50n":
        $src = "src/icons/65.png";
        break;
      default:
        break;
    }
    changeIcon($src);

    // visibility
    let $visibility = document.querySelector("#visibility");
    let $visibilityVal = result.list[0].visibility / 1000 + " km";
    $visibility.innerText = $visibilityVal;

    // humidity
    let $humidity = document.querySelector("#humidity");
    let $humidityVal = result.list[0].main.humidity + "%";
    $humidity.innerText = $humidityVal;

    // wind Speed
    let $windSpeed = document.querySelector("#windSpeed");
    let $windSpeedVal = result.list[0].wind.speed * 3.6;
    $windSpeed.innerText = Math.round($windSpeedVal) + " km/h";
  });
}
weatherApi();

// add date
let $currentDateWrapper = document.querySelector("#currentDateWrapper");
let $date = new Date();
let $currentDate = `${
  $date.getMonth() + 1
}/${$date.getDate()}/${$date.getFullYear()}`;

$currentDateWrapper.innerText = $currentDate;

// https://api.weatherstack.com/current?access_key=7340fb13f2c32d5ab02d364f916ab6a2&query=tehran

// https://api.openweathermap.org/data/2.5/forecast?q=tehran&units=metric&appid=14da3e989046810485f4fe023957b34b
