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

let $updatingDot = document.querySelector("#updatingDot");
/////////////////////////// dark light theme
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

  // visibilty section
  let $visibiltiesWrapper = document.querySelector("#visibiltiesWrapper");
  $visibiltiesWrapper.classList.toggle("bg-[#FFFFFF]");
  $visibiltiesWrapper.classList.toggle("shadow-black");
  $visibiltiesWrapper.classList.toggle("md:shadow-black/40");
  $visibiltiesWrapper.classList.toggle("shadow-white/15");
  $visibiltiesWrapper.classList.toggle("md:shadow-[#FFFEFE]/10");
  $visibiltiesWrapper.classList.toggle("bg-[#FFFEFE]/6");

  // WeatherNow hours

  let $WeatherNow = document.querySelectorAll(".WeatherNow");
  $WeatherNow.forEach((item) => {
    item.classList.toggle("bg-[#00000066]/80");
    item.classList.toggle("border-[#00000066]/40");
    item.classList.toggle("shadow-[#FFFFFF40]/25");
    item.classList.toggle("border-[#FFFFFF33]/50");
    item.classList.toggle("shadow-[#FFFFFF40]/25");
    item.classList.toggle("bg-[#FFFFFF33]/80");
  });

  let $arrowNxt4day = document.querySelector("#arrowNxt4day");
  let arrowNxt4dayAtt = $arrowNxt4day.getAttribute("stroke");
  if (arrowNxt4dayAtt == "black") {
    $arrowNxt4day.setAttribute("stroke", "white");
  } else {
    $arrowNxt4day.setAttribute("stroke", "black");
  }

  // navbar
  let $nav = document.querySelector("#nav");

  let $navUl = document.querySelector("#navUl");
  let $navLi = document.querySelectorAll("#navUl>li>a>svg");

  $nav.classList.toggle("bg-[#FFFFFF]");
  $nav.classList.toggle("shadow-black");
  $nav.classList.toggle("md:shadow-black/40");
  $nav.classList.toggle("bg-[#FFFEFE]/6");
  $nav.classList.toggle("shadow-white/20");
  $nav.classList.toggle("md:shadow-white/15");

  $navUl.classList.toggle("*:bg-[#000000]/20");
  $navUl.classList.toggle("*:bg-[#FFFEFE]/40");

  // icons white
  $navLi.forEach((val) => {
    let $color = val.getAttribute("stroke", "#ffff");
    console.log($color);

    if ($color == "#000000") {
      val.setAttribute("stroke", "#ffff");
    }
    if ($color == "#ffff") {
      val.setAttribute("stroke", "#000000");
    }
  });
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

let $daysWrapper = document.querySelector("#daysWrapper");

let $forecat5day = document.querySelector("#forecat5day");

