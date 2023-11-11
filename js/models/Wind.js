// models/Wind.js
// This module defines the Wind class for the Tumbleweed Pong game.
// It uses Matter.js for physics interactions and SimplexNoise for generating wind variations.

import Matter from 'https://cdn.skypack.dev/matter-js@0.18.0';
import { SimplexNoise } from 'https://unpkg.com/simplex-noise-esm@2.5.0-esm.0/dist-esm/simplex-noise.js';

// Instance of SimplexNoise for generating noise-based wind patterns.
const noise = new SimplexNoise();

class Wind {
  // Constructs the Wind object.
  // matterWorld: The Matter.js world where the wind effects are applied.
  // config: Configuration object for the wind settings.
  constructor(matterWorld, config) { 
    this.matterWorld = matterWorld;
    this.setConfig(config.level1);  // Initialize the wind parameters
    this.force = { x: 0, y: 0 };  // Initial wind force
  }

  // Sets the configuration for the wind, based on the provided settings.
  // config: Object containing frequency and amplitude settings for the wind.
  setConfig(config) {
    this.frequency = config.wind.frequency;  // Frequency of wind change
    this.amplitude = config.wind.amplitude;  // Amplitude of wind force
  }

  // Applies the wind force to eligible bodies in the Matter.js world.
  // timestamp: The current timestamp, used for calculating wind variations.
  apply(timestamp) {
    const time = timestamp * this.frequency;
    // Calculate the wind force using 2D noise
    this.force.x = noise.noise2D(time, 0) * this.amplitude;
    this.force.y = noise.noise2D(time, 1) * this.amplitude;

    // Apply the wind force to all 'tumbleweed' bodies in the world
    Matter.Composite.allBodies(this.matterWorld)
      .filter(this.filter)
      .forEach((body) => {
        Matter.Body.applyForce(body, body.position, this.force);
      });
  }

  // Filter function to identify bodies affected by wind.
  // body: The body to be checked.
  // Returns true if the body is labeled as 'tumbleweed'.
  filter(body) {
    return body.label === 'tumbleweed';
  }
}

// Export the Wind class for use in other modules.
export default Wind;
