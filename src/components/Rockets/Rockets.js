/** @jsx createElement */
/** @jsxFrag createFragment */
import { createElement } from '../../framework';
import { RocketCard } from '../RocketCard/RocketCard';
import { useEffect, useState } from '../../framework';
import styles from './Rockets.css';

export function Rockets() {
  const [selectedRocket, setSelectedRocket] = useState('Falcon 1');
  const [rockets, setRockets] = useState();

  const selectRocket = rocket => {
    setSelectedRocket(rocket);
  };

  useEffect(() => {
    fetch('https://api.spacexdata.com/v4/rockets')
      .then(res => res.json())
      .then(res => setRockets(res));
  }, []);

  return (
    <div>
      <h2>Rockets</h2>
      <div className={styles.rockets__menu}>
        {rockets &&
          rockets.map(({ name }) => (
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
      {rockets && rockets.length ? (
        RocketCard(rockets.find(({ name }) => name === selectedRocket))
      ) : (
        <p>No rockets</p>
      )}
    </div>
  );
}
