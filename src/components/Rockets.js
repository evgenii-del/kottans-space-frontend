import { RocketCard } from './RocketCard';

export function Rockets() {
  const { rockets, selectedRocket } = window.dataStore;
  return `<div>
        <h2>Rockets</h2>
        <div>
        ${rockets.map(
          ({ rocket_name }) =>
            `<label>${rocket_name}<input class="rocket-radio" type="radio" value="${rocket_name}" name="missions" ${
              rocket_name === selectedRocket ? 'checked' : ''
            }/></label>`,
        )}
        </div>
       ${
         rockets.length
           ? RocketCard(rockets.find(({ rocket_name }) => rocket_name === selectedRocket))
           : `<p>No rockets</p>`
       }
    </div>`;
}
