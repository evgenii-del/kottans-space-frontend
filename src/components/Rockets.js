/** @jsx createElement */
/** @jsxFrag createFragment */
import { createElement } from '../framework/element';
import { RocketCard } from './RocketCard';
import renderApp from '../framework/render';

const selectRocket = rocket => {
  window.dataStore.selectedRocket = rocket;
  renderApp();
};

export function Rockets() {
  const { rockets, selectedRocket } = window.dataStore;
  return (
    <div>
      <h2>Rockets</h2>
      <div>
        {rockets.map(({ rocket_name }) => (
          <label>
            {rocket_name}
            <input
              className="rocket-radio"
              type="radio"
              value={rocket_name}
              name="missions"
              onChange={({ target }) => selectRocket(target.value)}
              checked={rocket_name === selectedRocket}
            />
          </label>
        ))}
      </div>
      {rockets.length ? (
        RocketCard(rockets.find(({ rocket_name }) => rocket_name === selectedRocket))
      ) : (
        <p>No rockets</p>
      )}
    </div>
  );
}
