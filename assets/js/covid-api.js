let stateIn = "";
let covidUrl;
let covidData, subDate, year, month, day;
let prevYear = 0;
let prevMonth = 0;
let prevDay = 0;
let mostUpadatedData;
covidtestBtn = document.querySelector(".covidApi-test");
covidtestIn = document.querySelector("#test-input-covid");
let mostRecentDate = [];

function getStateIn() {
  stateIn = `${covidtestIn.value}`;
  covidUrl = `https://data.cdc.gov/resource/9mfq-cb36.json?state=${stateIn}`;
  getCovidApi();
}

async function getCovidApi() {
  await fetch(covidUrl)
    .then(function (response) {
      let json = response.json();
      return json;
    })
    .then(function (data) {
      covidData = data;
    });
    console.log(covidData)
  splitDate();
}

function splitDate() {
  for (let i = 0; i < covidData.length; i++) {
    subDate = covidData[i].submission_date;
    let dateArray = subDate.split("-");
    let dayArray = dateArray[2].split("T00:00:00.000");
    year = dateArray[0];
    month = dateArray[1];
    day = dayArray[0];

    // console.log(year);
    // console.log(month);
    // console.log(day);
    findMostRecentDate();
  }
  mostUpadatedData = `${mostRecentDate[0].year}-${mostRecentDate[0].month}-${mostRecentDate[0].day}T00:00:00.000`;
  UpdateCovidData(mostUpadatedData);
}

async function UpdateCovidData() {
  covidUrl = `https://data.cdc.gov/resource/9mfq-cb36.json?state=${stateIn}&submission_date=${mostUpadatedData}`;
  console.log(covidUrl)
  await fetch(covidUrl)
    .then(function (response) {
      let json = response.json();
      return json;
    })
    .then(function (data) {
      covidData = data;
    });
  console.log(covidData);
}

// Logic needs correction!
//I'll do it later at night -Salvador
function findMostRecentDate() {
  if (year > prevYear && month > prevMonth && day > prevDay) {
    prevYear = year;
    prevMonth = month;
    prevDay = day;
    let mostRecent = {
      year: prevYear,
      month: prevMonth,
      day: prevDay,
    };

    let obj = {};
    obj["year"] = mostRecent.year;
    obj["month"] = mostRecent.month;
    obj["day"] = mostRecent.day;    
    mostRecentDate[0] = obj;
  }
}

covidtestBtn.addEventListener("click", getStateIn);
