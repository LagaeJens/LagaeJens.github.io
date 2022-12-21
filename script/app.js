'use strict';
const handleData = function (url, callbackFunctionName, callbackErrorFunctionName = null, method = 'GET', body = null) {
    fetch(url, {
        method: method,
        body: body,
        headers: {
            'content-type': 'application/json',
        },
    })
        .then(function (response) {
            if (!response.ok) {
                console.warn(`>> Probleem bij de fetch(). Statuscode: ${response.status}`);
                if (callbackErrorFunctionName) {
                    console.warn(`>> Callback errorfunctie ${callbackErrorFunctionName.name}(response) wordt opgeroepen`);
                    callbackErrorFunctionName(response);
                } else {
                    A
                    console.warn('>> Er is geen callback errorfunctie meegegeven als parameter');
                }
            } else {
                console.info('>> Er is een response teruggekomen van de server');
                return response.json();
            }
        })
        .then(function (jsonObject) {
            if (jsonObject) {
                console.info('>> JSONobject is aangemaakt');
                console.info(`>> Callbackfunctie ${callbackFunctionName.name}(response) wordt opgeroepen`);
                callbackFunctionName(jsonObject);
            }
        })
        .catch(function (error) {
            console.warn(`>>fout bij verwerken json: error`);
            if (callbackErrorFunctionName) {
                callbackErrorFunctionName(undefined);
            }
        });
};

let showLaunchpad = function (jsonObject) {
    console.log(jsonObject);
    document.querySelector('.locatie').innerHTML = jsonObject.full_name;
}


let showUpcoming = function (jsonObject) {
    // console.log(jsonObject);
    //datum van de missie ophalen
    let missionDate = jsonObject.date_utc;
    //datum omzetten naar leesbare datum
    let date = new Date(missionDate);
    //datum omzetten naar leesbare datum
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    //datum omzetten naar leesbare datum
    let missionDateReadable = day + "-" + month + "-" + year;
    //datum omzetten naar leesbare datum
    let missionTime = date.toLocaleTimeString();
    //datum omzetten naar leesbare datum
    let missionDateAndTime = missionDateReadable + " " + missionTime;
    // datum omzetten naar brusselse tijd
    let missionDateAndTimeBrussels = new Date(date.toLocaleString("us-US", { timeZone: "Europe/Brussels" }));
    //datum omzetten naar leesbare datum
    document.querySelector('.mission').innerHTML = jsonObject.name;
    document.querySelector('.tijd').innerHTML = missionDateAndTimeBrussels;
    //patch ophalen
    let missionPatch = jsonObject.links.patch.large;
    // console.log(missionPatch, "patch");
    document.querySelector('.missionPatch').src = missionPatch;
    //launchpad ophalen
    let pad = jsonObject.launchpad;
    // console.log(pad);
    let lpad = getLaunchpad(pad); //pad is de parameter
    console.log(jsonObject.crew[0].crew);
    //crw ophalen
    // let crew = getCrew(jsonObject.crew[0].crew);
    // let crew1 = getCrew(jsonObject.crew[1].crew);
    let crew2 = getCrew(jsonObject.crew[2].crew);
    // let crew3 = getCrew(jsonObject.crew[3].crew);



}
//5e9e4502f509094188566f88


//crew ophalen en tonen
let showCrew = function (crew) {
    console.log(crew);
    document.querySelector('.crewName').innerHTML = crew.name;
}

//get crew data from spaxeX API
let getCrew = (crew) => {
    handleData(`https://api.spacexdata.com/v4/crew/${crew}`, showCrew, null, 'GET')


}



//get mission data from spaxeX API
let getMission = () => {
    handleData(`https://api.spacexdata.com/v5/launches/latest`, showUpcoming, null, 'GET')


}
let getLaunchpad = (pad) => {
    console.log(pad);
    handleData(`https://api.spacexdata.com/v4/launchpads/${pad}`, showLaunchpad, null, 'GET')


}
document.addEventListener('DOMContentLoaded', function () {
    getMission();
    // getLaunchpad();
    // getCrew("5ebf1b7323a9a60006e03a7b");
});