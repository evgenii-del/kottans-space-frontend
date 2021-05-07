// Start from here

import { getRandomInt } from './utils';

if (module.not) {
  module.not.accept();
}

window.dataStore = {
  rockets: [],
  missions: [],
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

function Rockets() {
  return `<div>
        <h2>Rockets</h2>
        ${window.dataStore.rockets.map(
          rocket => `<div>
            <div>
                <img src="${rocket.flickr_images[0]}" alt="${rocket.rocket_name}">
                <p>${rocket.description}</p>
            </div>
            <div>
                <h3><a href="${rocket.wikipedia}">${rocket.rocket_name}</a></h3>
                <table>
                    <tbody>
                        <tr>
                            <td>HEIGHT:</td>
                            <td>${rocket.height.meters} m</td>
                        </tr>
                        <tr>
                            <td>DIAMETER:</td>
                            <td>${rocket.diameter.meters} m</td>
                        </tr>
                        <tr>
                            <td>MASS:</td>
                            <td>${rocket.mass.kg} kg</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>`,
        )}
    </div>`;
}

function MissionCard({ wikipedia, mission_name, description }) {
  return `<div>
            <a href="${wikipedia}">${mission_name}</a>
            <p>${description}</p>
        </div>`;
}

function Missions() {
  return `<div>
        <h2>Missions</h2>
        ${window.dataStore.missions.map(mission => MissionCard(mission))}
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
  return `<div>
        <h1>SpaceX info app</h1>
        ${Rockets()}
        <hr>
        ${Missions()}
        <hr>
        ${Event()}
    </div>`;
}
