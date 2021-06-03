import { render } from './framework';
import { App } from './components/App';

if (module.not) {
  module.not.accept();
}

render(App, document.getElementById('app-root'));
