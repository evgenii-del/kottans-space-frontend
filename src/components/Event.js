/** @jsx createElement */
/** @jsxFrag createFragment */
import { createElement } from '../framework/element';
import { getRandomInt } from '../utils';

export function Event() {
  const randomId = getRandomInt(window.dataStore.histories.length);
  const event = window.dataStore.histories[randomId];

  if (event) {
    return (
      <div>
        <h2>Random event</h2>
        <div>
          <p>${event.title}</p>
          <p>${event.details}</p>
        </div>
      </div>
    );
  }
  return '<p>No events</p>';
}
