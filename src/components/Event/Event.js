import React, { useEffect, useState } from 'react';

import { getHistories } from '../../data/spaceXAPI';
import { getRandomInt } from '../../utils';
import styles from './Event.css';

export function Event() {
  const [event, setEvent] = useState();

  useEffect(async () => {
    const res = await getHistories();
    const randomId = getRandomInt(res.length);
    setEvent(res[randomId]);
  }, []);


  // if(!event) <p>No events</p>
  //
  // return (
  //     <div className={styles.event}>
  //       <h2 className={styles.event__title}>{event.title}</h2>
  //       <p>{event.details}</p>
  //     </div>



  return event ? (
    <div className={styles.event}>
      <h2 className={styles.event__title}>{event.title}</h2>
      <p>{event.details}</p>
    </div>
  ) : (
      <p>No events</p>
  );
}
