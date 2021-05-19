import { Rockets } from './Rockets';
import { Missions } from './Missions';
import { Event } from './Event';

export function App() {
  if (window.dataStore.isDataLoading) {
    return `<div>Loading...</div>`;
  } else {
    return `<div>
        <h1>SpaceX info app</h1>
        ${Rockets()}
        <hr>
        ${Missions()}
        <hr>
        ${Event()}
    </div>`;
  }
}
