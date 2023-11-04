// models/Wind.js

import Matter from 'https://cdn.skypack.dev/matter-js@0.18.0';
import { SimplexNoise } from 'https://unpkg.com/simplex-noise-esm@2.5.0-esm.0/dist-esm/simplex-noise.js';

const noise = new SimplexNoise();

class Wind {
  constructor(matterWorld, config) { 
    this.matterWorld = matterWorld;
    this.setConfig(config.level1);  // Initialize the wind parameters
    this.force = { x: 0, y: 0 };
  }

  setConfig(config) {
    this.frequency = config.wind.frequency;
    this.amplitude = config.wind.amplitude;
  }

  apply(timestamp) {
    const time = timestamp * this.frequency;
    this.force.x = noise.noise2D(time, 0) * this.amplitude;
    this.force.y = noise.noise2D(time, 1) * this.amplitude;

    Matter.Composite.allBodies(this.matterWorld)
      .filter(this.filter)
      .forEach((body) => {
        Matter.Body.applyForce(body, body.position, this.force);
      });
  }

  filter(body) {
    return body.label === 'tumbleweed';
  }
}

export default Wind;