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
                            <input class="c-input-picture o-hide-accessible" type="checkbox" id="checkbox3">
                                <label class="c-label" for="checkbox3">
                                <img class="crewImage img" src="${crew.image}" alt="Picture" />
                                </label>
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
  htmlstring = `<article class="o-section o-section--xl">
                <div class="o-layout o-layout--gutter-xl o-layout--justify-center o-layout--align-center">
                    <div class="o-layout__item u-2-of-3-bp2 u-1-of-2-bp3">
                        <figure class="u-mb-lg">
                            <picture>
                            <input class="c-input-picture o-hide-accessible" type="checkbox" id="checkbox3">
                                <label class="c-label" for="checkbox3">
                                <img class="crewImage img" src="${crew.image}" alt="Picture" />
                                </label>
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
                            <input class="c-input-picture o-hide-accessible" type="checkbox" id="checkbox3">
                                <label class="c-label" for="checkbox3">
                                <img class="crewImage img" src="${crew.image}" alt="Picture" />
                                </label>
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
                            <input class="c-input-picture o-hide-accessible" type="checkbox" id="checkbox3">
                                <label class="c-label" for="checkbox3">
                                <img class="crewImage img" src="${crew.image}" alt="Picture" />
                                </label>
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


let convertData = (data) => {
  //reduce de data tot 1 object en return dat object
  //telt het aantal keer dat een raket voorkomt
  const counts = data.reduce((acc, launch) => {
    const rocketType = launch.rocket.rocket_name;
    if (rocketType in acc) {
      acc[rocketType]++;
    } else {
      acc[rocketType] = 1;
    }
    return acc;
  }, {});
  console.log(counts);
  //hier maak je er een grafiekje van met chart.js
  const ctx = document.getElementById('myChart').getContext('2d');
  const chart = new Chart(ctx, {
    type: 'bar',
    data: {
      //hier counts gebruiken om de data toe te voegen aan de grafiek
      labels: Object.keys(counts),
      datasets: [{
        label: 'Number of launches',
        data: Object.values(counts),
        backgroundColor: [
          //werk
          'rgba(255, 99, 132, 0.8)',
          'rgba(54, 162, 235, 0.8)',
          'rgba(255, 206, 86, 0.8)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)'
        ],
      }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  });

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
let getlaunches4Chart = () => {
  handleData(`https://api.spacexdata.com/v3/launches`, convertData, null, 'GET')
}
const listener = () => {
  console.log('listener is running');
  let button = document.querySelector('.js-button');
  button.addEventListener('click', function () {
    console.log('button clicked');
    let name = button.innerHTML;
    button.innerHTML = `<svg class="test" width="512" height="512" enable-background="new 0 0 416.449 416.449" version="1.1" viewBox="0 0 416.45 416.45" xml:space="preserve" xmlns="http://www.w3.org/2000/svg">
        <path d="m399.76 16.699c10.12 37.84 8.67 78.13-4.34 115.28h-0.01l-110.93-110.93v-0.01c37.15-13.01 77.44-14.46 115.28-4.34z" fill="#FF7124" />

        <path
          d="m90.21 207.93 87.14-101.42h0.01l33.71-39.24c21.43-21.43 46.6-36.84 73.41-46.23v0.01l110.93 110.93h0.01c-9.39 26.81-24.8 51.98-46.23 73.41l-140.67 120.85-118.31-118.31zm205.9-14.53c20.18-20.17 20.18-52.89 0-73.06-20.17-20.18-52.89-20.18-73.06 0-20.18 20.17-20.18 52.89 0 73.06 20.17 20.18 52.89 20.18 73.06 0z"
          fill="#F2D59F"
        />

        <path d="m309.95 239.1c1.74 45.6-14.8 91.78-49.61 126.59-10.69 10.68-22.44 19.65-34.93 26.89l-16.89-66.34 101.43-87.14z" fill="#F2D59F" />

        <path d="m296.11 120.34c20.18 20.17 20.18 52.89 0 73.06-20.17 20.18-52.89 20.18-73.06 0-20.18-20.17-20.18-52.89 0-73.06 20.17-20.18 52.89-20.18 73.06 0z" fill="#8ECAC1" />

        <path d="m208.52 326.24-39.94 14.71c-10.98 4.05-23.31 1.34-31.58-6.94l-6.85-6.85 48.8-30.49 29.57 29.57z" fill="#E6B263" />

        <polygon points="178.95 296.67 130.15 327.16 130.14 327.16 109.72 306.74 149.37 267.09" fill="#E6B263" />

        <path d="m177.35 106.51-87.14 101.42-66.33-16.88c7.24-12.49 16.21-24.24 26.89-34.93 34.81-34.81 80.97-51.35 126.58-49.61z" fill="#F2D59F" />

        <polygon points="149.37 267.09 109.72 306.74 89.3 286.31 119.79 237.51" fill="#E6B263" />

        <path d="m119.79 237.51-30.49 48.8-6.86-6.85c-8.27-8.28-10.98-20.6-6.94-31.58l14.71-39.95 29.58 29.58z" fill="#E6B263" />

        <path d="m28.88 339.46c-2.559 0-5.119-0.977-7.071-2.929-3.905-3.905-3.905-10.237 0-14.143l20.54-20.54c3.905-3.904 10.237-3.904 14.143 0 3.905 3.905 3.905 10.237 0 14.143l-20.54 20.54c-1.953 1.952-4.512 2.929-7.072 2.929z" fill="#5E2A41" />

        <path d="m10 416.44c-2.56 0-5.119-0.977-7.072-2.93-3.905-3.905-3.904-10.237 1e-3 -14.142l68.47-68.46c3.905-3.904 10.237-3.904 14.142 1e-3s3.904 10.237-2e-3 14.142l-68.47 68.46c-1.951 1.953-4.51 2.929-7.069 2.929z" fill="#5E2A41" />

        <path d="m73.29 411.26c-2.56 0-5.118-0.977-7.071-2.929-3.905-3.905-3.905-10.237 0-14.143l34.23-34.229c3.905-3.904 10.237-3.903 14.142 0 3.905 3.905 3.905 10.237 0 14.143l-34.23 34.229c-1.952 1.952-4.512 2.929-7.071 2.929z" fill="#5E2A41" />

        <path
          d="m208.52 336.24c-2.56 0-5.118-0.977-7.071-2.929l-118.31-118.31c-3.905-3.905-3.905-10.237 0-14.143 3.905-3.904 10.237-3.904 14.143 0l118.31 118.31c3.905 3.905 3.905 10.237 0 14.143-1.953 1.952-4.513 2.928-7.072 2.928z"
          fill="#5E2A41"
        />

        <path
          d="m259.58 218.53c-16.474 0-31.959-6.416-43.604-18.066-11.646-11.641-18.062-27.126-18.062-43.6s6.416-31.959 18.065-43.604c11.641-11.646 27.126-18.062 43.6-18.062s31.959 6.416 43.604 18.065c11.645 11.641 18.061 27.126 18.061 43.6 0 16.472-6.415 31.956-18.061 43.6-1e-3 2e-3 -1e-3 1e-3 -4e-3 4e-3 -11.643 11.648-27.127 18.063-43.599 18.063zm0-103.33c-11.13 0-21.592 4.334-29.457 12.204-7.874 7.869-12.208 18.331-12.208 29.461s4.334 21.592 12.204 29.457c7.869 7.874 18.331 12.208 29.461 12.208s21.592-4.334 29.457-12.204c2e-3 -1e-3 3e-3 -2e-3 4e-3 -4e-3 7.87-7.865 12.204-18.327 12.204-29.457s-4.334-21.592-12.204-29.457c-7.869-7.874-18.331-12.208-29.461-12.208z"
          fill="#5E2A41"
        />

        <path d="m89.291 296.31c-1.81 0-3.642-0.49-5.29-1.521-4.684-2.926-6.108-9.096-3.182-13.779l30.49-48.8c2.927-4.684 9.097-6.11 13.78-3.182 4.684 2.926 6.108 9.096 3.182 13.779l-30.49 48.8c-1.897 3.036-5.156 4.703-8.49 4.703z" fill="#5E2A41" />

        <path
          d="m109.72 316.74c-2.559 0-5.118-0.977-7.071-2.929-3.905-3.905-3.906-10.237-1e-3 -14.143l39.65-39.65c3.905-3.904 10.237-3.904 14.142 0 3.905 3.905 3.906 10.237 1e-3 14.142l-39.65 39.65c-1.952 1.954-4.512 2.93-7.071 2.93z"
          fill="#5E2A41"
        />

        <path
          d="m130.16 337.16c-3.334 0-6.593-1.666-8.49-4.702-2.926-4.684-1.501-10.854 3.182-13.779l48.8-30.49c4.683-2.929 10.853-1.503 13.78 3.182 2.926 4.684 1.501 10.853-3.182 13.779l-48.8 30.49c-1.649 1.03-3.48 1.52-5.29 1.52z"
          fill="#5E2A41"
        />

        <path
          d="m177.36 116.51c-2.307 0-4.625-0.794-6.512-2.415-4.189-3.599-4.668-9.912-1.069-14.102l33.71-39.24c3.598-4.188 9.911-4.668 14.102-1.068 4.189 3.599 4.668 9.912 1.068 14.101l-33.71 39.24c-1.977 2.302-4.775 3.484-7.589 3.484z"
          fill="#5E2A41"
        />

        <path
          d="m158.26 352.79c-10.448 0-20.723-4.085-28.34-11.712l-6.582-6.582c-0.093-0.086-0.184-0.173-0.273-0.263l-47.694-47.695c-10.992-11.006-14.623-27.531-9.259-42.109l14.71-39.952c0.413-1.12 1.022-2.157 1.799-3.061l87.14-101.42c3.601-4.188 9.913-4.667 14.102-1.068 4.189 3.6 4.667 9.913 1.068 14.102l-85.965 100.05-14.086 38.257c-2.682 7.289-0.864 15.556 4.632 21.059l47.432 47.433c0.092 0.086 0.184 0.173 0.273 0.263l6.85 6.85c5.497 5.504 13.756 7.318 21.048 4.63l38.252-14.089 139.3-119.68c4.191-3.6 10.504-3.119 14.102 1.068 3.6 4.189 3.121 10.503-1.068 14.102l-140.67 120.85c-0.904 0.777-1.94 1.387-3.059 1.799l-39.941 14.71c-4.479 1.652-9.143 2.454-13.771 2.454z"
          fill="#5E2A41"
        />

        <path
          d="m349.19 215.39c-2.559 0-5.118-0.977-7.071-2.929-3.905-3.905-3.905-10.237 0-14.143 19.885-19.884 34.642-43.315 43.863-69.644 11.736-33.512 13.626-69.25 5.536-103.73-34.48-8.089-70.221-6.199-103.73 5.536-26.329 9.221-49.761 23.979-69.645 43.863-3.905 3.904-10.236 3.905-14.143 0-3.905-3.905-3.905-10.237 0-14.143 22.025-22.024 47.991-38.375 77.176-48.596 39.158-13.711 81.058-15.29 121.17-4.561 3.454 0.924 6.152 3.622 7.076 7.076 10.728 40.114 9.151 82.014-4.563 121.17-10.221 29.185-26.571 55.15-48.596 77.175-1.952 1.952-4.511 2.929-7.071 2.929z"
          fill="#5E2A41"
        />

        <path
          d="m395.41 141.98c-2.56 0-5.118-0.977-7.071-2.929l-110.93-110.93c-3.905-3.905-3.905-10.237 0-14.143 3.908-3.905 10.238-3.903 14.143 0l110.93 110.93c3.905 3.905 3.905 10.237 0 14.143-1.954 1.952-4.513 2.929-7.072 2.929z"
          fill="#5E2A41"
        />

        <path
          d="m90.22 217.93c-0.832 0-1.67-0.104-2.477-0.309l-66.33-16.88c-3.037-0.773-5.537-2.926-6.751-5.814-1.215-2.889-1.005-6.181 0.566-8.892 7.778-13.418 17.355-25.86 28.467-36.982 35.281-35.281 84.119-54.445 133.99-52.537 5.369 0.176 9.671 4.583 9.671 9.994 0 5.522-4.472 10-9.995 10h-0.01c-0.127 0-0.254-2e-3 -0.381-7e-3 -44.338-1.699-87.765 15.325-119.13 46.688-6.684 6.689-12.742 13.914-18.101 21.576l52.73 13.419c4.435 1.024 7.745 4.998 7.745 9.743 0 5.523-4.472 10.001-9.995 10.001z"
          fill="#5E2A41"
        />

        <path
          d="m225.41 402.58c-1.315 0-2.633-0.259-3.876-0.782-2.89-1.215-5.042-3.714-5.815-6.75l-16.891-66.34c-1.363-5.353 1.872-10.796 7.224-12.158 5.349-1.366 10.795 1.871 12.158 7.223l13.48 52.948c7.663-5.359 14.889-11.419 21.581-18.104 31.36-31.36 48.378-74.785 46.684-119.14-0.21-5.519 4.093-10.163 9.611-10.374 5.509-0.233 10.164 4.093 10.375 9.611 1.903 49.897-17.243 98.755-52.532 134.04-11.124 11.113-23.567 20.691-36.986 28.47-1.542 0.895-3.275 1.348-5.013 1.348z"
          fill="#5E2A41"
        />
      </svg>`;
    button.classList.add('c-button--loading');
    /* make timer 2s */
    setTimeout(() => {
      button.innerHTML = "crewmate 1";
      button.classList.remove('c-button--loading');
    }, 2000);
  });
};
const listener1 = () => {
  console.log('listener is running');
  let button = document.querySelector('.js-button1');
  button.addEventListener('click', function () {
    console.log('button is clicked');
    let name = button.innerHTML;
    button.innerHTML = `<svg class="test" width="512" height="512" enable-background="new 0 0 416.449 416.449" version="1.1" viewBox="0 0 416.45 416.45" xml:space="preserve" xmlns="http://www.w3.org/2000/svg">
        <path d="m399.76 16.699c10.12 37.84 8.67 78.13-4.34 115.28h-0.01l-110.93-110.93v-0.01c37.15-13.01 77.44-14.46 115.28-4.34z" fill="#FF7124" />

        <path
          d="m90.21 207.93 87.14-101.42h0.01l33.71-39.24c21.43-21.43 46.6-36.84 73.41-46.23v0.01l110.93 110.93h0.01c-9.39 26.81-24.8 51.98-46.23 73.41l-140.67 120.85-118.31-118.31zm205.9-14.53c20.18-20.17 20.18-52.89 0-73.06-20.17-20.18-52.89-20.18-73.06 0-20.18 20.17-20.18 52.89 0 73.06 20.17 20.18 52.89 20.18 73.06 0z"
          fill="#F2D59F"
        />

        <path d="m309.95 239.1c1.74 45.6-14.8 91.78-49.61 126.59-10.69 10.68-22.44 19.65-34.93 26.89l-16.89-66.34 101.43-87.14z" fill="#F2D59F" />

        <path d="m296.11 120.34c20.18 20.17 20.18 52.89 0 73.06-20.17 20.18-52.89 20.18-73.06 0-20.18-20.17-20.18-52.89 0-73.06 20.17-20.18 52.89-20.18 73.06 0z" fill="#8ECAC1" />

        <path d="m208.52 326.24-39.94 14.71c-10.98 4.05-23.31 1.34-31.58-6.94l-6.85-6.85 48.8-30.49 29.57 29.57z" fill="#E6B263" />

        <polygon points="178.95 296.67 130.15 327.16 130.14 327.16 109.72 306.74 149.37 267.09" fill="#E6B263" />

        <path d="m177.35 106.51-87.14 101.42-66.33-16.88c7.24-12.49 16.21-24.24 26.89-34.93 34.81-34.81 80.97-51.35 126.58-49.61z" fill="#F2D59F" />

        <polygon points="149.37 267.09 109.72 306.74 89.3 286.31 119.79 237.51" fill="#E6B263" />

        <path d="m119.79 237.51-30.49 48.8-6.86-6.85c-8.27-8.28-10.98-20.6-6.94-31.58l14.71-39.95 29.58 29.58z" fill="#E6B263" />

        <path d="m28.88 339.46c-2.559 0-5.119-0.977-7.071-2.929-3.905-3.905-3.905-10.237 0-14.143l20.54-20.54c3.905-3.904 10.237-3.904 14.143 0 3.905 3.905 3.905 10.237 0 14.143l-20.54 20.54c-1.953 1.952-4.512 2.929-7.072 2.929z" fill="#5E2A41" />

        <path d="m10 416.44c-2.56 0-5.119-0.977-7.072-2.93-3.905-3.905-3.904-10.237 1e-3 -14.142l68.47-68.46c3.905-3.904 10.237-3.904 14.142 1e-3s3.904 10.237-2e-3 14.142l-68.47 68.46c-1.951 1.953-4.51 2.929-7.069 2.929z" fill="#5E2A41" />

        <path d="m73.29 411.26c-2.56 0-5.118-0.977-7.071-2.929-3.905-3.905-3.905-10.237 0-14.143l34.23-34.229c3.905-3.904 10.237-3.903 14.142 0 3.905 3.905 3.905 10.237 0 14.143l-34.23 34.229c-1.952 1.952-4.512 2.929-7.071 2.929z" fill="#5E2A41" />

        <path
          d="m208.52 336.24c-2.56 0-5.118-0.977-7.071-2.929l-118.31-118.31c-3.905-3.905-3.905-10.237 0-14.143 3.905-3.904 10.237-3.904 14.143 0l118.31 118.31c3.905 3.905 3.905 10.237 0 14.143-1.953 1.952-4.513 2.928-7.072 2.928z"
          fill="#5E2A41"
        />

        <path
          d="m259.58 218.53c-16.474 0-31.959-6.416-43.604-18.066-11.646-11.641-18.062-27.126-18.062-43.6s6.416-31.959 18.065-43.604c11.641-11.646 27.126-18.062 43.6-18.062s31.959 6.416 43.604 18.065c11.645 11.641 18.061 27.126 18.061 43.6 0 16.472-6.415 31.956-18.061 43.6-1e-3 2e-3 -1e-3 1e-3 -4e-3 4e-3 -11.643 11.648-27.127 18.063-43.599 18.063zm0-103.33c-11.13 0-21.592 4.334-29.457 12.204-7.874 7.869-12.208 18.331-12.208 29.461s4.334 21.592 12.204 29.457c7.869 7.874 18.331 12.208 29.461 12.208s21.592-4.334 29.457-12.204c2e-3 -1e-3 3e-3 -2e-3 4e-3 -4e-3 7.87-7.865 12.204-18.327 12.204-29.457s-4.334-21.592-12.204-29.457c-7.869-7.874-18.331-12.208-29.461-12.208z"
          fill="#5E2A41"
        />

        <path d="m89.291 296.31c-1.81 0-3.642-0.49-5.29-1.521-4.684-2.926-6.108-9.096-3.182-13.779l30.49-48.8c2.927-4.684 9.097-6.11 13.78-3.182 4.684 2.926 6.108 9.096 3.182 13.779l-30.49 48.8c-1.897 3.036-5.156 4.703-8.49 4.703z" fill="#5E2A41" />

        <path
          d="m109.72 316.74c-2.559 0-5.118-0.977-7.071-2.929-3.905-3.905-3.906-10.237-1e-3 -14.143l39.65-39.65c3.905-3.904 10.237-3.904 14.142 0 3.905 3.905 3.906 10.237 1e-3 14.142l-39.65 39.65c-1.952 1.954-4.512 2.93-7.071 2.93z"
          fill="#5E2A41"
        />

        <path
          d="m130.16 337.16c-3.334 0-6.593-1.666-8.49-4.702-2.926-4.684-1.501-10.854 3.182-13.779l48.8-30.49c4.683-2.929 10.853-1.503 13.78 3.182 2.926 4.684 1.501 10.853-3.182 13.779l-48.8 30.49c-1.649 1.03-3.48 1.52-5.29 1.52z"
          fill="#5E2A41"
        />

        <path
          d="m177.36 116.51c-2.307 0-4.625-0.794-6.512-2.415-4.189-3.599-4.668-9.912-1.069-14.102l33.71-39.24c3.598-4.188 9.911-4.668 14.102-1.068 4.189 3.599 4.668 9.912 1.068 14.101l-33.71 39.24c-1.977 2.302-4.775 3.484-7.589 3.484z"
          fill="#5E2A41"
        />

        <path
          d="m158.26 352.79c-10.448 0-20.723-4.085-28.34-11.712l-6.582-6.582c-0.093-0.086-0.184-0.173-0.273-0.263l-47.694-47.695c-10.992-11.006-14.623-27.531-9.259-42.109l14.71-39.952c0.413-1.12 1.022-2.157 1.799-3.061l87.14-101.42c3.601-4.188 9.913-4.667 14.102-1.068 4.189 3.6 4.667 9.913 1.068 14.102l-85.965 100.05-14.086 38.257c-2.682 7.289-0.864 15.556 4.632 21.059l47.432 47.433c0.092 0.086 0.184 0.173 0.273 0.263l6.85 6.85c5.497 5.504 13.756 7.318 21.048 4.63l38.252-14.089 139.3-119.68c4.191-3.6 10.504-3.119 14.102 1.068 3.6 4.189 3.121 10.503-1.068 14.102l-140.67 120.85c-0.904 0.777-1.94 1.387-3.059 1.799l-39.941 14.71c-4.479 1.652-9.143 2.454-13.771 2.454z"
          fill="#5E2A41"
        />

        <path
          d="m349.19 215.39c-2.559 0-5.118-0.977-7.071-2.929-3.905-3.905-3.905-10.237 0-14.143 19.885-19.884 34.642-43.315 43.863-69.644 11.736-33.512 13.626-69.25 5.536-103.73-34.48-8.089-70.221-6.199-103.73 5.536-26.329 9.221-49.761 23.979-69.645 43.863-3.905 3.904-10.236 3.905-14.143 0-3.905-3.905-3.905-10.237 0-14.143 22.025-22.024 47.991-38.375 77.176-48.596 39.158-13.711 81.058-15.29 121.17-4.561 3.454 0.924 6.152 3.622 7.076 7.076 10.728 40.114 9.151 82.014-4.563 121.17-10.221 29.185-26.571 55.15-48.596 77.175-1.952 1.952-4.511 2.929-7.071 2.929z"
          fill="#5E2A41"
        />

        <path
          d="m395.41 141.98c-2.56 0-5.118-0.977-7.071-2.929l-110.93-110.93c-3.905-3.905-3.905-10.237 0-14.143 3.908-3.905 10.238-3.903 14.143 0l110.93 110.93c3.905 3.905 3.905 10.237 0 14.143-1.954 1.952-4.513 2.929-7.072 2.929z"
          fill="#5E2A41"
        />

        <path
          d="m90.22 217.93c-0.832 0-1.67-0.104-2.477-0.309l-66.33-16.88c-3.037-0.773-5.537-2.926-6.751-5.814-1.215-2.889-1.005-6.181 0.566-8.892 7.778-13.418 17.355-25.86 28.467-36.982 35.281-35.281 84.119-54.445 133.99-52.537 5.369 0.176 9.671 4.583 9.671 9.994 0 5.522-4.472 10-9.995 10h-0.01c-0.127 0-0.254-2e-3 -0.381-7e-3 -44.338-1.699-87.765 15.325-119.13 46.688-6.684 6.689-12.742 13.914-18.101 21.576l52.73 13.419c4.435 1.024 7.745 4.998 7.745 9.743 0 5.523-4.472 10.001-9.995 10.001z"
          fill="#5E2A41"
        />

        <path
          d="m225.41 402.58c-1.315 0-2.633-0.259-3.876-0.782-2.89-1.215-5.042-3.714-5.815-6.75l-16.891-66.34c-1.363-5.353 1.872-10.796 7.224-12.158 5.349-1.366 10.795 1.871 12.158 7.223l13.48 52.948c7.663-5.359 14.889-11.419 21.581-18.104 31.36-31.36 48.378-74.785 46.684-119.14-0.21-5.519 4.093-10.163 9.611-10.374 5.509-0.233 10.164 4.093 10.375 9.611 1.903 49.897-17.243 98.755-52.532 134.04-11.124 11.113-23.567 20.691-36.986 28.47-1.542 0.895-3.275 1.348-5.013 1.348z"
          fill="#5E2A41"
        />
      </svg>`;
    button.classList.add('c-button--loading');
    /* make timer 2s */
    setTimeout(() => {
      button.innerHTML = "crewmate 2";
      button.classList.remove('c-button--loading');
    }, 2000);
  });
};
const listener2 = () => {
  console.log('listener is running');
  let button = document.querySelector('.js-button2');
  button.addEventListener('click', function () {
    console.log('button is clicked');
    let name = button.innerHTML;
    button.innerHTML = `<svg class="test" width="512" height="512" enable-background="new 0 0 416.449 416.449" version="1.1" viewBox="0 0 416.45 416.45" xml:space="preserve" xmlns="http://www.w3.org/2000/svg">
        <path d="m399.76 16.699c10.12 37.84 8.67 78.13-4.34 115.28h-0.01l-110.93-110.93v-0.01c37.15-13.01 77.44-14.46 115.28-4.34z" fill="#FF7124" />

        <path
          d="m90.21 207.93 87.14-101.42h0.01l33.71-39.24c21.43-21.43 46.6-36.84 73.41-46.23v0.01l110.93 110.93h0.01c-9.39 26.81-24.8 51.98-46.23 73.41l-140.67 120.85-118.31-118.31zm205.9-14.53c20.18-20.17 20.18-52.89 0-73.06-20.17-20.18-52.89-20.18-73.06 0-20.18 20.17-20.18 52.89 0 73.06 20.17 20.18 52.89 20.18 73.06 0z"
          fill="#F2D59F"
        />

        <path d="m309.95 239.1c1.74 45.6-14.8 91.78-49.61 126.59-10.69 10.68-22.44 19.65-34.93 26.89l-16.89-66.34 101.43-87.14z" fill="#F2D59F" />

        <path d="m296.11 120.34c20.18 20.17 20.18 52.89 0 73.06-20.17 20.18-52.89 20.18-73.06 0-20.18-20.17-20.18-52.89 0-73.06 20.17-20.18 52.89-20.18 73.06 0z" fill="#8ECAC1" />

        <path d="m208.52 326.24-39.94 14.71c-10.98 4.05-23.31 1.34-31.58-6.94l-6.85-6.85 48.8-30.49 29.57 29.57z" fill="#E6B263" />

        <polygon points="178.95 296.67 130.15 327.16 130.14 327.16 109.72 306.74 149.37 267.09" fill="#E6B263" />

        <path d="m177.35 106.51-87.14 101.42-66.33-16.88c7.24-12.49 16.21-24.24 26.89-34.93 34.81-34.81 80.97-51.35 126.58-49.61z" fill="#F2D59F" />

        <polygon points="149.37 267.09 109.72 306.74 89.3 286.31 119.79 237.51" fill="#E6B263" />

        <path d="m119.79 237.51-30.49 48.8-6.86-6.85c-8.27-8.28-10.98-20.6-6.94-31.58l14.71-39.95 29.58 29.58z" fill="#E6B263" />

        <path d="m28.88 339.46c-2.559 0-5.119-0.977-7.071-2.929-3.905-3.905-3.905-10.237 0-14.143l20.54-20.54c3.905-3.904 10.237-3.904 14.143 0 3.905 3.905 3.905 10.237 0 14.143l-20.54 20.54c-1.953 1.952-4.512 2.929-7.072 2.929z" fill="#5E2A41" />

        <path d="m10 416.44c-2.56 0-5.119-0.977-7.072-2.93-3.905-3.905-3.904-10.237 1e-3 -14.142l68.47-68.46c3.905-3.904 10.237-3.904 14.142 1e-3s3.904 10.237-2e-3 14.142l-68.47 68.46c-1.951 1.953-4.51 2.929-7.069 2.929z" fill="#5E2A41" />

        <path d="m73.29 411.26c-2.56 0-5.118-0.977-7.071-2.929-3.905-3.905-3.905-10.237 0-14.143l34.23-34.229c3.905-3.904 10.237-3.903 14.142 0 3.905 3.905 3.905 10.237 0 14.143l-34.23 34.229c-1.952 1.952-4.512 2.929-7.071 2.929z" fill="#5E2A41" />

        <path
          d="m208.52 336.24c-2.56 0-5.118-0.977-7.071-2.929l-118.31-118.31c-3.905-3.905-3.905-10.237 0-14.143 3.905-3.904 10.237-3.904 14.143 0l118.31 118.31c3.905 3.905 3.905 10.237 0 14.143-1.953 1.952-4.513 2.928-7.072 2.928z"
          fill="#5E2A41"
        />

        <path
          d="m259.58 218.53c-16.474 0-31.959-6.416-43.604-18.066-11.646-11.641-18.062-27.126-18.062-43.6s6.416-31.959 18.065-43.604c11.641-11.646 27.126-18.062 43.6-18.062s31.959 6.416 43.604 18.065c11.645 11.641 18.061 27.126 18.061 43.6 0 16.472-6.415 31.956-18.061 43.6-1e-3 2e-3 -1e-3 1e-3 -4e-3 4e-3 -11.643 11.648-27.127 18.063-43.599 18.063zm0-103.33c-11.13 0-21.592 4.334-29.457 12.204-7.874 7.869-12.208 18.331-12.208 29.461s4.334 21.592 12.204 29.457c7.869 7.874 18.331 12.208 29.461 12.208s21.592-4.334 29.457-12.204c2e-3 -1e-3 3e-3 -2e-3 4e-3 -4e-3 7.87-7.865 12.204-18.327 12.204-29.457s-4.334-21.592-12.204-29.457c-7.869-7.874-18.331-12.208-29.461-12.208z"
          fill="#5E2A41"
        />

        <path d="m89.291 296.31c-1.81 0-3.642-0.49-5.29-1.521-4.684-2.926-6.108-9.096-3.182-13.779l30.49-48.8c2.927-4.684 9.097-6.11 13.78-3.182 4.684 2.926 6.108 9.096 3.182 13.779l-30.49 48.8c-1.897 3.036-5.156 4.703-8.49 4.703z" fill="#5E2A41" />

        <path
          d="m109.72 316.74c-2.559 0-5.118-0.977-7.071-2.929-3.905-3.905-3.906-10.237-1e-3 -14.143l39.65-39.65c3.905-3.904 10.237-3.904 14.142 0 3.905 3.905 3.906 10.237 1e-3 14.142l-39.65 39.65c-1.952 1.954-4.512 2.93-7.071 2.93z"
          fill="#5E2A41"
        />

        <path
          d="m130.16 337.16c-3.334 0-6.593-1.666-8.49-4.702-2.926-4.684-1.501-10.854 3.182-13.779l48.8-30.49c4.683-2.929 10.853-1.503 13.78 3.182 2.926 4.684 1.501 10.853-3.182 13.779l-48.8 30.49c-1.649 1.03-3.48 1.52-5.29 1.52z"
          fill="#5E2A41"
        />

        <path
          d="m177.36 116.51c-2.307 0-4.625-0.794-6.512-2.415-4.189-3.599-4.668-9.912-1.069-14.102l33.71-39.24c3.598-4.188 9.911-4.668 14.102-1.068 4.189 3.599 4.668 9.912 1.068 14.101l-33.71 39.24c-1.977 2.302-4.775 3.484-7.589 3.484z"
          fill="#5E2A41"
        />

        <path
          d="m158.26 352.79c-10.448 0-20.723-4.085-28.34-11.712l-6.582-6.582c-0.093-0.086-0.184-0.173-0.273-0.263l-47.694-47.695c-10.992-11.006-14.623-27.531-9.259-42.109l14.71-39.952c0.413-1.12 1.022-2.157 1.799-3.061l87.14-101.42c3.601-4.188 9.913-4.667 14.102-1.068 4.189 3.6 4.667 9.913 1.068 14.102l-85.965 100.05-14.086 38.257c-2.682 7.289-0.864 15.556 4.632 21.059l47.432 47.433c0.092 0.086 0.184 0.173 0.273 0.263l6.85 6.85c5.497 5.504 13.756 7.318 21.048 4.63l38.252-14.089 139.3-119.68c4.191-3.6 10.504-3.119 14.102 1.068 3.6 4.189 3.121 10.503-1.068 14.102l-140.67 120.85c-0.904 0.777-1.94 1.387-3.059 1.799l-39.941 14.71c-4.479 1.652-9.143 2.454-13.771 2.454z"
          fill="#5E2A41"
        />

        <path
          d="m349.19 215.39c-2.559 0-5.118-0.977-7.071-2.929-3.905-3.905-3.905-10.237 0-14.143 19.885-19.884 34.642-43.315 43.863-69.644 11.736-33.512 13.626-69.25 5.536-103.73-34.48-8.089-70.221-6.199-103.73 5.536-26.329 9.221-49.761 23.979-69.645 43.863-3.905 3.904-10.236 3.905-14.143 0-3.905-3.905-3.905-10.237 0-14.143 22.025-22.024 47.991-38.375 77.176-48.596 39.158-13.711 81.058-15.29 121.17-4.561 3.454 0.924 6.152 3.622 7.076 7.076 10.728 40.114 9.151 82.014-4.563 121.17-10.221 29.185-26.571 55.15-48.596 77.175-1.952 1.952-4.511 2.929-7.071 2.929z"
          fill="#5E2A41"
        />

        <path
          d="m395.41 141.98c-2.56 0-5.118-0.977-7.071-2.929l-110.93-110.93c-3.905-3.905-3.905-10.237 0-14.143 3.908-3.905 10.238-3.903 14.143 0l110.93 110.93c3.905 3.905 3.905 10.237 0 14.143-1.954 1.952-4.513 2.929-7.072 2.929z"
          fill="#5E2A41"
        />

        <path
          d="m90.22 217.93c-0.832 0-1.67-0.104-2.477-0.309l-66.33-16.88c-3.037-0.773-5.537-2.926-6.751-5.814-1.215-2.889-1.005-6.181 0.566-8.892 7.778-13.418 17.355-25.86 28.467-36.982 35.281-35.281 84.119-54.445 133.99-52.537 5.369 0.176 9.671 4.583 9.671 9.994 0 5.522-4.472 10-9.995 10h-0.01c-0.127 0-0.254-2e-3 -0.381-7e-3 -44.338-1.699-87.765 15.325-119.13 46.688-6.684 6.689-12.742 13.914-18.101 21.576l52.73 13.419c4.435 1.024 7.745 4.998 7.745 9.743 0 5.523-4.472 10.001-9.995 10.001z"
          fill="#5E2A41"
        />

        <path
          d="m225.41 402.58c-1.315 0-2.633-0.259-3.876-0.782-2.89-1.215-5.042-3.714-5.815-6.75l-16.891-66.34c-1.363-5.353 1.872-10.796 7.224-12.158 5.349-1.366 10.795 1.871 12.158 7.223l13.48 52.948c7.663-5.359 14.889-11.419 21.581-18.104 31.36-31.36 48.378-74.785 46.684-119.14-0.21-5.519 4.093-10.163 9.611-10.374 5.509-0.233 10.164 4.093 10.375 9.611 1.903 49.897-17.243 98.755-52.532 134.04-11.124 11.113-23.567 20.691-36.986 28.47-1.542 0.895-3.275 1.348-5.013 1.348z"
          fill="#5E2A41"
        />
      </svg>`;
    button.classList.add('c-button--loading');
    /* make timer 2s */
    setTimeout(() => {
      button.innerHTML = "crewmate 3";
      button.classList.remove('c-button--loading');
    }, 2000);
  });
};

