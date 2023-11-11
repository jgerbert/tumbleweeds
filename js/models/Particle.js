// Particle Configuration Constants

// Minimum and maximum duration for particle's fade-in effect in milliseconds.
const PARTICLE_FADE_IN_DURATION_MIN = 0;
const PARTICLE_FADE_IN_DURATION_MAX = 750;

// Minimum and maximum start time for particle's fade-out effect in milliseconds.
const PARTICLE_FADE_OUT_START_MIN = 1000;
const PARTICLE_FADE_OUT_START_MAX = 3000;

// Duration for particle's fade-out effect in milliseconds.
const PARTICLE_FADE_OUT_DURATION = 5000;

// Minimum and maximum size of the particle.
const PARTICLE_SIZE_MIN = 0.8;
const PARTICLE_SIZE_MAX = 14.2;

// Base and range for calculating the opacity factor of the particle.
const PARTICLE_OPACITY_FACTOR_BASE = 0.5;
const PARTICLE_OPACITY_FACTOR_RANGE = 0.5;

// Minimum and maximum number of sides for the particle shape.
const PARTICLE_SIDES_MIN = 4;
const PARTICLE_SIDES_MAX = 6;

// Minimum and maximum rotation speed of the particle.
const PARTICLE_ROTATION_SPEED_MIN = -0.005;
const PARTICLE_ROTATION_SPEED_MAX = 0.005;

// Minimum and maximum lifespan of the particle in milliseconds.
const PARTICLE_LIFESPAN_MIN = 2000;
const PARTICLE_LIFESPAN_MAX = 5000;

// Easing factor for particle movement, influencing how quickly it responds to forces.
const PARTICLE_EASING = 0.3;

// Factor for random turbulence effect applied to particle's velocity.
const PARTICLE_TURBULENCE_FACTOR = 0.07;

class Particle {
  // The Particle constructor initializes a particle with its position, velocity, thrust time, and other properties.
  constructor(x, y, angle, magnitude, thrustTime) {
      // Initialize fundamental properties like position, velocity, and lifespan.
      this.initProperties(x, y, angle, magnitude, thrustTime);
      // Initialize visual appearance properties like color, size, and opacity.
      this.initAppearance();
      // Initialize movement-related properties like easing, speed, and rotation.
      this.initMovement();
  }

  // Set the initial properties of the particle, including its position and velocity.
  initProperties(x, y, angle, magnitude, thrustTime) {
      this.x = x;  // x-position of the particle
      this.y = y;  // y-position of the particle
      // Calculate velocity based on provided angle and magnitude.
      this.vx = Math.cos(angle) * magnitude;  
      this.vy = Math.sin(angle) * magnitude;
      this.thrustTime = thrustTime;  // Duration for which the particle thrusts
      this.elapsedTime = 0;  // Time since the particle was created
      this.windAngle = angle;  // Angle of the wind affecting the particle
  }

  // Set the visual appearance properties of the particle.
  initAppearance() {
    this.fadeInDuration = getRandomFadeInDuration();
    this.fadeOutStart = this.thrustTime + getRandomFadeOutStart();
    this.fadeOutDuration = PARTICLE_FADE_OUT_DURATION;
    this.fadeInStart = performance.now();
    this.opacity = 0;
    this.color = getRandomColor();
    this.size = getRandomSize();
    this.opacityFactor = getOpacityFactor(this.size);
}

  // Initialize properties related to the particle's movement.
  initMovement() {
    this.easing = PARTICLE_EASING;
    this.speedFactor = 1 + this.opacityFactor;
    this.lifespan = PARTICLE_LIFESPAN_MIN + Math.random() * (PARTICLE_LIFESPAN_MAX - PARTICLE_LIFESPAN_MIN);
    this.sides = getRandomSides();
    this.angles = getAngles(this.sides);
    this.rotation = 0;
    this.rotationSpeed = getRandomRotationSpeed();
}

  // Update the particle's position and opacity.
  update(deltaTime, windForce) {
      this.updatePosition(deltaTime, windForce);
      this.updateOpacity(deltaTime);
  }

  // Render the particle on the canvas.
  draw(ctx) {
      drawParticleShape(ctx, this);
  }

