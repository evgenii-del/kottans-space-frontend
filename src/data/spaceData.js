import renderApp from '../framework/render';
import { getHistories, getLandpads, getRockets } from './spaceXAPI';

export function validateAndGetData() {
  window.dataStore.isDataLoading = true;
  window.dataStore.error = null;

  Promise.all([getRockets(), getLandpads(), getHistories()])
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
      renderApp();
    });
}