const listener3 = () => {
  console.log('listener is running');
  let button = document.querySelector('.js-button3');
  button.addEventListener('click', function () {
    console.log('button is clicked');
    let name = button.innerHTML;
    button.innerHTML = `<svg class="test" width="512" height="512" enable-background="new 0 0 416.449 416.449" version="1.1" viewBox="0 0 416.45 416.45" xml:space="preserve" xmlns="http://www.w3.org/2000/svg">
        <path d="m399.76 16.699c10.12 37.84 8.67 78.13-4.34 115.28h-0.01l-110.93-110.93v-0.01c37.15-13.01 77.44-14.46 115.28-4.34z" fill="#FF7124" />

        <path
          d="m90.21 207.93 87.14-101.42h0.01l33.71-39.24c21.43-21.43 46.6-36.84 73.41-46.23v0.01l110.93 110.93h0.01c-9.39 26.81-24.8 51.98-46.23 73.41l-140.67 120.85-118.31-118.31zm205.9-14.53c20.18-20.17 20.18-52.89 0-73.06-20.17-20.18-52.89-20.18-73.06 0-20.18 20.17-20.18 52.89 0 73.06 20.17 20.18 52.89 20.18 73.06 0z"
          fill="#F2D59F"
        />

        <path d="m309.95 239.1c1.74 45.6-14.8 91.78-49.61 126.59-10.69 10.68-22.44 19.65-34.93 26.89l-16.89-66.34 101.43-87.14z" fill="#F2D59F" />

        <path d="m296.11 120.34c20.18 20.17 20.18 52.89 0 73.06-20.17 20.18-52.89 20.18-73.06 0-20.18-20.17-20.18-52.89 0-73.06 20.17-20.18 52.89-20.18 73.06 0z" fill="#8ECAC1" />

        <path d="m208.52 326.24-39.94 14.71c-10.98 4.05-23.31 1.34-31.58-6.94l-6.85-6.85 48.8-30.49 29.57 29.57z" fill="#E6B263" />

        <polygon points="178.95 296.67 130.15 327.16 130.14 327.16 109.72 306.74 149.37 267.09" fill="#E6B263" />

        <path d="m177.35 106.51-87.14 101.42-66.33-16.88c7.24-12.49 16.21-24.24 26.89-34.93 34.81-34.81 80.97-51.35 126.58-49.61z" fill="#F2D59F" />

        <polygon points="149.37 267.09 109.72 306.74 89.3 286.31 119.79 237.51" fill="#E6B263" />

        <path d="m119.79 237.51-30.49 48.8-6.86-6.85c-8.27-8.28-10.98-20.6-6.94-31.58l14.71-39.95 29.58 29.58z" fill="#E6B263" />

        <path d="m28.88 339.46c-2.559 0-5.119-0.977-7.071-2.929-3.905-3.905-3.905-10.237 0-14.143l20.54-20.54c3.905-3.904 10.237-3.904 14.143 0 3.905 3.905 3.905 10.237 0 14.143l-20.54 20.54c-1.953 1.952-4.512 2.929-7.072 2.929z" fill="#5E2A41" />

        <path d="m10 416.44c-2.56 0-5.119-0.977-7.072-2.93-3.905-3.905-3.904-10.237 1e-3 -14.142l68.47-68.46c3.905-3.904 10.237-3.904 14.142 1e-3s3.904 10.237-2e-3 14.142l-68.47 68.46c-1.951 1.953-4.51 2.929-7.069 2.929z" fill="#5E2A41" />

        <path d="m73.29 411.26c-2.56 0-5.118-0.977-7.071-2.929-3.905-3.905-3.905-10.237 0-14.143l34.23-34.229c3.905-3.904 10.237-3.903 14.142 0 3.905 3.905 3.905 10.237 0 14.143l-34.23 34.229c-1.952 1.952-4.512 2.929-7.071 2.929z" fill="#5E2A41" />

        <path
          d="m208.52 336.24c-2.56 0-5.118-0.977-7.071-2.929l-118.31-118.31c-3.905-3.905-3.905-10.237 0-14.143 3.905-3.904 10.237-3.904 14.143 0l118.31 118.31c3.905 3.905 3.905 10.237 0 14.143-1.953 1.952-4.513 2.928-7.072 2.928z"
          fill="#5E2A41"
        />

        <path
          d="m259.58 218.53c-16.474 0-31.959-6.416-43.604-18.066-11.646-11.641-18.062-27.126-18.062-43.6s6.416-31.959 18.065-43.604c11.641-11.646 27.126-18.062 43.6-18.062s31.959 6.416 43.604 18.065c11.645 11.641 18.061 27.126 18.061 43.6 0 16.472-6.415 31.956-18.061 43.6-1e-3 2e-3 -1e-3 1e-3 -4e-3 4e-3 -11.643 11.648-27.127 18.063-43.599 18.063zm0-103.33c-11.13 0-21.592 4.334-29.457 12.204-7.874 7.869-12.208 18.331-12.208 29.461s4.334 21.592 12.204 29.457c7.869 7.874 18.331 12.208 29.461 12.208s21.592-4.334 29.457-12.204c2e-3 -1e-3 3e-3 -2e-3 4e-3 -4e-3 7.87-7.865 12.204-18.327 12.204-29.457s-4.334-21.592-12.204-29.457c-7.869-7.874-18.331-12.208-29.461-12.208z"
          fill="#5E2A41"
        />

        <path d="m89.291 296.31c-1.81 0-3.642-0.49-5.29-1.521-4.684-2.926-6.108-9.096-3.182-13.779l30.49-48.8c2.927-4.684 9.097-6.11 13.78-3.182 4.684 2.926 6.108 9.096 3.182 13.779l-30.49 48.8c-1.897 3.036-5.156 4.703-8.49 4.703z" fill="#5E2A41" />

        <path
          d="m109.72 316.74c-2.559 0-5.118-0.977-7.071-2.929-3.905-3.905-3.906-10.237-1e-3 -14.143l39.65-39.65c3.905-3.904 10.237-3.904 14.142 0 3.905 3.905 3.906 10.237 1e-3 14.142l-39.65 39.65c-1.952 1.954-4.512 2.93-7.071 2.93z"
          fill="#5E2A41"
        />

        <path
          d="m130.16 337.16c-3.334 0-6.593-1.666-8.49-4.702-2.926-4.684-1.501-10.854 3.182-13.779l48.8-30.49c4.683-2.929 10.853-1.503 13.78 3.182 2.926 4.684 1.501 10.853-3.182 13.779l-48.8 30.49c-1.649 1.03-3.48 1.52-5.29 1.52z"
          fill="#5E2A41"
        />

        <path
          d="m177.36 116.51c-2.307 0-4.625-0.794-6.512-2.415-4.189-3.599-4.668-9.912-1.069-14.102l33.71-39.24c3.598-4.188 9.911-4.668 14.102-1.068 4.189 3.599 4.668 9.912 1.068 14.101l-33.71 39.24c-1.977 2.302-4.775 3.484-7.589 3.484z"
          fill="#5E2A41"
        />

        <path
          d="m158.26 352.79c-10.448 0-20.723-4.085-28.34-11.712l-6.582-6.582c-0.093-0.086-0.184-0.173-0.273-0.263l-47.694-47.695c-10.992-11.006-14.623-27.531-9.259-42.109l14.71-39.952c0.413-1.12 1.022-2.157 1.799-3.061l87.14-101.42c3.601-4.188 9.913-4.667 14.102-1.068 4.189 3.6 4.667 9.913 1.068 14.102l-85.965 100.05-14.086 38.257c-2.682 7.289-0.864 15.556 4.632 21.059l47.432 47.433c0.092 0.086 0.184 0.173 0.273 0.263l6.85 6.85c5.497 5.504 13.756 7.318 21.048 4.63l38.252-14.089 139.3-119.68c4.191-3.6 10.504-3.119 14.102 1.068 3.6 4.189 3.121 10.503-1.068 14.102l-140.67 120.85c-0.904 0.777-1.94 1.387-3.059 1.799l-39.941 14.71c-4.479 1.652-9.143 2.454-13.771 2.454z"
          fill="#5E2A41"
        />

        <path
          d="m349.19 215.39c-2.559 0-5.118-0.977-7.071-2.929-3.905-3.905-3.905-10.237 0-14.143 19.885-19.884 34.642-43.315 43.863-69.644 11.736-33.512 13.626-69.25 5.536-103.73-34.48-8.089-70.221-6.199-103.73 5.536-26.329 9.221-49.761 23.979-69.645 43.863-3.905 3.904-10.236 3.905-14.143 0-3.905-3.905-3.905-10.237 0-14.143 22.025-22.024 47.991-38.375 77.176-48.596 39.158-13.711 81.058-15.29 121.17-4.561 3.454 0.924 6.152 3.622 7.076 7.076 10.728 40.114 9.151 82.014-4.563 121.17-10.221 29.185-26.571 55.15-48.596 77.175-1.952 1.952-4.511 2.929-7.071 2.929z"
          fill="#5E2A41"
        />

        <path
          d="m395.41 141.98c-2.56 0-5.118-0.977-7.071-2.929l-110.93-110.93c-3.905-3.905-3.905-10.237 0-14.143 3.908-3.905 10.238-3.903 14.143 0l110.93 110.93c3.905 3.905 3.905 10.237 0 14.143-1.954 1.952-4.513 2.929-7.072 2.929z"
          fill="#5E2A41"
        />

        <path
          d="m90.22 217.93c-0.832 0-1.67-0.104-2.477-0.309l-66.33-16.88c-3.037-0.773-5.537-2.926-6.751-5.814-1.215-2.889-1.005-6.181 0.566-8.892 7.778-13.418 17.355-25.86 28.467-36.982 35.281-35.281 84.119-54.445 133.99-52.537 5.369 0.176 9.671 4.583 9.671 9.994 0 5.522-4.472 10-9.995 10h-0.01c-0.127 0-0.254-2e-3 -0.381-7e-3 -44.338-1.699-87.765 15.325-119.13 46.688-6.684 6.689-12.742 13.914-18.101 21.576l52.73 13.419c4.435 1.024 7.745 4.998 7.745 9.743 0 5.523-4.472 10.001-9.995 10.001z"
          fill="#5E2A41"
        />

        <path
          d="m225.41 402.58c-1.315 0-2.633-0.259-3.876-0.782-2.89-1.215-5.042-3.714-5.815-6.75l-16.891-66.34c-1.363-5.353 1.872-10.796 7.224-12.158 5.349-1.366 10.795 1.871 12.158 7.223l13.48 52.948c7.663-5.359 14.889-11.419 21.581-18.104 31.36-31.36 48.378-74.785 46.684-119.14-0.21-5.519 4.093-10.163 9.611-10.374 5.509-0.233 10.164 4.093 10.375 9.611 1.903 49.897-17.243 98.755-52.532 134.04-11.124 11.113-23.567 20.691-36.986 28.47-1.542 0.895-3.275 1.348-5.013 1.348z"
          fill="#5E2A41"
        />
      </svg>`;
    button.classList.add('c-button--loading');
    /* make timer 2s */
    setTimeout(() => {
      button.innerHTML = "crewmate 4";
      button.classList.remove('c-button--loading');
    }, 2000);
  });
};

document.addEventListener('DOMContentLoaded', function () {
  getMission();
  getlaunches4Chart();
  listener();
  listener1();
  listener2();
  listener3();
  // drawchart();
});