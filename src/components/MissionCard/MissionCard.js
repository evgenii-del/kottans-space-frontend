import React from 'react';

import styles from './MissionCard.css';

export function MissionCard({ missions, selectedMission }) {
  const { wikipedia, mission_name, description } = missions.find(
    ({ mission_name }) => mission_name === selectedMission,
  );
  return (
    <div>
      <h3 className={styles.card__title}>
        <a href={wikipedia}>{mission_name}</a>
      </h3>
      <p>{description}</p>
    </div>
  );
}
