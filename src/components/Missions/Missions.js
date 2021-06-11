import React, { useEffect, useState } from 'react';
import { MissionCard } from '../MissionCard/MissionCard';
import styles from './Missions.css';

export function Missions() {
  const [selectedMission, setSelectedMission] = useState('Landing Zone 1');
  const [missions, setMissions] = useState();

  const selectMission = mission => {
    setSelectedMission(mission);
  };

  useEffect(() => {
    fetch('https://api.spacexdata.com/v4/landpads')
      .then(res => res.json())
      .then(res => setMissions(res));
  }, []);

  return (
    <div>
      <h2>Missions</h2>
      <div className={styles.missions__menu}>
        {missions &&
          missions.map(({ full_name, name }) => (
            <label
              key={name}
              className={
                full_name === selectedMission
                  ? `${styles.missions__label} ${styles.missions__label_active}`
                  : styles.missions__label
              }
            >
              <span>{name}</span>
              <input
                className={styles.missions__input}
                type="radio"
                value={full_name}
                name="rockets"
                onChange={({ target }) => selectMission(target.value)}
                checked={full_name === selectedMission}
              />
            </label>
          ))}
      </div>
      {missions && missions.length
        ? MissionCard(missions.find(({ full_name }) => full_name === selectedMission))
        : `<p>No missions</p>`}
    </div>
  );
}
