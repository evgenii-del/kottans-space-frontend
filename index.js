// Start from here

import { getRandomInt } from './utils';

if (module.not) {
  module.not.accept();
}

window.dataStore = {
  rockets: [],
  selectedRocket: 'Falcon 1',
  missions: [],
  selectedMission: 'Thaicom',
  histories: [],
  isDataLoading: false,
  error: null,
};

function renderApp() {
  document.getElementById('app-root').innerHTML = `${App()}`;
}

window.renderApp = renderApp;

function getRockets() {
  return fetch('https://api.spacexdata.com/v3/rockets')
    .then(res => res.json())
    .then(res => res);
}

function getMissions() {
  return fetch('https://api.spacexdata.com/v3/missions')
    .then(res => res.json())
    .then(res => res);
}

function getHistories() {
  return fetch('https://api.spacexdata.com/v3/history')
    .then(res => res.json())
    .then(res => res);
}

function validateAndGetData() {
  window.dataStore.isDataLoading = true;
  window.dataStore.error = null;

  Promise.all([getRockets(), getMissions(), getHistories()])
    .then(values => {
      window.dataStore = {
        ...window.dataStore,
        rockets: values[0],
        missions: values[1],
        histories: values[2],
      };
      window.dataStore.isDataLoading = false;
      renderApp();
    })
    .catch(error => {
      window.dataStore.isDataLoading = false;
      window.dataStore.error = error;
    });
}

validateAndGetData();

function RocketCard({
  rocket_name,
  description,
  flickr_images,
  wikipedia,
  height,
  diameter,
  mass,
}) {
  return `<div>
            <div>
                <img src="${flickr_images[0]}" alt="${rocket_name}">
                <p>${description}</p>
            </div>
            <div>
                <h3><a href="${wikipedia}">${rocket_name}</a></h3>
                <table>
                    <tbody>
                        <tr>
                            <td>HEIGHT:</td>
                            <td>${height.meters} m</td>
                        </tr>
                        <tr>
                            <td>DIAMETER:</td>
                            <td>${diameter.meters} m</td>
                        </tr>
                        <tr>
                            <td>MASS:</td>
                            <td>${mass.kg} kg</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>`;
}

const selectRocket = rocket => {
  window.dataStore.selectedRocket = rocket;
  renderApp();
};

function Rockets(handler) {
  return `<div>
        <h2>Rockets</h2>
        <div>
        ${window.dataStore.rockets.map(
          ({ rocket_name }) =>
            `<label>${rocket_name}<input type="radio" value="${rocket_name}" name="missions" onchange="(${handler})(this.value)" ${
              rocket_name === window.dataStore.selectedRocket ? 'checked' : ''
            }/></label>`,
        )}
        </div>
       ${RocketCard(
         window.dataStore.rockets.find(
           ({ rocket_name }) => rocket_name === window.dataStore.selectedRocket,
         ),
       )}
    </div>`;
}

function MissionCard({ wikipedia, mission_name, description }) {
  return `<div>
            <a href="${wikipedia}">${mission_name}</a>
            <p>${description}</p>
        </div>`;
}

const selectMission = mission => {
  window.dataStore.selectedMission = mission;
  renderApp();
};

function Missions(handler) {
  return `<div>
        <h2>Missions</h2>
        <div>
        ${window.dataStore.missions.map(
          ({ mission_name }) =>
            `<label>${mission_name}<input type="radio" value="${mission_name}" name="rockets" ${
              mission_name === window.dataStore.selectedMission ? 'checked' : ''
            } onchange="(${handler})(this.value)"/></label>`,
        )}
        </div>
        ${MissionCard(
          window.dataStore.missions.find(
            ({ mission_name }) => mission_name === window.dataStore.selectedMission,
          ),
        )}
    </div>`;
}

function Event() {
  const randomId = getRandomInt(window.dataStore.histories.length);
  const event = window.dataStore.histories[randomId];

  return `<div>
      <h2>Random event</h2>
      <div>
          <p>${event.title}</p>
          <p>${event.details}</p>
      </div>
  </div>`;
}

function App() {
  if (window.dataStore.isDataLoading) {
    return `<div>Loading...</div>`;
  } else {
    return `<div>
        <h1>SpaceX info app</h1>
        ${Rockets(selectRocket)}
        <hr>
        ${Missions(selectMission)}
        <hr>
        ${Event()}
    </div>`;
  }
}
