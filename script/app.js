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
    let crew = getCrew(jsonObject.crew[0].crew);
    let crew1 = getCrew1(jsonObject.crew[1].crew);
    let crew2 = getCrew2(jsonObject.crew[2].crew);
    let crew3 = getCrew3(jsonObject.crew[3].crew);
}
//store all crew members in an array
// let crewMembers = [crew, crew1, crew2, crew3];



const showCrewInfo = function (crew) {
    console.log(crew);
    let htmlstring = "";
    htmlstring = `<article class="o-section o-section--xl">
                <div class="o-layout o-layout--gutter-xl o-layout--justify-center o-layout--align-center">
                    <div class="o-layout__item u-2-of-3-bp2 u-1-of-2-bp3">
                        <figure class="u-mb-lg">
                            <picture>
                                <img class="crewImage img" src="${crew.image}" alt="Picture" />
                            </picture>
                        </figure>
                    </div>
                    <div class="o-layout__item u-2-of-3-bp2 u-1-of-2-bp3">
                        <div class="u-max-width-sm">

                            <h2 class="crewName">${crew.name}</h2>
                            <ol class="c-lead c-lead--lg u-color-neutral-dark u-mb-lg">
                                <ul>Agency: ${crew.agency}</ul>
                                <a href="${crew.wikipedia}"><ul ">Wikipedia</ul></a>
                                <ul>Missionstatus: ${crew.status}</ul>
                            </ol>
                        </div>
                    </div>
            </article>`
    document.querySelector('.crewInfo').innerHTML = htmlstring;
}

const showCrewInfo1 = function (crew) {
    console.log(crew);

    let htmlstring = "";
    htmlstring += `<article class="o-section o-section--xl">
                <div class="o-layout o-layout--gutter-xl o-layout--justify-center o-layout--align-center">
                    <div class="o-layout__item u-2-of-3-bp2 u-1-of-2-bp3">
                        <figure class="u-mb-lg">
                            <picture>
                                <img class="crewImage img" src="${crew.image}" alt="Picture" />
                            </picture>
                        </figure>
                    </div>
                    <div class="o-layout__item u-2-of-3-bp2 u-1-of-2-bp3">
                        <div class="u-max-width-sm">

                            <h2 class="crewName">${crew.name}</h2>
                            <ol class="c-lead c-lead--lg u-color-neutral-dark u-mb-lg">
                                <ul>Agency: ${crew.agency}</ul>
                                <a href="${crew.wikipedia}"><ul ">Wikipedia</ul></a>
                                <ul>Missionstatus: ${crew.status}</ul>
                            </ol>
                        </div>
                    </div>
            </article>`
    document.querySelector('.crewInfo').innerHTML = htmlstring;
}


const showCrewInfo2 = function (crew) {
    console.log(crew);
    let htmlstring = "";
    htmlstring = `<article class="o-section o-section--xl">
                <div class="o-layout o-layout--gutter-xl o-layout--justify-center o-layout--align-center">
                    <div class="o-layout__item u-2-of-3-bp2 u-1-of-2-bp3">
                        <figure class="u-mb-lg">
                            <picture>
                                <img class="crewImage img" src="${crew.image}" alt="Picture" />
                            </picture>
                        </figure>
                    </div>
                    <div class="o-layout__item u-2-of-3-bp2 u-1-of-2-bp3">
                        <div class="u-max-width-sm">

                            <h2 class="crewName">${crew.name}</h2>
                            <ol class="c-lead c-lead--lg u-color-neutral-dark u-mb-lg">
                                <ul>Agency: ${crew.agency}</ul>
                                <a href="${crew.wikipedia}"><ul ">Wikipedia</ul></a>
                                <ul>Missionstatus: ${crew.status}</ul>
                            </ol>
                        </div>
                    </div>
            </article>`
    document.querySelector('.crewInfo').innerHTML = htmlstring;
}

const showCrewInfo3 = function (crew) {
    console.log(crew);
    let htmlstring = "";
    htmlstring = `<article class="o-section o-section--xl">
                <div class="o-layout o-layout--gutter-xl o-layout--justify-center o-layout--align-center">
                    <div class="o-layout__item u-2-of-3-bp2 u-1-of-2-bp3">
                        <figure class="u-mb-lg">
                            <picture>
                                <img class="crewImage img" src="${crew.image}" alt="Picture" />
                            </picture>
                        </figure>
                    </div>
                    <div class="o-layout__item u-2-of-3-bp2 u-1-of-2-bp3">
                        <div class="u-max-width-sm">

                            <h2 class="crewName">${crew.name}</h2>
                            <ol class="c-lead c-lead--lg u-color-neutral-dark u-mb-lg">
                                <ul>Agency: ${crew.agency}</ul>
                                <a href="${crew.wikipedia}"><ul ">Wikipedia</ul></a>
                                <ul>Missionstatus: ${crew.status}</ul>
                            </ol>
                        </div>
                    </div>
            </article>`
    document.querySelector('.crewInfo').innerHTML = htmlstring;
}




//get crew data from spaxeX API
let getCrew = (crew) => {
    handleData(`https://api.spacexdata.com/v4/crew/${crew}`, listenToButton, null, 'GET')

}
//get crew data from spaxeX API
let getCrew1 = (crew) => {
    handleData(`https://api.spacexdata.com/v4/crew/${crew}`, listenToButton1, null, 'GET')

}
//get crew data from spaxeX API
let getCrew2 = (crew) => {
    handleData(`https://api.spacexdata.com/v4/crew/${crew}`, listenToButton2, null, 'GET')

}
//get crew data from spaxeX API
let getCrew3 = (crew) => {
    handleData(`https://api.spacexdata.com/v4/crew/${crew}`, listenToButton3, null, 'GET')

}


// register button
const listenToButton = function (crew) {
    console.log('IK WERK!')
    let button = document.querySelector('.js-button')
    console.log(button)
    button.addEventListener('click', function () {
        console.log('IK WERK OOK!')
        showCrewInfo(crew);
    })
}
const listenToButton1 = function (crew) {
    console.log('IK WERK!')
    let button = document.querySelector('.js-button1')
    console.log(button)
    button.addEventListener('click', function () {
        console.log('IK WERK OOK!')
        showCrewInfo1(crew);
    })
}
const listenToButton2 = function (crew) {
    console.log('IK WERK!')
    let button = document.querySelector('.js-button2')
    console.log(button)
    button.addEventListener('click', function () {
        console.log('IK WERK OOK!')
        showCrewInfo2(crew);
    })
}
const listenToButton3 = function (crew) {
    console.log('IK WERK!')
    let button = document.querySelector('.js-button3')
    console.log(button)
    button.addEventListener('click', function () {
        console.log('IK WERK OOK!')
        showCrewInfo3(crew);
    })
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
    // listenToButton();
    // listenToButton1();
    // listenToButton2();
    // listenToButton3();
    // showCrewInfo();
    // getLaunchpad();
    // getCrew("5ebf1b7323a9a60006e03a7b");
});