  // Update the particle's position based on wind force, turbulence, and screen wrap-around.
  updatePosition(deltaTime, windForce) {
      updateVelocityBasedOnWind(this, windForce, deltaTime);
      applyTurbulence(this);
      wrapAroundScreen(this);
      // Update the rotation of the particle.
      this.rotation += this.rotationSpeed * deltaTime;
  }

  // Adjust the opacity of the particle over time.
  updateOpacity(deltaTime) {
      const elapsedTime = performance.now() - this.fadeInStart;
      this.opacity = calculateOpacity(elapsedTime, this);
  }
}

// --------------------
// HELPER FUNCTIONS
// --------------------
// 
// Returns a random duration (in milliseconds) for the particle's fade-in effect.
function getRandomFadeInDuration() {
  return Math.random() * (PARTICLE_FADE_IN_DURATION_MAX - PARTICLE_FADE_IN_DURATION_MIN) + PARTICLE_FADE_IN_DURATION_MIN;
}

// Returns a random start time (in milliseconds) for the particle's fade-out effect.
function getRandomFadeOutStart() {
  return Math.random() * (PARTICLE_FADE_OUT_START_MAX - PARTICLE_FADE_OUT_START_MIN) + PARTICLE_FADE_OUT_START_MIN;
}

// Returns a random size factor for the particle.
function getRandomSize() {
  return Math.random() * (PARTICLE_SIZE_MAX - PARTICLE_SIZE_MIN) + PARTICLE_SIZE_MIN;
}

// Calculates and returns an opacity factor based on the particle's size.
function getOpacityFactor(size) {
  return (size / 10) * (PARTICLE_OPACITY_FACTOR_BASE + Math.random() * PARTICLE_OPACITY_FACTOR_RANGE);
}

// Returns a random number of sides for the particle (between 4 and 6 inclusive).
function getRandomSides() {
  return Math.floor(Math.random() * (PARTICLE_SIDES_MAX - PARTICLE_SIDES_MIN + 1)) + PARTICLE_SIDES_MIN;
}

function getRandomRotationSpeed() {
  return Math.random() * (PARTICLE_ROTATION_SPEED_MAX - PARTICLE_ROTATION_SPEED_MIN) + PARTICLE_ROTATION_SPEED_MIN;
}

// Returns a random primary color from a predefined list.
function getRandomColor() {
  const primaryColors = [
   // { name: "Red", hex: "#FF0000" },
   // { name: "Blue", hex: "#0000FF" },
   // { name: "Yellow", hex: "#FFFF00" },
    { name: "Caramel", hex: "#C57A44" },
    { name: "Buff", hex: "#E0AA83" },
    { name: "Burnt sienna", hex: "#C97C65" },
    { name: "Fawn", hex: "#EFAF6D" },
    { name: "Persian orange", hex: "#D89574" },
    { name: "Brown sugar", hex: "#A5633A" },
  ];
  return primaryColors[Math.floor(Math.random() * primaryColors.length)].hex;
}

// Calculates and returns the angles for a polygon based on the number of sides.
function getAngles(sides) {
  const angles = [];
  const angleOffset = Math.PI / sides;
  for (let i = 0; i < sides; i++) {
      angles.push((Math.PI * 2 * i) / sides + (Math.random() * angleOffset - angleOffset / 2));
  }
  return angles;
}

// Applies a random turbulence effect to the particle's velocity.
function applyTurbulence(particle) {
  const turbulenceFactor = 0.07;
  particle.vx += (Math.random() - 0.5) * turbulenceFactor;
  particle.vy += (Math.random() - 0.5) * turbulenceFactor;
}

// Adjusts the particle's position to wrap around the screen boundaries.
function wrapAroundScreen(particle) {
  if (particle.x < 0) particle.x += window.innerWidth;
  if (particle.x > window.innerWidth) particle.x -= window.innerWidth;
  if (particle.y < 0) particle.y += window.innerHeight;
  if (particle.y > window.innerHeight) particle.y -= window.innerHeight;
}

