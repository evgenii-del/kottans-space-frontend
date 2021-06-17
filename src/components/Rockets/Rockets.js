import React, { useEffect, useState } from 'react';

import { getRockets } from '../../data/spaceXAPI';
import { RocketCard } from '../RocketCard/RocketCard';
import styles from './Rockets.css';

export function Rockets() {
  const [selectedRocket, setSelectedRocket] = useState('Falcon 1');
  const [rockets, setRockets] = useState();

  const selectRocket = rocket => {
    setSelectedRocket(rocket);
  };

  useEffect(async () => {
    const res = await getRockets();
    setRockets(res);
  }, []);

  if (!rockets) {
    return <p>No rockets</p>;
  }

  return (
    <div>
      <h2>Rockets</h2>
      <div className={styles.rockets__menu}>
        {rockets.map(({ name }) => (
          <label
            key={name}
            className={
              name === selectedRocket
                ? `${styles.rockets__label} ${styles.rockets__label_active}`
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
      <RocketCard rockets={rockets} selectedRocket={selectedRocket}></RocketCard>
    </div>
  );
}
