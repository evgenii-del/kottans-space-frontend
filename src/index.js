import React from 'react';
import { render } from 'react-dom';

import { App } from './components/App';

if (module.not) {
  module.not.accept();
}

render(<App />, document.getElementById('app-root'));
