import { MissionCard } from './MissionCard';

export function Missions() {
  const { missions, selectedMission } = window.dataStore;
  return `<div>
        <h2>Missions</h2>
        <div>
        ${missions.map(
          ({ mission_name }) =>
            `<label>${mission_name}<input class="mission-radio" type="radio" value="${mission_name}" name="rockets" ${
              mission_name === selectedMission ? 'checked' : ''
            }/></label>`,
        )}
        </div>
        ${
          missions.length
            ? MissionCard(missions.find(({ mission_name }) => mission_name === selectedMission))
            : `<p>No missions</p>`
        }
    </div>`;
}
