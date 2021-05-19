import { dataStore } from './data/dataStore';
import renderApp from './framework/render';
import { validateAndGetData } from './data/spaceData';

if (module.not) {
  module.not.accept();
}

window.dataStore = dataStore;
window.renderApp = renderApp;
window.validateAndGetData = validateAndGetData;

validateAndGetData();
