let $lightBtn = document.getElementById("lightBtn");
let $darkBtn = document.getElementById("darkBtn");
let $btnDarkLight = document.getElementById("btnDarkLight");
let $btnDarkLightWrapper = document.getElementById("btnDarkLightWrapper");
let $body = document.querySelector("body");
let $todayWeather = document.querySelector("#todayWeather");
let $todayChartWrapper = document.querySelector("#todayChartWrapper");

////////////////////////////////////////////////////////////// loading
let $loading = document.querySelector("#loading");

//////////////////////////////////////////////////////////////// error search
let $errorSearch = document.querySelector("#errorSearch");

////////////////////////////////////////////////////////// error city not found
let $errorCity = document.querySelector("#errorCity");

////////////////////////////////////////////////////////// location logo select
let $shadowBlack = document.querySelector("#shadowBlack");
let $locationBlack = document.querySelector("#locationBlack");
let $locationWhite = document.querySelector("#locationWhite");
let $shadowWhite = document.querySelector("#shadowWhite");

let $updatingDot = document.querySelector("#updatingDot");

///////////////////////////////////////////////////// map div
let $mapDiv = document.querySelector("#mapDiv");
let $bgWhite = document.querySelector("#bgWhite");
let $bgDark = document.querySelector("#bgDark");
let $currentWeather = document.querySelector("#currentWeather");

let $theme = "#000";

///////////////////////////////////////////////////// dark light theme
$btnDarkLight.addEventListener("click", () => {
  // $todayWeather.classList.toggle("border-[#b8b8b8b2]");
  // $todayWeather.classList.toggle("border-[#333333b2]");

  $currentWeather.classList.toggle("text-white");

  // $todayChartWrapper.classList.toggle("border-[#b8b8b8b2]");
  // $todayChartWrapper.classList.toggle("border-[#333333b2]");
  $bgWhite.classList.toggle("hidden");
  $bgDark.classList.toggle("hidden");

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
  // $visibiltiesWrapper.classList.toggle("bg-[#FFFFFF]");
  $visibiltiesWrapper.classList.toggle("shadow-black");
  $visibiltiesWrapper.classList.toggle("md:shadow-black/40");
  $visibiltiesWrapper.classList.toggle("shadow-white/15");
  $visibiltiesWrapper.classList.toggle("md:shadow-[#FFFEFE]/10");
  // $visibiltiesWrapper.classList.toggle("bg-[#FFFEFE]/6");

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

  // 4days arrow right
  let $arrowNxt4day = document.querySelector("#arrowNxt4day");
  let arrowNxt4dayAtt = $arrowNxt4day.getAttribute("stroke");
  if (arrowNxt4dayAtt == "black") {
    $arrowNxt4day.setAttribute("stroke", "white");
  } else {
    $arrowNxt4day.setAttribute("stroke", "black");
  }

  let $arrL4day = document.querySelector("#arrL4day");
  let arrL4day = $arrL4day.getAttribute("stroke");
  if (arrL4day == "black") {
    $arrL4day.setAttribute("stroke", "white");
  } else {
    $arrL4day.setAttribute("stroke", "black");
  }
  // navbar
  let $nav = document.querySelector("#nav");

  let $navUl = document.querySelector("#navUl");
  let $navLi = document.querySelectorAll("#navUl>li>a>svg");

  // $nav.classList.toggle("bg-[#FFFFFF]");
  $nav.classList.toggle("shadow-black");
  $nav.classList.toggle("md:shadow-black/40");
  // $nav.classList.toggle("bg-[#FFFEFE]/6");
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
      $theme = "#ffff";
      weatherChartMin.upadate();
    }
    if ($color == "#ffff") {
      val.setAttribute("stroke", "#000000");
      $theme = "#ffff";
      weatherChartMin.upadate();
    }
  });

  // bg div map
  $mapDiv.classList.toggle("bg-[url(../images/bgMap.png)]");
  $mapDiv.classList.toggle("bg-[url(../images/bgMapBlack2.png)]");
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

////////////////////////////////////////////////////////// select go to h3
let $cityName = document.querySelector("#cityName");
let $city = document.createElement("h3");
let $country = document.createElement("h3");

///////////////////////////////////// search add to url word
let $search = document.querySelector("#search");
let $searchBtn = document.querySelector("#searchBtn");

