import renderApp from '../framework/render';
import { App } from '../components/App';

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

export function validateAndGetData() {
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
      renderApp(App, 'app-root');
    })
    .catch(error => {
      window.dataStore.isDataLoading = false;
      window.dataStore.error = error;
    });
}