///////////////////////////////////////////////////// search button click
$searchBtn.addEventListener("click", () => {
  // reseting
  $forecat5day.innerHTML = "";
  $daysWrapper.innerHTML = "";
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

    // add date
    let $currentDateWrapper = document.querySelector("#currentDateWrapper");
    let $date = new Date();
    let $currentDate = `${
      $date.getMonth() + 1
    }/${$date.getDate()}/${$date.getFullYear()}`;

    $currentDateWrapper.innerText = $currentDate;

    //////////////////////////////////// data for today other hour weather
    let todayHour = $date.getHours();
    let day = 0;
    if ($date.getDate() < 10) {
      day = "0" + $date.getDate();
    } else {
      day = $date.getDate();
    }

    let $todayDate = `${$date.getFullYear()}-${$date.getMonth() + 1}-${day}`;

    let $lists = result.list;
    $lists.map((item) => {
      // console.log(item);

      let getTimesDtText = item.dt_txt.slice(11, 13);
      let getFullDate = item.dt_txt.slice(0, 10);
      // console.log(getTimesDtText);
      // console.log(getFullDate);
      // console.log($todayDate);
      // if (getFullDate == $todayDate && getTimesDtText == "12") {
      // }

      if (getFullDate == $todayDate) {
        // add icon for 12pm
        let $weatherIcon12 = item.weather[0].icon;
        let $src12 = "";

        switch ($weatherIcon12) {
          case "01d":
            $src12 = "src/icons/800.png";
            break;
          case "01n":
            $src12 = "src/icons/01n.png";
            break;

          case "02d":
            $src12 = "src/icons/02d.png";
            break;
          case "02n":
            $src12 = "src/icons/02n.png";
            break;
          case "03d":
            $src12 = "src/icons/801.png";
            break;
          case "03n":
            $src12 = "src/icons/801.png";
            break;
          case "04d":
            $src12 = "src/icons/04.png";
            break;
          case "04n":
            $src12 = "src/icons/04.png";
            break;
          case "09d":
            $src12 = "src/icons/301.png";
            break;
          case "09n":
            $src12 = "src/icons/301.png";
            break;
          case "10d":
            $src12 = "src/icons/10d.png";
            break;
          case "10n":
            $src12 = "src/icons/10n.png";
            break;
          case "11d":
            $src12 = "src/icons/202.png";
            break;
          case "11n":
            $src12 = "src/icons/202.png";
            break;
          case "13d":
            $src12 = "src/icons/600.png";
            break;
          case "13n":
            $src12 = "src/icons/600.png";
            break;
          case "50d":
            $src12 = "src/icons/65.png";
            break;
          case "50n":
            $src12 = "src/icons/65.png";
            break;
          default:
            console.log("error");

            break;
        }

        // let $twelvePm = document.querySelector("#twelvePm");

        // add temp 12 pm
        // let $temp12Pm = document.querySelector("#temp12Pm");
        $temp12Pm = Math.round(item.main.temp) + "°";

        if (getTimesDtText > 12) {
          getTimesDtText = getTimesDtText + " PM";
        } else {
          getTimesDtText = getTimesDtText + " AM";
        }

        $daysWrapper.innerHTML += `<div 
  class="WeatherNow w-[20%] md:w-[70px] h-[146px] bg-[#00000066]/80 border border-[#00000066]/40 shadow-[#FFFFFF40]/25 shadow-2xl rounded-[30px] flex flex-col py-4"
>
  <h3 class="font-semibold text-[15px] text-center text-[#FFFFFF]">${getTimesDtText}</h3>
  <img  class="w-[80%] h-[50px] mx-auto mt-3" src="${$src12}" alt="" />
  <h5
    
    class="font-semibold text-[15px] text-center text-[#FFFFFF] mt-3"
  >
  ${$temp12Pm}</h5>
</div>`;
      }
    });

    // btn 5day forecast
    // hidden others
    let $fiveDayBtn = document.querySelector("#fiveDayBtn");
    let $sectionWeatherCurrent = document.querySelector(
      "#sectionWeatherCurrent"
    );

    //////////////////////////// click on 5 days
    $fiveDayBtn.addEventListener("click", () => {
      $sectionWeatherCurrent.classList.add("hidden");
      // add section
      $forecat5day.classList.remove("hidden");
      $forecat5day.classList.add("flex");
    });

    // tommorow
    let tempMaxTommorow = 0;
    let tempminTommorow = 0;
    let getFullDateTommorow = "";
    let tommorowTxt = "";
    let tommorowCurrent = "";
    let tommorowIcon = "";
    let $srcTomorrow = "";

    let tempMaxArr = [];
    let tempMinArr = [];

    $lists.map((item) => {
      // tommorow
      let $dayTommorow = 0;
      $dayTommorow = $date.getDate();
      $dayTommorow = parseInt($dayTommorow);
      $dayTommorow = $dayTommorow + 1;
      $dayTommorow.toString();

      if ($date.getDate() < 10) {
        $dayTommorow = "0" + $dayTommorow;
      } else {
        $dayTommorow = $dayTommorow;
      }

      let getTimesDtText = item.dt_txt.slice(11, 13);
      let getFullDate = item.dt_txt.slice(0, 10);

      let $tommorowDate = `${$date.getFullYear()}-${
        $date.getMonth() + 1
      }-${$dayTommorow}`;

      let $tommorowDateTxt = `${$date.getFullYear()}/${
        $date.getMonth() + 1
      }/${$dayTommorow}`;

      if (getFullDate == $tommorowDate) {
        tempMaxArr.push(item.main.temp_max);
        tempMinArr.push(item.main.temp_min);

        // tempMaxTommorow = Math.round(item.main.temp_max) + "°";
        // tempminTommorow = Math.round(item.main.temp_min) + "°";
        getFullDateTommorow = $tommorowDateTxt;
        tommorowTxt = "Tomorrow";
        tommorowCurrent = item.weather[0].description;
        tommorowIcon = item.weather[0].icon;

        // icon
        let $weatherIconTomorrow = item.weather[0].icon;

        switch ($weatherIconTomorrow) {
          case "01d":
            $srcTomorrow = "src/icons/800.png";
            break;
          case "01n":
            $srcTomorrow = "src/icons/01n.png";
            break;

          case "02d":
            $srcTomorrow = "src/icons/02d.png";
            break;
          case "02n":
            $srcTomorrow = "src/icons/02n.png";
            break;
          case "03d":
            $srcTomorrow = "src/icons/801.png";
            break;
          case "03n":
            $srcTomorrow = "src/icons/801.png";
            break;
          case "04d":
            $srcTomorrow = "src/icons/04.png";
            break;
          case "04n":
            $srcTomorrow = "src/icons/04.png";
            break;
          case "09d":
            $srcTomorrow = "src/icons/301.png";
            break;
          case "09n":
            $srcTomorrow = "src/icons/301.png";
            break;
          case "10d":
            $srcTomorrow = "src/icons/10d.png";
            break;
          case "10n":
            $srcTomorrow = "src/icons/10n.png";
            break;
          case "11d":
            $srcTomorrow = "src/icons/202.png";
            break;
          case "11n":
            $srcTomorrow = "src/icons/202.png";
            break;
          case "13d":
            $srcTomorrow = "src/icons/600.png";
            break;
          case "13n":
            $srcTomorrow = "src/icons/600.png";
            break;
          case "50d":
            $srcTomorrow = "src/icons/65.png";
            break;
          case "50n":
            $srcTomorrow = "src/icons/65.png";
            break;
          default:
            console.log("error");

            break;
        }
      }

      if (tempMaxArr.length > 0 && tempMinArr.length > 0) {
        tempMaxTommorow = Math.round(Math.max(...tempMaxArr)) + "°";
        tempminTommorow = Math.round(Math.min(...tempMinArr)) + "°";
      }
    });

    $forecat5day.innerHTML += `
        <div class="h-[100px] w-full border border-[#3d3d3d] relative md:h-[200px] bg-gradient-to-r from-[#7B7883] rounded-[29px] to-black mx-auto mt-0 md:mt-6 px-[5%] flex justify-between items-center duration-700">
        <div class="flex gap-3">
          <img class="w-[100px] h-[100px] md:w-[200px] md:h-[180px]" src="${$srcTomorrow}"/>
          <div class="pt-3 md:pt-11">
            <h2 class="font-semibold text-lg md:text-2xl text-white">${tommorowTxt}</h2>
            <h3 class="font-semibold text-sm md:text-[16px] text-white">${getFullDateTommorow}</h3>
            <h3 class="font-semibold text-sm md:text-[16px] text-white">${tempMaxTommorow}/${tempminTommorow}</h3>
          </div>
        </div>
        <h5  class="font-extrabold text-sm  text-white capitalize md:text-2xl">${tommorowCurrent}</h5>
        </div>`;

    //////////////////////////////////////// end tomorrow

    //////////////////////////////////// Day after tomorrow

    let tempMaxTommorowA = 0;
    let tempminTommorowA = 0;
    let getFullDateTommorowA = "";
    let tommorowTxtA = "";
    let tommorowCurrentA = "";
    let tommorowIconA = "";
    let $srcTomorrowA = "";

    let tempMaxArrA = [];
    let tempMinArrA = [];

    $lists.map((item) => {
      // tommorow
      let $dayTommorowA = 0;
      $dayTommorowA = $date.getDate();
      $dayTommorowA = parseInt($dayTommorowA);
      $dayTommorowA = $dayTommorowA + 2;
      $dayTommorowA.toString();

      if ($date.getDate() < 10) {
        $dayTommorowA = "0" + $dayTommorowA;
      } else {
        $dayTommorowA = $dayTommorowA;
      }

      let getTimesDtTextA = item.dt_txt.slice(11, 13);
      let getFullDateA = item.dt_txt.slice(0, 10);

      let $tommorowDateA = `${$date.getFullYear()}-${
        $date.getMonth() + 1
      }-${$dayTommorowA}`;

      let $tommorowDateTxtA = `${$date.getFullYear()}/${
        $date.getMonth() + 1
      }/${$dayTommorowA}`;

      if (getFullDateA == $tommorowDateA) {
        tempMaxArrA.push(item.main.temp_max);
        tempMinArrA.push(item.main.temp_min);

        // tempMaxTommorow = Math.round(item.main.temp_max) + "°";
        // tempminTommorow = Math.round(item.main.temp_min) + "°";
        getFullDateTommorowA = $tommorowDateTxtA;
        tommorowTxtA = "In Two Days";
        tommorowCurrentA = item.weather[0].description;
        tommorowIconA = item.weather[0].icon;

        // icon
        let $weatherIconTomorrowA = item.weather[0].icon;

        switch ($weatherIconTomorrowA) {
          case "01d":
            $srcTomorrowA = "src/icons/800.png";
            break;
          case "01n":
            $srcTomorrowA = "src/icons/01n.png";
            break;

          case "02d":
            $srcTomorrowA = "src/icons/02d.png";
            break;
          case "02n":
            $srcTomorrowA = "src/icons/02n.png";
            break;
          case "03d":
            $srcTomorrowA = "src/icons/801.png";
            break;
          case "03n":
            $srcTomorrowA = "src/icons/801.png";
            break;
          case "04d":
            $srcTomorrowA = "src/icons/04.png";
            break;
          case "04n":
            $srcTomorrowA = "src/icons/04.png";
            break;
          case "09d":
            $srcTomorrowA = "src/icons/301.png";
            break;
          case "09n":
            $srcTomorrowA = "src/icons/301.png";
            break;
          case "10d":
            $srcTomorrowA = "src/icons/10d.png";
            break;
          case "10n":
            $srcTomorrowA = "src/icons/10n.png";
            break;
          case "11d":
            $srcTomorrowA = "src/icons/202.png";
            break;
          case "11n":
            $srcTomorrowA = "src/icons/202.png";
            break;
          case "13d":
            $srcTomorrowA = "src/icons/600.png";
            break;
          case "13n":
            $srcTomorrowA = "src/icons/600.png";
            break;
          case "50d":
            $srcTomorrowA = "src/icons/65.png";
            break;
          case "50n":
            $srcTomorrowA = "src/icons/65.png";
            break;
          default:
            console.log("error");

            break;
        }
      }

      if (tempMaxArrA.length > 0 && tempMinArrA.length > 0) {
        tempMaxTommorowA = Math.round(Math.max(...tempMaxArrA)) + "°";
        tempminTommorowA = Math.round(Math.min(...tempMinArrA)) + "°";
      }
    });

    $forecat5day.innerHTML += `
        <div class="h-[100px] w-full border border-[#3d3d3d] relative md:h-[200px] bg-gradient-to-r from-[#7B7883] rounded-[29px] to-black mx-auto mt-0 md:mt-6 px-[5%] flex justify-between items-center duration-700">
        <div class="flex gap-3">
          <img class="w-[100px] h-[100px] md:w-[200px] md:h-[180px]" src="${$srcTomorrowA}"/>
          <div class="pt-3 md:pt-11">
            <h2 class="font-semibold text-lg md:text-2xl text-white">${tommorowTxtA}</h2>
            <h3 class="font-semibold text-sm md:text-[16px] text-white">${getFullDateTommorowA}</h3>
            <h3 class="font-semibold text-sm md:text-[16px] text-white">${tempMaxTommorowA}/${tempminTommorowA}</h3>
          </div>
        </div>
        <h5  class="font-extrabold text-sm  text-white capitalize md:text-2xl">${tommorowCurrentA}</h5>
        </div>`;

    // end Day after tomorrow

    //////////////////////////////////// in 3 days

    let tempMaxTommorowIn3 = 0;
    let tempminTommorowIn3 = 0;
    let getFullDateTommorowIn3 = "";
    let tommorowTxtIn3 = "";
    let tommorowCurrentIn3 = "";
    let tommorowIconIn3 = "";
    let $srcTomorrowIn3 = "";

    let tempMaxArrIn3 = [];
    let tempMinArrIn3 = [];

    $lists.map((item) => {
      // tommorow
      let $dayTommorowIn3 = 0;
      $dayTommorowIn3 = $date.getDate();
      $dayTommorowIn3 = parseInt($dayTommorowIn3);
      $dayTommorowIn3 = $dayTommorowIn3 + 3;
      $dayTommorowIn3.toString();

      if ($date.getDate() < 10) {
        $dayTommorowIn3 = "0" + $dayTommorowIn3;
      } else {
        $dayTommorowIn3 = $dayTommorowIn3;
      }

      let getFullDateIn3 = item.dt_txt.slice(0, 10);

      let $tommorowDateIn3 = `${$date.getFullYear()}-${
        $date.getMonth() + 1
      }-${$dayTommorowIn3}`;

      let $tommorowDateTxtIn3 = `${$date.getFullYear()}/${
        $date.getMonth() + 1
      }/${$dayTommorowIn3}`;

      if (getFullDateIn3 == $tommorowDateIn3) {
        tempMaxArrIn3.push(item.main.temp_max);
        tempMinArrIn3.push(item.main.temp_min);

        // tempMaxTommorow = Math.round(item.main.temp_max) + "°";
        // tempminTommorow = Math.round(item.main.temp_min) + "°";
        getFullDateTommorowIn3 = $tommorowDateTxtIn3;
        tommorowTxtIn3 = "In Three Days";
        tommorowCurrentIn3 = item.weather[0].description;
        tommorowIconIn3 = item.weather[0].icon;

        // icon
        let $weatherIconTomorrowIn3 = item.weather[0].icon;

        switch ($weatherIconTomorrowIn3) {
          case "01d":
            $srcTomorrowIn3 = "src/icons/800.png";
            break;
          case "01n":
            $srcTomorrowIn3 = "src/icons/01n.png";
            break;

          case "02d":
            $srcTomorrowIn3 = "src/icons/02d.png";
            break;
          case "02n":
            $srcTomorrowIn3 = "src/icons/02n.png";
            break;
          case "03d":
            $srcTomorrowIn3 = "src/icons/801.png";
            break;
          case "03n":
            $srcTomorrowIn3 = "src/icons/801.png";
            break;
          case "04d":
            $srcTomorrowIn3 = "src/icons/04.png";
            break;
          case "04n":
            $srcTomorrowIn3 = "src/icons/04.png";
            break;
          case "09d":
            $srcTomorrowIn3 = "src/icons/301.png";
            break;
          case "09n":
            $srcTomorrowIn3 = "src/icons/301.png";
            break;
          case "10d":
            $srcTomorrowIn3 = "src/icons/10d.png";
            break;
          case "10n":
            $srcTomorrowIn3 = "src/icons/10n.png";
            break;
          case "11d":
            $srcTomorrowIn3 = "src/icons/202.png";
            break;
          case "11n":
            $srcTomorrowIn3 = "src/icons/202.png";
            break;
          case "13d":
            $srcTomorrowIn3 = "src/icons/600.png";
            break;
          case "13n":
            $srcTomorrowIn3 = "src/icons/600.png";
            break;
          case "50d":
            $srcTomorrowIn3 = "src/icons/65.png";
            break;
          case "50n":
            $srcTomorrowIn3 = "src/icons/65.png";
            break;
          default:
            console.log("error");

            break;
        }
      }

      if (tempMaxArrIn3.length > 0 && tempMinArrIn3.length > 0) {
        tempMaxTommorowIn3 = Math.round(Math.max(...tempMaxArrIn3)) + "°";
        tempminTommorowIn3 = Math.round(Math.min(...tempMinArrIn3)) + "°";
      }
    });

    $forecat5day.innerHTML += `
        <div class="h-[100px] w-full border border-[#3d3d3d] relative md:h-[200px] bg-gradient-to-r from-[#7B7883] rounded-[29px] to-black mx-auto mt-0 md:mt-6 px-[5%] flex justify-between items-center duration-700">
        <div class="flex gap-3">
          <img class="w-[100px] h-[100px] md:w-[200px] md:h-[180px]" src="${$srcTomorrowIn3}"/>
          <div class="pt-3 md:pt-11">
            <h2 class="font-semibold text-lg md:text-2xl text-white">${tommorowTxtIn3}</h2>
            <h3 class="font-semibold text-sm md:text-[16px] text-white">${getFullDateTommorowIn3}</h3>
            <h3 class="font-semibold text-sm md:text-[16px] text-white">${tempMaxTommorowIn3}/${tempminTommorowIn3}</h3>
          </div>
        </div>
        <h5  class="font-extrabold text-sm  text-white capitalize md:text-2xl">${tommorowCurrentIn3}</h5>
        </div>`;

    // end in 3 days

    //////////////////////////////////// in 4 days

    let tempMaxTommorowIn4 = 0;
    let tempminTommorowIn4 = 0;
    let getFullDateTommorowIn4 = "";
    let tommorowTxtIn4 = "";
    let tommorowCurrentIn4 = "";
    let tommorowIconIn4 = "";
    let $srcTomorrowIn4 = "";

    let tempMaxArrIn4 = [];
    let tempMinArrIn4 = [];

    $lists.map((item) => {
      // tommorow
      let $dayTommorowIn4 = 0;
      $dayTommorowIn4 = $date.getDate();
      $dayTommorowIn4 = parseInt($dayTommorowIn4);
      $dayTommorowIn4 = $dayTommorowIn4 + 4;
      $dayTommorowIn4.toString();

      if ($date.getDate() < 10) {
        $dayTommorowIn4 = "0" + $dayTommorowIn4;
      } else {
        $dayTommorowIn4 = $dayTommorowIn4;
      }

      let getFullDateIn4 = item.dt_txt.slice(0, 10);

      let $tommorowDateIn4 = `${$date.getFullYear()}-${
        $date.getMonth() + 1
      }-${$dayTommorowIn4}`;

      let $tommorowDateTxtIn4 = `${$date.getFullYear()}/${
        $date.getMonth() + 1
      }/${$dayTommorowIn4}`;

      if (getFullDateIn4 == $tommorowDateIn4) {
        tempMaxArrIn4.push(item.main.temp_max);
        tempMinArrIn4.push(item.main.temp_min);

        // tempMaxTommorow = Math.round(item.main.temp_max) + "°";
        // tempminTommorow = Math.round(item.main.temp_min) + "°";
        getFullDateTommorowIn4 = $tommorowDateTxtIn4;
        tommorowTxtIn4 = "In Four Days";
        tommorowCurrentIn4 = item.weather[0].description;
        tommorowIconIn4 = item.weather[0].icon;

        // icon
        let $weatherIconTomorrowIn4 = item.weather[0].icon;

        switch ($weatherIconTomorrowIn4) {
          case "01d":
            $srcTomorrowIn4 = "src/icons/800.png";
            break;
          case "01n":
            $srcTomorrowIn4 = "src/icons/01n.png";
            break;

          case "02d":
            $srcTomorrowIn4 = "src/icons/02d.png";
            break;
          case "02n":
            $srcTomorrowIn4 = "src/icons/02n.png";
            break;
          case "03d":
            $srcTomorrowIn4 = "src/icons/801.png";
            break;
          case "03n":
            $srcTomorrowIn4 = "src/icons/801.png";
            break;
          case "04d":
            $srcTomorrowIn4 = "src/icons/04.png";
            break;
          case "04n":
            $srcTomorrowIn4 = "src/icons/04.png";
            break;
          case "09d":
            $srcTomorrowIn4 = "src/icons/301.png";
            break;
          case "09n":
            $srcTomorrowIn4 = "src/icons/301.png";
            break;
          case "10d":
            $srcTomorrowIn4 = "src/icons/10d.png";
            break;
          case "10n":
            $srcTomorrowIn4 = "src/icons/10n.png";
            break;
          case "11d":
            $srcTomorrowIn4 = "src/icons/202.png";
            break;
          case "11n":
            $srcTomorrowIn4 = "src/icons/202.png";
            break;
          case "13d":
            $srcTomorrowIn4 = "src/icons/600.png";
            break;
          case "13n":
            $srcTomorrowIn4 = "src/icons/600.png";
            break;
          case "50d":
            $srcTomorrowIn4 = "src/icons/65.png";
            break;
          case "50n":
            $srcTomorrowIn4 = "src/icons/65.png";
            break;
          default:
            console.log("error");

            break;
        }
      }

      if (tempMaxArrIn4.length > 0 && tempMinArrIn4.length > 0) {
        tempMaxTommorowIn4 = Math.round(Math.max(...tempMaxArrIn4)) + "°";
        tempminTommorowIn4 = Math.round(Math.min(...tempMinArrIn4)) + "°";
      }
    });

    $forecat5day.innerHTML += `
        <div class="h-[100px] w-full border border-[#3d3d3d] relative md:h-[200px] bg-gradient-to-r from-[#7B7883] rounded-[29px] to-black mx-auto mt-0 md:mt-6 px-[5%] flex justify-between items-center duration-700">
        <div class="flex gap-3">
          <img class="w-[100px] h-[100px] md:w-[200px] md:h-[180px]" src="${$srcTomorrowIn4}"/>
          <div class="pt-3 md:pt-11">
            <h2 class="font-semibold text-lg md:text-2xl text-white">${tommorowTxtIn4}</h2>
            <h3 class="font-semibold text-sm md:text-[16px] text-white">${getFullDateTommorowIn4}</h3>
            <h3 class="font-semibold text-sm md:text-[16px] text-white">${tempMaxTommorowIn4}/${tempminTommorowIn4}</h3>
          </div>
        </div>
        <h5  class="font-extrabold text-sm  text-white capitalize md:text-2xl">${tommorowCurrentIn4}</h5>
        </div>`;

    // end in 4 days
  });
}
weatherApi();

// https://api.weatherstack.com/current?access_key=7340fb13f2c32d5ab02d364f916ab6a2&query=tehran

// https://api.openweathermap.org/data/2.5/forecast?q=tehran&units=metric&appid=14da3e989046810485f4fe023957b34b
