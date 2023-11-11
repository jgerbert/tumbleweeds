// Import necessary libraries and configurations
import GameConfig from '../GameConfig.js';
import Matter from 'https://cdn.skypack.dev/matter-js@0.18.0';

// Class definition: Tumbleweed
// Represents the tumbleweed object in the game, including its physical properties and rendering logic.
class Tumbleweed {
  // Constructor: Initializes a new instance of the Tumbleweed class.
  // Parameters:
  // x, y: Initial position coordinates of the Tumbleweed.
  // canvasWidth, canvasHeight: Dimensions of the canvas for boundary calculations.
  constructor(x, y, canvasWidth, canvasHeight) {
    // Retrieve the configuration for the Tumbleweed from GameConfig.
    const config = GameConfig.level1.tumbleweed;

    // Initialize properties: radius, canvas dimensions, and scaling factor for rendering.
    this.radius = config.radius;
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.scale = config.scale;

    // Define options for the physical body based on the configuration.
    const options = {
      frictionAir: config.frictionAir,
      restitution: config.restitution,
      density: config.density,
      friction: config.friction
    };

    // Create the physical polygonal rigid body using Matter.js.
    // The body is defined as a hexagon to approximate the shape of a tumbleweed.
    this.body = Matter.Bodies.polygon(x, y, 6, this.radius, options);

    // Create a new Image object for the tumbleweed sprite and set its source.
    this.sprite = new Image();
    this.sprite.src = config.sprite;

    // Initialize an array to store the positions and opacities of the ghost sprites for the trail effect.
    this.trail = [];

    // Set the label property of the body for identification in collision handling.
    Matter.Body.set(this.body, 'label', config.label);

    // Create a reference to this Tumbleweed instance on its Matter.js body for easy access.
    this.body.tumbleweedReference = this;

    // Initialize properties to manage the trail effect.
    this.isTrailEnabled = false; // Indicates whether the trail effect is enabled.
    this.isFading = false; // Indicates whether the trail is currently fading out.
  }

  // Method to enable or disable the trail effect.
  // isEnabled: Boolean flag to turn the trail effect on or off.
  enableTrail(isEnabled) {
    this.isTrailEnabled = isEnabled;
  }

  // Method to gradually fade out the tumbleweed trail.
  fadeTrail() {
    // Start the fading process by setting isFading to true.
    this.isFading = true;

    // Reduce the opacity of the first sprite in the trail.
    if (this.trail.length > 0) {
        this.trail[0].opacity -= 0.05;
    }

    // Remove the first sprite from the trail if its opacity reaches zero.
    while (this.trail.length > 0 && this.trail[0].opacity <= 0) {
        this.trail.shift();
    }

    // Continue fading the remaining trail on the next animation frame, if applicable.
    if (this.trail.length > 0 && this.isFading) {
        requestAnimationFrame(() => this.fadeTrail());
    } else {
        // End the fading process when all trail sprites have faded.
        this.isFading = false;
    }
  }

  // Render method: Draws the Tumbleweed and its trail on the canvas.
  // context: The 2D rendering context of the canvas.
  render(context) {
    context.save();

    // Draw the main Tumbleweed sprite.
    context.translate(this.body.position.x, this.body.position.y);
    context.rotate(this.body.angle);
    context.drawImage(
      this.sprite,
      -this.radius,
      -this.radius,
      this.sprite.width * this.scale,
      this.sprite.height * this.scale
    );
    context.restore();

    // Draw the Tumbleweed trail, if enabled.
    if (this.isTrailEnabled) {
      for (const ghost of this.trail) {
        context.save();
        context.globalAlpha = ghost.opacity;
        context.translate(ghost.x, ghost.y);
        context.rotate(this.body.angle);
        context.drawImage(
          this.sprite,
          -this.radius,
          -this.radius,
          this.sprite.width * this.scale,
          this.sprite.height * this.scale
        );
        context.restore();
      }
    }
  }
}

// Export the Tumbleweed class as the default export for use in other modules.
export default Tumbleweed;
