/** @jsx createElement */
/** @jsxFrag createFragment */
import { createElement } from '../../framework/element';
import { getRandomInt } from '../../utils';
import styles from './Event.css';

export function Event() {
  const randomId = getRandomInt(window.dataStore.histories.length);
  const event = window.dataStore.histories[randomId];

  if (event) {
    return (
      <div className={styles.event}>
        <h2 className={styles.event__title}>{event.title}</h2>
        <p>{event.details}</p>
      </div>
    );
  }
  return <p>No events</p>;
}
