import { dataStore } from './data/dataStore';
import renderApp from './framework/render';
import { validateAndGetData } from './data/spaceData';
import { App } from './components/App';

if (module.not) {
  module.not.accept();
}

window.dataStore = dataStore;

renderApp(App, document.getElementById('app-root'));
validateAndGetData();
