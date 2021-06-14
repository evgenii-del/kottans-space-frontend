import React, { useEffect, useState } from 'react';

import { getMissions } from '../../data/spaceXAPI';
import { MissionCard } from '../MissionCard/MissionCard';
import styles from './Missions.css';

export function Missions() {
  const [selectedMission, setSelectedMission] = useState('Thaicom');
  const [missions, setMissions] = useState();

  const selectMission = mission => {
    setSelectedMission(mission);
  };

  useEffect(async () => {
    const res = await getMissions();
    setMissions(res);
  }, []);

  return (
    <div>
      <h2>Missions</h2>
      <div className={styles.missions__menu}>
        {missions &&
          missions.map(({ mission_name, mission_id }) => (
            <label
              key={mission_id}
              className={
                mission_name === selectedMission
                  ? `${styles.missions__label} ${styles.missions__label_active}`
                  : styles.missions__label
              }
            >
              <span>{mission_name}</span>
              <input
                className={styles.missions__input}
                type="radio"
                value={mission_name}
                name="rockets"
                onChange={({ target }) => selectMission(target.value)}
                checked={mission_name === selectedMission}
              />
            </label>
          ))}
      </div>
      {missions && missions.length
        ? MissionCard(missions.find(({ mission_name }) => mission_name === selectedMission)) //todo
        : `<p>No missions</p>`}
    </div>
  );
}
