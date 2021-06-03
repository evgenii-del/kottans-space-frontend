/** @jsx createElement */
/** @jsxFrag createFragment */
import { createElement } from '../../framework';
import { getRandomInt } from '../../utils';
import styles from './Event.css';
import { useEffect, useState } from '../../framework';

export function Event() {
  const [event, setEvent] = useState();

  useEffect(() => {
    fetch('https://api.spacexdata.com/v4/history')
      .then(res => res.json())
      .then(res => {
        const randomId = getRandomInt(res.length);
        setEvent(res[randomId]);
      });
  }, []);

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
