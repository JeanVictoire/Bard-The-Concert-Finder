covidtestBtn = document.querySelector(".covidApi-test");
covidtestIn = document.querySelector("#test-input-covid");
let stateIn = "";
let requestUrl, covidData, covidDataUrl, stateData, actualDate;

function getStateIn() {
stateIn = covidtestIn.value;
requestUrl = `https://data.cdc.gov/resource/9mfq-cb36.json?state=${stateIn}`;
getStatesData();
}

async function getStatesData() {
    await fetch(requestUrl)
    .then(function (response) {
      let json = response.json();
      return json;
    })
    .then(function (data) {
      covidData = data;
    });
    getDates();
}

function getDates() {
    let date2 = new Date(covidData[0].submission_date);
    for (let i = 0; i < covidData.length; i++) {
        let date1 = new Date(covidData[i].submission_date);

        if (date1.getTime() > date2.getTime()) {
            date2 = date1;
        }
    }
    let isoDate = date2.toISOString();
    let isoDateSplit = isoDate.split("T");
    let almostDate = isoDateSplit[0];
    actualDate = `${almostDate}T00:00:00.000`;
    getData(actualDate);
}

async function getData(actualDate) {
    covidDataUrl = `https://data.cdc.gov/resource/9mfq-cb36.json?state=${stateIn}&submission_date=${actualDate}`
    await fetch(covidDataUrl)
    .then(function (response) {
      let json = response.json();
      return json;
    })
    .then(function (data) {
      stateData = data;
    });
    console.log(stateData);
}

covidtestBtn.addEventListener("click", getStateIn);