// Updates the particle's velocity based on the wind force and then moves the particle.
function updateVelocityBasedOnWind(particle, windForce, deltaTime) {
  // Calculate the wind's angle and magnitude.
  const windAngle = Math.atan2(windForce.y, windForce.x);
  const windMagnitude = Math.sqrt(windForce.x ** 2 + windForce.y ** 2);
  const actualWindForce = windMagnitude * 1000;

  // If the particle is still thrusting, move it based on its initial velocity.
  if (particle.thrustTime > 0) {  // Corrected property from thrustDuration to thrustTime
      particle.x += particle.vx * deltaTime * particle.speedFactor;
      particle.y += particle.vy * deltaTime * particle.speedFactor;
      particle.thrustTime -= deltaTime;  // Decrease the thrustTime
  } else {
      // If the particle is affected by wind, adjust its velocity and move it.
      particle.vx += (Math.cos(windAngle) * actualWindForce * particle.speedFactor - particle.vx) * particle.easing;
      particle.vy += (Math.sin(windAngle) * actualWindForce * particle.speedFactor - particle.vy) * particle.easing;
      particle.x += particle.vx * deltaTime * particle.speedFactor;
      particle.y += particle.vy * deltaTime * particle.speedFactor;
  }
}

// Draws the shape of the particle on the given canvas context.
function drawParticleShape(ctx, particle) {
  const path = new Path2D();

  // Start the drawing path from the first angle
  path.moveTo(particle.x + particle.size * Math.cos(particle.angles[0]), particle.y + particle.size * Math.sin(particle.angles[0]));

  // Iterate over the remaining angles and draw the polygon sides
  for (let i = 1; i < particle.sides; i++) {
      path.lineTo(particle.x + particle.size * Math.cos(particle.angles[i]), particle.y + particle.size * Math.sin(particle.angles[i]));
  }

  path.closePath(); // Close the shape path

  // Set the particle's fill color and opacity
  ctx.fillStyle = particle.color;
  ctx.globalAlpha = particle.opacity;

  // Rotate the particle based on its rotation property
  ctx.save();
  ctx.translate(particle.x, particle.y);
  ctx.rotate(particle.rotation);
  ctx.translate(-particle.x, -particle.y);
  
  ctx.fill(path); // Fill the particle shape
  ctx.restore(); // Restore the canvas context to its original state
  ctx.globalAlpha = 1; // Reset the global opacity to default
}

// Calculate the particle's opacity based on the elapsed time and fading properties.
function calculateOpacity(elapsedTime, particle) {
  if (elapsedTime < particle.fadeInDuration) {
      const progress = elapsedTime / particle.fadeInDuration;
      return easeOutCubic(progress);
  } else if (elapsedTime > particle.fadeOutStart) {
      const fadeOutProgress = (elapsedTime - particle.fadeOutStart) / particle.fadeOutDuration;
      const opacity = 1 - easeOutCubic(fadeOutProgress);
      return opacity < 0 ? 0 : opacity;
  } else {
      return 1;
  }
}

// Cubic easing function for smooth transitions
function easeOutCubic(t) {
  return 1 - Math.pow(1 - t, 3);
}

// Create a set of particles based on the given force, number of particles, and wind force.
function createParticles(force, numParticles, windForce) {
  const windAngle = Math.atan2(windForce.y, windForce.x);

  for (let i = 0; i < numParticles; i++) {
    let x, y;
    const randomFactor = Math.random() * 0.5 + 0.5;
    const initialForce = force * randomFactor;
    const angleOffset = (Math.random() - 0.5) * Math.PI / 4; // Random angle variation
    const thrustTime = Math.random() * 0 + 900;

    // Determine particle starting position based on wind direction
    if (Math.abs(Math.cos(windAngle)) > Math.abs(Math.sin(windAngle))) {
      // Horizontal wind
      x = Math.cos(windAngle) > 0 ? 0 : window.innerWidth;
      y = Math.random() * window.innerHeight;
    } else {
      // Vertical wind
      x = Math.random() * window.innerWidth;
      y = Math.sin(windAngle) > 0 ? 0 : window.innerHeight;
    }

    particles.push(new Particle(x, y, windAngle + angleOffset, initialForce, thrustTime));
  }
}

// Update the list of particles based on the elapsed time.
function updateParticles(deltaTime) {
  particles.forEach((particle, index) => {
    particle.update(deltaTime);
    particle.draw();
    
    // Remove the particle from the list if its opacity is zero (fully transparent).
    if (particle.opacity <= 0) {
      particles.splice(index, 1);
    }
  });
}

// Export the Particle class for external use.
export default Particle;