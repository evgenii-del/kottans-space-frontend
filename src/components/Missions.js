/** @jsx createElement */
/** @jsxFrag createFragment */
import { createElement } from '../framework/element';
import { MissionCard } from './MissionCard';
import renderApp from '../framework/render';

const selectMission = mission => {
  window.dataStore.selectedMission = mission;
  renderApp();
};

export function Missions() {
  const { missions, selectedMission } = window.dataStore;
  return (
    <div>
      <h2>Missions</h2>
      <div>
        {missions.map(({ mission_name }) => (
          <label>
            {mission_name}
            <input
              className="mission-radio"
              type="radio"
              value={mission_name}
              name="rockets"
              onChange={({ target }) => selectMission(target.value)}
              checked={mission_name === selectedMission}
            />
          </label>
        ))}
      </div>
      {missions.length
        ? MissionCard(missions.find(({ mission_name }) => mission_name === selectedMission))
        : `<p>No missions</p>`}
    </div>
  );
}
