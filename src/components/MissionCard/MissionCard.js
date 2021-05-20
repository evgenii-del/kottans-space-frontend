/** @jsx createElement */
/** @jsxFrag createFragment */
import { createElement } from '../../framework/element';
import styles from './MissionCard.css';

export function MissionCard({ wikipedia, full_name, details }) {
  return (
    <div>
      <h3 className={styles.card__title}>
        <a href={wikipedia}>{full_name}</a>
      </h3>
      <p>{details}</p>
    </div>
  );
}
