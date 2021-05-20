/** @jsx createElement */
/** @jsxFrag createFragment */
import { createElement } from '../../framework/element';
import { MissionCard } from '../MissionCard/MissionCard';
import renderApp from '../../framework/render';
import styles from './Missions.css';

const selectMission = mission => {
  window.dataStore.selectedMission = mission;
  renderApp();
};

export function Missions() {
  const { missions, selectedMission } = window.dataStore;
  return (
    <div>
      <h2>Missions</h2>
      <div className={styles.missions__menu}>
        {missions.map(({ full_name, name }) => (
          <label
            className={
              full_name === selectedMission
                ? [styles.missions__label, styles.missions__label_active]
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
      {missions.length
        ? MissionCard(missions.find(({ full_name }) => full_name === selectedMission))
        : `<p>No missions</p>`}
    </div>
  );
}
