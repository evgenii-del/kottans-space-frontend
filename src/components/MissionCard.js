/** @jsx createElement */
/** @jsxFrag createFragment */
import { createElement } from '../framework/element';

export function MissionCard({ wikipedia, mission_name, description }) {
  return (
    <div>
      <a href={wikipedia}>${mission_name}</a>
      <p>${description}</p>
    </div>
  );
}
