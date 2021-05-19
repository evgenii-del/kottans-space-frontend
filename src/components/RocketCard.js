/** @jsx createElement */
/** @jsxFrag createFragment */
import { createElement } from '../framework/element';

export function RocketCard({
  rocket_name,
  description,
  flickr_images,
  wikipedia,
  height,
  diameter,
  mass,
}) {
  return (
    <div>
      <div>
        <img src={flickr_images[0]} alt={rocket_name} />
        <p>${description}</p>
      </div>
      <div>
        <h3>
          <a href={wikipedia}>{rocket_name}</a>
        </h3>
        <table>
          <tbody>
            <tr>
              <td>HEIGHT:</td>
              <td>{height.meters} m</td>
            </tr>
            <tr>
              <td>DIAMETER:</td>
              <td>{diameter.meters} m</td>
            </tr>
            <tr>
              <td>MASS:</td>
              <td>{mass.kg} kg</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
