/**
 * gameConfig.js
 * This file manages game configuration settings and provides a central place
 * for game balancing, adjusting game settings to create the desired gameplay
 * experience.
 */

const GameConfig = {
  level1: {
    tumbleweed: {
      radius: 50, // The tumbleweed's radius affecting its size in the game.
      scale: 0.45, // Scaling factor for tumbleweed sprite affecting image resizing.
      density: 0.00005, // The tumbleweed's density affecting its mass and interaction with other bodies.
      friction: 0.14, // Friction experienced by tumbleweed when in contact with other bodies.
      frictionAir: 0.001, // Air resistance affecting how the tumbleweed slows down in air.
      restitution: .65, // Elasticity of the tumbleweed affecting bouncing off other bodies.
      sprite: 'assets/images/tumbleweed.png', // Source file for the tumbleweed image.
      label: 'tumbleweed' // Label for the tumbleweed body used in collision events.
    },

    wind: {
      frequency: 0.00029, // Frequency of wind changes affecting direction and intensity.
      amplitude: 0.00025, // Maximum strength of wind affecting force applied to the tumbleweed.
    },
      
    paddle: {
      kickForce: 800000.3, // Kick force applied by the paddle.
    },

    ai: {
      skillLevel: 50, // Skill level of AI.
      kickChanceCoefficient: 0.6, // Coefficient for calculating kick chance.
      kickDelay: 160, // Delay before AI kicks.
      kickMissExtraDelay: 200, // Extra delay when AI misses a kick.
      kickCooldownBase: 500, // Cooldown time after AI kicks.
      idleTimeout: 300, // Delay before AI starts idle movement.
      kickCooldownDuration: 500, // Duration of AI kick cooldown.
    },

    world: {
      gravity: 0, // Gravity in the game world.
    },
  },

  level2: {
    tumbleweed: {
      radius: 50, // The tumbleweed's radius affecting its size in the game.
      scale: 0.45, // Scaling factor for tumbleweed sprite affecting image resizing.
      density: 0.00003, // The tumbleweed's density affecting its mass and interaction with other bodies.
      friction: 0.14, // Friction experienced by tumbleweed when in contact with other bodies.
      frictionAir: 0.001, // Air resistance affecting how the tumbleweed slows down in air.
      restitution: .75, // Elasticity of the tumbleweed affecting bouncing off other bodies.
      sprite: 'assets/images/tumbleweed.png', // Source file for the tumbleweed image.
      label: 'tumbleweed' // Label for the tumbleweed body used in collision events.
    },

    wind: {
      frequency: 0.00029, // Frequency of wind changes affecting direction and intensity.
      amplitude: 0.00025, // Maximum strength of wind affecting force applied to the tumbleweed.
    },
      
    paddle: {
      kickForce: 800000.5, // Kick force applied by the paddle.
    },

    ai: {
      skillLevel: 30, // Skill level of AI.
      kickChanceCoefficient: 0.4, // Coefficient for calculating kick chance.
      kickDelay: 460, // Delay before AI kicks.
      kickMissExtraDelay: 300, // Extra delay when AI misses a kick.
      kickCooldownBase: 500, // Cooldown time after AI kicks.
      idleTimeout: 300, // Delay before AI starts idle movement.
      kickCooldownDuration: 900, // Duration of AI kick cooldown.
    },

    world: {
      gravity: .5, // Gravity in the game world.
    },
  },

  level3: {
    tumbleweed: {
      radius: 50, // The tumbleweed's radius affecting its size in the game.
      scale: 0.45, // Scaling factor for tumbleweed sprite affecting image resizing.
      density: 0.000025, // The tumbleweed's density affecting its mass and interaction with other bodies.
      friction: 0.12, // Friction experienced by tumbleweed when in contact with other bodies.
      frictionAir: 0.001, // Air resistance affecting how the tumbleweed slows down in air.
      restitution: .80, // Elasticity of the tumbleweed affecting bouncing off other bodies.
      sprite: 'assets/images/tumbleweed.png', // Source file for the tumbleweed image.
      label: 'tumbleweed' // Label for the tumbleweed body used in collision events.
    },

    wind: {
      frequency: 0.00035, // Frequency of wind changes affecting direction and intensity.
      amplitude: 0.00045, // Maximum strength of wind affecting force applied to the tumbleweed.
    },
      
    paddle: {
      kickForce: 900000.5, // Kick force applied by the paddle.
    },

    ai: {
      skillLevel: 60, // Skill level of AI.
      kickChanceCoefficient: 0.6, // Coefficient for calculating kick chance.
      kickDelay: 160, // Delay before AI kicks.
      kickMissExtraDelay: 200, // Extra delay when AI misses a kick.
      kickCooldownBase: 500, // Cooldown time after AI kicks.
      idleTimeout: 300, // Delay before AI starts idle movement.
      kickCooldownDuration: 500, // Duration of AI kick cooldown.
    },

    world: {
      gravity: 0, // Gravity in the game world.
    },
  },
  // More levels can be added here in the future...

  ui: {
    fontName: 'Howdy',
    fontSize: '40px',
    secondaryFontSize: '30px', // this could be used for smaller text elements
    fontColor: 'white',
    shadow: {
      color: 'rgba(0, 0, 0, 1)', // Solid black shadow
      offsetX: 0, // No horizontal offset
      offsetY: 2, // 2px offset downwards
      blur: 0 // No blur
    }
    //... more styles as needed
  },

};

export default GameConfig;