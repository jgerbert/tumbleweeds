// Import necessary libraries and configurations
import GameConfig from '../GameConfig.js';
import Matter from 'https://cdn.skypack.dev/matter-js@0.18.0';

// Class definition: Tumbleweed
class Tumbleweed {
  // Constructor: special method for creating and initializing an object created within a class.
  constructor(x, y, canvasWidth, canvasHeight) {

    // Retrieve the configuration for the Tumbleweed
    const config = GameConfig.level1.tumbleweed;

    // Initialize properties: radius, canvas dimensions, scale
    this.radius = config.radius;
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.scale = config.scale;

    // Define options for the physical body
    const options = {
      frictionAir: config.frictionAir,
      restitution: config.restitution,
      density: config.density,
      friction: config.friction
    };

    // Create the physical polygonal rigid body using Matter.js
    this.body = Matter.Bodies.polygon(x, y, 6, this.radius, options);

    // Create a new Image object and set its source
    this.sprite = new Image();
    this.sprite.src = config.sprite;

    // Array to store the positions and opacities of the ghost sprites
    this.trail = [];

    // Set the label property of the body for identification in collision handling
    Matter.Body.set(this.body, 'label', config.label);

    this.body.tumbleweedReference = this;

  }

  // Property to track whether the trail is currently enabled
  isTrailEnabled = false;

  // Property to track whether the trail is currently fading
  isFading = false;

  // Method to enable or disable the trail
  enableTrail(isEnabled) {
    this.isTrailEnabled = isEnabled;
  }

  // Method to fade the tumbleweed trail out
  fadeTrail() {
    this.isFading = true; // Set isFading to true at the start of the fading process

    // Decrement the opacity of the first sprite by a small amount
    if (this.trail.length > 0) {
        this.trail[0].opacity -= 0.05;
    }

    // If the first sprite's opacity reaches 0, remove it from the trail
    while (this.trail.length > 0 && this.trail[0].opacity <= 0) {
        this.trail.shift();
    }

    // If there are still sprites left in the trail, continue fading on the next frame
    if (this.trail.length > 0 && this.isFading) {
        requestAnimationFrame(() => this.fadeTrail());
    } else {
        this.isFading = false; // Set isFading to false when the fading process is complete
    }
}

  // This render method draws the Tumbleweed on the canvas.
  render(context) {
    context.save();
    
    // Set the position and rotation for drawing the Tumbleweed
    context.translate(this.body.position.x, this.body.position.y);
    context.rotate(this.body.angle);
    
    // Draw the main Tumbleweed sprite
    context.drawImage(
      this.sprite,
      -this.radius,
      -this.radius,
      this.sprite.width * this.scale,
      this.sprite.height * this.scale
    );
  
    // Restore the original context state for the main Tumbleweed sprite
    context.restore();
    
    // Check if the trail is enabled before drawing it
    if (this.isTrailEnabled) {
      // Draw the trail
      for (const ghost of this.trail) {
        context.save();
        context.globalAlpha = ghost.opacity;  // Set the opacity for this ghost sprite
        context.translate(ghost.x, ghost.y);  // Translate to the ghost's position
        context.rotate(this.body.angle);  // Use the same rotation as the main sprite
  
        context.drawImage(
          this.sprite,
          -this.radius,
          -this.radius,
          this.sprite.width * this.scale,
          this.sprite.height * this.scale
        );
  
        // Restore the context state to its original form for each ghost sprite
        context.restore();
      } 
    }
  }
  
}

// Export the Tumbleweed class as the default export.
// This allows other modules to import this class using a simpler syntax.
export default Tumbleweed;
