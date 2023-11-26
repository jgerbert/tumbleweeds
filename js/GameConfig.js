/**
 * gameConfig.js
 *
 * This file manages game configuration settings. It centralizes game balancing,
 * making it easy to adjust the game settings for creating the desired gameplay experience.
 * The configuration is structured per game level, making it simple to define specific settings for each level.
 * A base configuration is defined and used for all levels, and specific settings are then overridden as needed.
 *
 * The file also includes UI configuration for elements like fonts and shadows.
 */

// Base level configurations
 
// Base configuration for a tumbleweed in the game
const baseTumbleweed = {
  
  radius: 100, // 50
  scale: 2, // 1
  density: 0.00005, // 00005
  friction: 0.14, // 0.14
  frictionAir: 0.001, // .001
  restitution: 0.65, // .65
  maxSpeed: 15, // 60
  maxRotationSpeed: .8, // 1.99
  sprite: 'assets/images/tumbleweed.png',
  label: 'tumbleweed'
};

// Base configuration for wind in the game
const baseWind = {
  frequency: 0.00029, // .00029
  amplitude: 0.00025, // .00025
};

// Base configuration for paddles in the game
const basePaddle = {
  normalForce: 30, // 20
  kickForce: 40, // 50 
  superKickForce: 60, // 75
  kickAngle: 45, // 45
  kickRotationDuration: 310, // 310
  resetRotationDuration: 120, // 120
  width: 40, // 30
  height: 300, // 200
  leftPaddlePositionRatio: 0.02, // .02
  rightPaddlePositionRatio: 0.98, // .98
  leftPaddleImage: 'assets/images/p1-paddle.png',
  rightPaddleImage: 'assets/images/p2-paddle.png'
};

// Base configuration for the AI in the game
const baseAI = {
  skillLevel: 40, // 50
  kickChanceCoefficient: 0.4, // .6
  kickDelay: 400, // 160
  kickMissExtraDelay: 500, // 200
  kickCooldownBase: 500, // 500
  idleTimeout: 200, // 300
  kickCooldownDuration: 1000, // 500
};

// Base configuration for the world in the game
const baseWorld = {
  gravity: 0, // 1 is earth gravity
};

// Base level configuration
const baseLevel = {
  tumbleweed: baseTumbleweed,
  wind: baseWind,
  paddle: basePaddle,
  ai: baseAI,
  world: baseWorld,
  background: 'assets/images/background3.png'
};

// Game configuration for different levels
const GameConfig = {
  level0: baseLevel,
  level1: baseLevel,

  level2: {
    ...baseLevel,
    tumbleweed: {
      ...baseLevel.tumbleweed,
      radius: 50, // The tumbleweed's radius affecting its size in the game.
      scale: 1, // (New tumbleweed Radius / Original tumbleweed Radius) - keeps the sprite consistent as the tumbleweed radius changes
      density: 0.00005, // The tumbleweed's density affecting its mass and interaction with other bodies.
      friction: 0.14, // Friction experienced by tumbleweed when in contact with other bodies.
      frictionAir: 0.001, // Air resistance affecting how the tumbleweed slows down in air.
      restitution: 0.65, // Elasticity of the tumbleweed affecting bouncing off other bodies.
      maxSpeed: 50, // Speed limiter
      maxRotationSpeed: 1.5, // Rotation limiter
      sprite: 'assets/images/tumbleweed.png', // Source file for the tumbleweed image.
      label: 'tumbleweed' // Label for the tumbleweed body used in collision events.
    },
    wind: {
      ...baseLevel.wind,
      frequency: 0.00029, // Frequency of wind changes affecting direction and intensity.
      amplitude: 0.00025, // Maximum strength of wind affecting force applied to the tumbleweed.
    },
    paddle: {
      ...baseLevel.paddle,
      normalForce: 20, // Default force applied by the paddle when not performing any special actions.
      kickForce: 50, // Force applied by the paddle during a normal kick action.
      superKickForce: 75, // Enhanced force applied during a super kick. Typically double the regular kick force.
      kickAngle: 45, // The angle (in degrees) at which the paddle must be rotated to qualify for a super kick.
      kickRotationDuration: 310, // Duration (in milliseconds) for the paddle's kicking rotation.
      resetRotationDuration: 120, // Duration (in milliseconds) for paddle to reset its position after a kick.
      width: 120, // Custom width for level 2.
      height: 250, // Custom height for level 2.
      leftPaddleImage: 'assets/images/p1-paddle-level2.png', // Custom image for left paddle in level 2.
      rightPaddleImage: 'assets/images/p2-paddle-level2.png' // Custom image for right paddle in level 2.
    },
    ai: {
      ...baseLevel.ai,
      skillLevel: 50,               // Skill level of AI. 100 = 100%
      kickChanceCoefficient: 0.6,   // 1 = the AI kicks as often as possible:
      kickDelay: 160,               // How long the ai holds the windup before kicking
      kickMissExtraDelay: 200,      // Extra time the AI holds the windup before kicking if it's going to miss
      kickCooldownBase: 500,        // Time the AI must wait after a kick before it can kick again
      idleTimeout: 300,             // Time the AI waits after the tumbleweed starts moving towards the opponent's paddle before transitioning into its idle movement
      kickCooldownDuration: 500,    // Duration of the time period in which the AI cannot kick after a previous kick

    },
    world: {
      ...baseLevel.world,
      gravity: 0, // Custom gravity for level 2
    },
    background: 'assets/images/background2.jpg', // Custom background image for level 2.
  },
  
  level3: {
    ...baseLevel,
    background: 'assets/images/background1.png',
  },
  level4: {
    ...baseLevel,
    background: 'assets/images/background3.png',
  },

  ui: {
    fontName: 'Howdy',
    fontSize: '40px',
    secondaryFontSize: '30px',
    fontColor: 'white',
    shadow: {
      color: 'rgba(0, 0, 0, 1)',
      offsetX: 0,
      offsetY: 2,
      blur: 0
    },
  },
};

export default GameConfig;