import React from 'react';

import { Rockets } from './Rockets/Rockets';
import { Missions } from './Missions/Missions';
import { Event } from './Event/Event';
import styles from './App.css';

export function App() {
  return (
    <div className={styles.wrapper}>
      <h1>SpaceX info app</h1>
      <Rockets />
      <Missions />
      <Event />
    </div>
  );
}
