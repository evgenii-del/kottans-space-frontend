import React from 'react';

import styles from './RocketCard.css';

export function RocketCard({
  name,
  description,
  flickr_images,
  wikipedia,
  height,
  diameter,
  mass,
}) {
  return (
    <div className={styles.rocket__card}>
      <img className={styles.card__image} src={flickr_images[0]} alt={name} />
      <div className={styles.card__content}>
        <h3 className={styles.card__title}>
          <a href={wikipedia}>{name}</a>
        </h3>
        <p className={styles.card__description}>{description}</p>
        <table className={styles.card__table}>
          <tbody>
            <tr>
              <td className={styles.card__td}>HEIGHT:</td>
              <td className={styles.card__td}>{height.meters} m</td>
            </tr>
            <tr>
              <td className={styles.card__td}>DIAMETER:</td>
              <td className={styles.card__td}>{diameter.meters} m</td>
            </tr>
            <tr>
              <td className={styles.card__td}>MASS:</td>
              <td className={styles.card__td}>{mass.kg} kg</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
