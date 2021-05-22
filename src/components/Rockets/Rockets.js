/** @jsx createElement */
/** @jsxFrag createFragment */
import { createElement } from '../../framework/element';
import { RocketCard } from '../RocketCard/RocketCard';
import renderApp from '../../framework/render';
import styles from './Rockets.css';

const selectRocket = rocket => {
  window.dataStore.selectedRocket = rocket;
  renderApp();
};

export function Rockets() {
  const { rockets, selectedRocket } = window.dataStore;
  return (
    <div>
      <h2>Rockets</h2>
      <div className={styles.rockets__menu}>
        {rockets.map(({ name }) => (
          <label
            className={
              name === selectedRocket
                ? [styles.rockets__label, styles.rockets__label_active]
                : styles.rockets__label
            }
          >
            <span>{name}</span>
            <input
              className={styles.rockets__input}
              type="radio"
              value={name}
              name="missions"
              onChange={({ target }) => selectRocket(target.value)}
              checked={name === selectedRocket}
            />
          </label>
        ))}
      </div>
      {rockets.length ? (
        RocketCard(rockets.find(({ name }) => name === selectedRocket))
      ) : (
        <p>No rockets</p>
      )}
    </div>
  );
}