let nameCitySearch = "tehran";

let $daysWrapper = document.querySelector("#daysWrapper");

let $forecat5day = document.querySelector("#forecat5day");

let $myChart = document.querySelector("myChart");
let weatherChart = null;
let weatherChartMin = null;
let weatherCharttoday = null;

///////////////////////////////////////////////////// search button click
let $sectionWeatherCurrent = document.querySelector("#sectionWeatherCurrent");
let $arrL4day = document.querySelector("#arrL4day");

// chart value
let $todayMaxTemp = 0;

function weatherApi() {
  asynAwait(
    `https://api.openweathermap.org/data/2.5/forecast?appid=14da3e989046810485f4fe023957b34b&q=${nameCitySearch}&units=metric`
  ).then((result) => {
    let $tomorrowMaxTempDate = "";
    let $day3MaxTempDate = "";
    let $day4MaxTempDate = "";
    let $day5MaxTempDate = "";

    let $tomorrowMaxTemp = 0;
    let $day3MaxTemp = 0;
    let $day4MaxTemp = 0;
    let $day5MaxTemp = 0;

    let $todayMaxTemp = Math.round(result.list[0].main.temp_max);
    let $todayMinTemp = Math.round(result.list[0].main.temp_min);
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
    $city.classList.add("text-sm", "md:text-3xl", "font-black");
    $cityName.appendChild($city);

    // country add in document
    $country.innerText = `${result.city.country}`;
    $country.classList.add("text-[10px]", "mt-1.5", "font-black", "md:text-lg");
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

    $todayMaxTemp = Math.round(result.list[0].main.temp_max);
    $todayMinTemp = Math.round(result.list[0].main.temp_min);

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

    let $todayMaxTempDate = $currentDate;
    $currentDateWrapper.innerText = $currentDate;

    //////////////////////////////////// data for today other hours weather
    let todayHour = $date.getHours();
    let day = 0;
    if ($date.getDate() < 10) {
      day = "0" + $date.getDate();
    } else {
      day = $date.getDate();
    }

    let $todayDate = `${$date.getFullYear()}-${$date.getMonth() + 1}-${day}`;

    let $lists = result.list;

    let hoursArr = [];
    let tempsArr = [];
    $lists.map((item) => {
      let getTimesDtText = item.dt_txt.slice(11, 13);
      let getFullDate = item.dt_txt.slice(0, 10);

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

        hoursArr.push(getTimesDtText);
        tempsArr.push(Math.round(item.main.temp));

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

    // add chart for day temp max
    weatherCharttoday = null;

    if (weatherCharttoday) weatherCharttoday.destroy();
    const ctxToday = document.getElementById("todayChart");
    const colors = [
      "rgb(3, 201, 201)",
      "rgb(138, 3, 201)",
      "rgb(201, 3, 135)",
      "rgb(201, 3, 62)",
      "rgb(0, 187, 115)",
      "rgb(0, 187, 31)",
      "rgb(166, 255, 50)",
      "rgb(255, 252, 52)",
      "rgb(255, 133, 52)",
      "rgb(255, 52, 52)",
      "rgb(15, 57, 85)",
      "rgb(83, 15, 85)",
      "rgb(201, 3, 135)",
      "rgb(201, 3, 62)",
      "rgb(0, 187, 115)",
      "rgb(0, 187, 31)",
    ];
    weatherCharttoday = new Chart(ctxToday, {
      type: "bar",
      data: {
        labels: hoursArr,
        datasets: [
          {
            label: "Max Temp",
            data: tempsArr,
            borderWidth: 4,
            backgroundColor: colors,
          },
        ],
      },
      options: {
        scales: { y: { beginAtZero: true } },
        maintainAspectRatio: false,
        scales: {
          x: {
            ticks: {
              color: "#000",
            },
            grid: {
              color: "#000",
            },
          },
          y: {
            beginAtZero: true,
            ticks: {
              color: "#000",
            },
            grid: {
              color: "#000",
            },
          },
        },
        plugins: {
          legend: {
            labels: {
              color: "#000",
            },
          },
          title: {
            color: "#000f",
          },
        },
      },
    });

    // btn 5day forecast
    // hidden others
    let nav = document.querySelector("#nav");
    let $fiveDayBtn = document.querySelector("#fiveDayBtn");

    // arrow left click back to main page

    $arrL4day.addEventListener("click", () => {
      $sectionWeatherCurrent.classList.remove("hidden");
      // add section
      $forecat5day.classList.remove("flex");
      $forecat5day.classList.add("hidden");

      $arrL4day.classList.add("hidden");

      nav.classList.remove("hidden");
    });

    //////////////////////////// click on 5 days
    $fiveDayBtn.addEventListener("click", () => {
      $arrL4day.classList.remove("hidden");
      $arrL4day.classList.add("flex");

      $sectionWeatherCurrent.classList.add("hidden");
      // add section
      $forecat5day.classList.remove("hidden");
      $forecat5day.classList.add("flex");

      nav.classList.toggle("hidden");
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

      if ($dayTommorow < 10) {
        $dayTommorow = "0" + $dayTommorow;
      } else {
        $dayTommorow = $dayTommorow;
      }
      $dayTommorow.toString();

      let getTimesDtText = item.dt_txt.slice(11, 13);
      let getFullDate = item.dt_txt.slice(0, 10);

      let $tommorowDate = `${$date.getFullYear()}-${
        $date.getMonth() + 1
      }-${$dayTommorow}`;

      let $tommorowDateTxt = `${$date.getFullYear()}/${
        $date.getMonth() + 1
      }/${$dayTommorow}`;
      getFullDateTommorow = $tommorowDateTxt;
      if (getFullDate == $tommorowDate) {
        tempMaxArr.push(item.main.temp_max);
        tempMinArr.push(item.main.temp_min);

        // tempMaxTommorow = Math.round(item.main.temp_max) + "°";
        // tempminTommorow = Math.round(item.main.temp_min) + "°";

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

      $tomorrowMaxTemp = Math.round(Math.max(...tempMaxArr));
    });

    $forecat5day.innerHTML += `
        <div class="h-[150px] w-full  backdrop-blur-3xl shadow-black shadow-sm md:shadow-black/40 bg-[#ffffff13] rounded-4xl relative md:h-[200px]  mx-auto mt-0 md:mt-6 px-[5%] flex justify-between items-center duration-700">
        <div class="flex gap-4">
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

      if ($dayTommorowA < 10) {
        $dayTommorowA = "0" + $dayTommorowA;
      } else {
        $dayTommorowA = $dayTommorowA;
      }

      $dayTommorowA.toString();

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
        <div class="h-[150px] w-full  backdrop-blur-3xl shadow-black shadow-sm md:shadow-black/40 bg-[#ffffff13] rounded-4xl relative md:h-[200px]  mx-auto mt-0 md:mt-6 px-[5%] flex justify-between items-center duration-700">
        <div class="flex gap-4">
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

      if ($dayTommorowIn3 < 10) {
        $dayTommorowIn3 = "0" + $dayTommorowIn3;
      } else {
        $dayTommorowIn3 = $dayTommorowIn3;
      }

      $dayTommorowIn3.toString();

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
        <div class="h-[150px] w-full  backdrop-blur-3xl shadow-black shadow-sm md:shadow-black/40 bg-[#ffffff13] rounded-4xl relative md:h-[200px]  mx-auto mt-0 md:mt-6 px-[5%] flex justify-between items-center duration-700">
        <div class="flex gap-4">
          <img class="w-[100px] h-[100px] md:w-[200px] md:h-[180px]" src="${$srcTomorrowIn3}"/>
          <div class="pt-3 md:pt-11">
            <h2 class="font-semibold text-lg md:text-2xl text-white">${tommorowTxtIn3}</h2>
            <h3 class="font-semibold text-sm md:text-[16px] text-white">${getFullDateTommorowIn3}</h3>
            <h3 class="font-semibold text-sm md:text-[16px] text-white">${tempMaxTommorowIn3}/${tempminTommorowIn3}</h3>
          </div>
        </div>
        <h5  class="font-extrabold text-sm  text-white capitalize md:text-2xl">${tommorowCurrentIn3}</h5>
        </div>`;

    $day3MaxTempDate = getFullDateTommorowA;
    $day3MaxTemp = Math.round(Math.max(...tempMaxArrA));

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

      if ($dayTommorowIn4 < 10) {
        $dayTommorowIn4 = "0" + $dayTommorowIn4;
      }

      $dayTommorowIn4.toString();

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
        <div class="h-[150px] w-full backdrop-blur-3xl shadow-black shadow-sm md:shadow-black/40 bg-[#ffffff13] rounded-4xl relative md:h-[200px]  mx-auto mt-0 md:mt-6 px-[5%] flex justify-between items-center duration-700">
        <div class="flex gap-4">
          <img class="w-[100px] h-[100px] md:w-[200px] md:h-[180px]" src="${$srcTomorrowIn4}"/>
          <div class="pt-3 md:pt-11">
            <h2 class="font-semibold text-lg md:text-2xl text-white">${tommorowTxtIn4}</h2>
            <h3 class="font-semibold text-sm md:text-[16px] text-white">${getFullDateTommorowIn4}</h3>
            <h3 class="font-semibold text-sm md:text-[16px] text-white">${tempMaxTommorowIn4}/${tempminTommorowIn4}</h3>
          </div>
        </div>
        <h5  class="font-extrabold text-sm  text-white capitalize md:text-2xl">${tommorowCurrentIn4}</h5>
        </div>`;

    $day4MaxTempDate = getFullDateTommorowIn3;
    $day4MaxTemp = Math.round(Math.max(...tempMaxArrIn3));

    $day5MaxTempDate = getFullDateTommorowIn4;
    $day5MaxTemp = Math.round(Math.max(...tempMaxArrIn4));
    // end in 4 days

    $tomorrowMaxTempDate = getFullDateTommorow;
    // chartttttttttttttttttttttttttt

    $tomorrowMaxTempDate = $tomorrowMaxTempDate || $currentDate;
    $day3MaxTempDate = $day3MaxTempDate || $currentDate;
    $day4MaxTempDate = $day4MaxTempDate || $currentDate;
    $day5MaxTempDate = $day5MaxTempDate || $currentDate;

    // حالا چارت‌ها
    if (weatherChart) weatherChart.destroy();
    const ctx = document.getElementById("myChart");
    weatherChart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: [
          `Today`,
          `${$tomorrowMaxTempDate}`,
          `${$day3MaxTempDate}`,
          `${$day4MaxTempDate}`,
          `${$day5MaxTempDate}`,
        ],
        datasets: [
          {
            label: "Max Temp",
            data: [
              $todayMaxTemp,
              $tomorrowMaxTemp,
              $day3MaxTemp,
              $day4MaxTemp,
              $day5MaxTemp,
            ],
            borderWidth: 1,
            backgroundColor: "rgb(255, 71, 71)",
            color: "white",
          },
        ],
      },
      options: {
        scales: { y: { beginAtZero: true } },
        maintainAspectRatio: false,
        scales: {
          x: {
            ticks: {
              color: "#000",
            },
            grid: {
              color: "#000",
            },
          },
          y: {
            beginAtZero: true,
            ticks: {
              color: "#000",
            },
            grid: {
              color: "#000",
            },
          },
        },
        plugins: {
          legend: {
            labels: {
              color: "#000",
            },
          },
          title: {
            color: "#000f",
          },
        },
      },
    });

    if (weatherChartMin) weatherChartMin.destroy();
    const ctxMin = document.getElementById("tempMin");
    weatherChartMin = new Chart(ctxMin, {
      type: "line",
      data: {
        labels: [
          `Today`,
          `${$tomorrowMaxTempDate}`,
          `${$day3MaxTempDate}`,
          `${$day4MaxTempDate}`,
          `${$day5MaxTempDate}`,
        ],
        datasets: [
          {
            label: "Min Temp",
            data: [
              $todayMinTemp,
              tempMinArr.length
                ? Math.round(Math.min(...tempMinArr))
                : $todayMinTemp,
              tempMinArrA.length
                ? Math.round(Math.min(...tempMinArrA))
                : $todayMinTemp,
              tempMinArrIn3.length
                ? Math.round(Math.min(...tempMinArrIn3))
                : $todayMinTemp,
              tempMinArrIn4.length
                ? Math.round(Math.min(...tempMinArrIn4))
                : $todayMinTemp,
            ],
            borderColor: "rgb(47, 130, 255)",
            borderWidth: 4,
            backgroundColor: "#0000",
          },
        ],
      },
      options: {
        scales: { y: { beginAtZero: true } },
        maintainAspectRatio: false,
        scales: {
          x: {
            ticks: {
              color: $theme,
            },
            grid: {
              color: $theme,
            },
          },
          y: {
            beginAtZero: true,
            ticks: {
              color: $theme,
            },
            grid: {
              color: $theme,
            },
          },
        },
        plugins: {
          legend: {
            labels: {
              color: $theme,
            },
          },
          title: {
            color: $theme,
          },
        },
      },
    });
  });
  $btnDarkLight.addEventListener("click", () => {
    let isDark = $body.classList.contains("bg-black");

    weatherChartMin.options.scales.x.ticks.color = isDark ? "#fff" : "#000";
    weatherChartMin.options.scales.y.ticks.color = isDark ? "#fff" : "#000";
    weatherChartMin.options.scales.x.grid.color = isDark
      ? "rgba(255,255,255,0.2)"
      : "#000";
    weatherChartMin.options.scales.y.grid.color = isDark
      ? "rgba(255,255,255,0.2)"
      : "#000";
    weatherChartMin.options.plugins.legend.labels.color = isDark
      ? "#fff"
      : "#000";
    weatherChartMin.update();

    weatherChart.options.scales.x.ticks.color = isDark ? "#fff" : "#000";
    weatherChart.options.scales.y.ticks.color = isDark ? "#fff" : "#000";
    weatherChart.options.scales.x.grid.color = isDark
      ? "rgba(255,255,255,0.2)"
      : "#000";
    weatherChart.options.scales.y.grid.color = isDark
      ? "rgba(255,255,255,0.2)"
      : "#000";
    weatherChart.options.plugins.legend.labels.color = isDark ? "#fff" : "#000";
    weatherChart.update();

    weatherCharttoday.options.scales.x.ticks.color = isDark ? "#fff" : "#000";
    weatherCharttoday.options.scales.y.ticks.color = isDark ? "#fff" : "#000";
    weatherCharttoday.options.scales.x.grid.color = isDark
      ? "rgba(255,255,255,0.2)"
      : "#000";
    weatherCharttoday.options.scales.y.grid.color = isDark
      ? "rgba(255,255,255,0.2)"
      : "#000";
    weatherCharttoday.options.plugins.legend.labels.color = isDark
      ? "#fff"
      : "#000";
    weatherCharttoday.update();
  });
}
weatherApi();

/////////////////////////////////////////////// cahrt page Btn click

let $chartPage = document.querySelector("#chartPage");
let $chartBtn = document.querySelector("#chartBtn");

//////////////////////////////////////////////////// map click
let $profPage = document.querySelector("#profPage");
let $prof = document.querySelector("#prof");
$prof.addEventListener("click", () => {
  $forecat5day.classList.add("hidden");

  // chart remove bg
  $chartBtn.classList.remove("bg-[#000000]/50");
  $chartBtn.classList.add("bg-[#000000]/20");

  $mapBtn.classList.remove("bg-[#000000]/50");
  $mapBtn.classList.add("bg-[#000000]/20");

  // home remove bg
  $homeBtn.classList.remove("bg-[#000000]/50");
  $homeBtn.classList.add("bg-[#000000]/20");

  // remove page home
  $sectionWeatherCurrent.classList.add("hidden");

  // map div remove
  $mapDiv.classList.remove("flex");
  $mapDiv.classList.add("hidden");

  // prof div add
  $profPage.classList.remove("hidden");
  $profPage.classList.add("flex");

  // arrow left
  $arrL4day.classList.add("hidden");

  // chart js
  $chartPage.classList.add("hidden");
});

///////////////////////////////////////////////////// chart click
$chartBtn.addEventListener("click", () => {
  $forecat5day.classList.add("hidden");

  $mapBtn.classList.remove("bg-[#000000]/50");
  $mapBtn.classList.add("bg-[#000000]/20");

  // home remove bg
  $homeBtn.classList.remove("bg-[#000000]/50");
  $homeBtn.classList.add("bg-[#000000]/20");

  // chart remove bg
  $chartBtn.classList.remove("bg-[#000000]/20");
  $chartBtn.classList.add("bg-[#000000]/50");

  // prof div remove
  $profPage.classList.remove("flex");
  $profPage.classList.add("hidden");

  // remove page home
  $sectionWeatherCurrent.classList.add("hidden");

  // map div add
  $mapDiv.classList.remove("flex");
  $mapDiv.classList.add("hidden");
  // arrow left
  $arrL4day.classList.add("hidden");

  $chartPage.classList.remove("hidden");
  $chartPage.classList.add("block");
});

//////////////////////////////////////////////////// map click
let $mapBtn = document.querySelector("#mapBtn");
$mapBtn.addEventListener("click", () => {
  $forecat5day.classList.add("hidden");

  // chart remove bg
  $chartBtn.classList.remove("bg-[#000000]/50");
  $chartBtn.classList.add("bg-[#000000]/20");

  $mapBtn.classList.remove("bg-[#000000]/20");
  $mapBtn.classList.add("bg-[#000000]/50");

  // home remove bg
  $homeBtn.classList.remove("bg-[#000000]/50");
  $homeBtn.classList.add("bg-[#000000]/20");

  // prof div remove
  $profPage.classList.remove("flex");
  $profPage.classList.add("hidden");

  // remove page home
  $sectionWeatherCurrent.classList.add("hidden");

  // map div add
  $mapDiv.classList.remove("hidden");
  $mapDiv.classList.add("flex");
  // arrow left
  $arrL4day.classList.add("hidden");

  // chart js
  $chartPage.classList.add("hidden");
});

//////////////////////////////////////////////////////////////// home click
let $homeBtn = document.querySelector("#homeBtn");
$homeBtn.addEventListener("click", () => {
  $mapBtn.classList.remove("bg-[#000000]/50");
  $mapBtn.classList.add("bg-[#000000]/20");

  // chart remove bg
  $chartBtn.classList.remove("bg-[#000000]/50");
  $chartBtn.classList.add("bg-[#000000]/20");

  // home remove bg
  $homeBtn.classList.remove("bg-[#000000]/20");
  $homeBtn.classList.add("bg-[#000000]/50");

  // remove page home
  $sectionWeatherCurrent.classList.remove("hidden");
  $sectionWeatherCurrent.classList.add("flex");

  // prof div remove
  $profPage.classList.remove("flex");
  $profPage.classList.add("hidden");

  $mapDiv.classList.add("hidden");

  // chart js
  $chartPage.classList.add("hidden");
});

//////////////////////////////////////////////////////////////// unsplash API
let $unsplashImg = document.querySelector("#unsplashImg");
let $unsplashImg2 = document.querySelector("#unsplashImg2");
let $unsplashImg3 = document.querySelector("#unsplashImg3");
let $unsplashImg4 = document.querySelector("#unsplashImg4");
let $unsplashImg5 = document.querySelector("#unsplashImg5");
let $unsplashImg6 = document.querySelector("#unsplashImg6");

function unsplashApi() {
  $loading.classList.remove("hidden");
  $loading.classList.add("flex");
  asynAwait(
    `https://api.unsplash.com/search/photos?query=${nameCitySearch}&client_id=smhJYs6efkWq2MNJMlDHWSIj00i5Z8W0rZ9GD5OntsE`
  ).then((val) => {
    let $srcUnsplash = val.results[1].urls.regular;
    let $srcUnsplash2 = val.results[2].urls.regular;
    let $srcUnsplash3 = val.results[3].urls.regular;
    let $srcUnsplash4 = val.results[4].urls.regular;
    let $srcUnsplash5 = val.results[5].urls.regular;
    let $srcUnsplash6 = val.results[6].urls.regular;

    $unsplashImg.setAttribute("src", `${$srcUnsplash}`);
    $unsplashImg2.setAttribute("src", `${$srcUnsplash2}`);
    $unsplashImg3.setAttribute("src", `${$srcUnsplash3}`);
    $unsplashImg4.setAttribute("src", `${$srcUnsplash4}`);
    $unsplashImg5.setAttribute("src", `${$srcUnsplash5}`);
    $unsplashImg6.setAttribute("src", `${$srcUnsplash6}`);

    $unsplashImg.onload = () => {
      $loading.classList.remove("flex");
      $loading.classList.add("hidden");
    };
  });
}
unsplashApi();

/////////////////////////////////////////////////// map API
let $mapVal = "Tehran";
function mapApi() {
  asynAwait(
    `
https://nominatim.openstreetmap.org/search?format=json&q=${nameCitySearch}&limit=1&accept-language=en`
  ).then((val) => {
    const container = document.getElementById("mapContainer");
    // reset
    container.innerHTML = "";

    let $lat = val[0].lat;
    let $lon = val[0].lon;
    let mapDiv = document.createElement("div");
    mapDiv.id = "map";
    mapDiv.classList.add("rounded-4xl");
    mapDiv.style.width = "80%";
    mapDiv.style.height = "300px";
    mapDiv.style.border = "1px solid #7a7a7ae1";
    container.appendChild(mapDiv);

    const map = L.map("map", { tap: false }).setView([$lat, $lon], 11);

    L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
      maxZoom: 19,
    }).addTo(map);

    let initialMarker = L.marker([$lat, $lon])
      .addTo(map)
      .bindPopup(nameCitySearch)
      .openPopup();

    let lastMarker = null;

    map.on("click", function (e) {
      const lat = e.latlng.lat;
      const lon = e.latlng.lng;

      if (initialMarker) {
        map.removeLayer(initialMarker);
        initialMarker = null;
      }

      if (lastMarker) {
        map.removeLayer(lastMarker);
      }

      lastMarker = L.marker([lat, lon]).addTo(map);

      fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json&accept-language=en`
      )
        .then((res) => res.json())
        .then((data) => {
          const city =
            data.address.city ||
            data.address.town ||
            data.address.village ||
            "Unknown";

          // resting
          if (weatherChart) weatherChart.destroy();
          if (weatherChartMin) weatherChartMin.destroy();
          if (weatherCharttoday) weatherCharttoday.destroy();

          /////////////////////////// reseting
          $forecat5day.innerHTML = "";
          $daysWrapper.innerHTML = "";
          //////////////////////////// reset when add new city
          $city.innerText = "";
          $country.innerText = "";
          ///////////////////////////// input value enter to api url

          //////////////////////////// cant enter the number or script

          if (city == "") {
            $errorSearch.classList.remove("hidden");
            $errorSearch.classList.add("flex");
            setTimeout(() => {
              $errorSearch.classList.remove("flex");
              $errorSearch.classList.add("hidden");
            }, 3000);
            weatherApi();
            nameCitySearch = "tehran";
            weatherApi();
            unsplashApi();
            mapApi();
            $search.value = "";
            $search.focus();
          } else {
            nameCitySearch = city;
            weatherApi();
            unsplashApi();
            mapApi();
            $search.value = "";
            $search.focus();
          }
        });
    });
  });
}
mapApi();

//////////////////////////////////////////////// slider swiper

const progressCircle = document.querySelector(".autoplay-progress svg");
const progressContent = document.querySelector(".autoplay-progress span");
var swiper = new Swiper(".mySwiper", {
  spaceBetween: 30,
  centeredSlides: true,
  autoplay: {
    delay: 2500,
    disableOnInteraction: false,
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  on: {
    autoplayTimeLeft(s, time, progress) {
      progressCircle.style.setProperty("--progress", 1 - progress);
      progressContent.textContent = `${Math.ceil(time / 1000)}s`;
    },
  },
});

///////////////////////////////////////////////////// search button click
$searchBtn.addEventListener("click", () => {
  if (weatherChart) weatherChart.destroy();
  if (weatherChartMin) weatherChartMin.destroy();
  if (weatherCharttoday) weatherCharttoday.destroy();

  /////////////////////////// reseting
  $forecat5day.innerHTML = "";
  $daysWrapper.innerHTML = "";
  //////////////////////////// reset when add new city
  $city.innerText = "";
  $country.innerText = "";
  ///////////////////////////// input value enter to api url

  //////////////////////////// cant enter the number or script

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
    unsplashApi();
    mapApi();
    $search.value = "";
    $search.focus();
  }
});

// ///////// for pwa
if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("serviceWorker.js")
    .then((reg) => {
      console.log("Service worker registred successfully", reg);
    })
    .catch((err) => {
      console.log("service worker not registred !!", err);
    });
}
