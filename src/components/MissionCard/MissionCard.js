import React from 'react';

import styles from './MissionCard.css';

export function MissionCard({ wikipedia, mission_name, description }) {
  return (
    <div>
      <h3 className={styles.card__title}>
        <a href={wikipedia}>{mission_name}</a>
      </h3>
      <p>{description}</p>
    </div>
  );
}
