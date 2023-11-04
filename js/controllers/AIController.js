// Import Matter.js library
import Matter from 'https://cdn.skypack.dev/matter-js@0.18.0';
import GameConfig from '../GameConfig.js';

class AIController {
  constructor(gameController, aiPaddle, tumbleweed = null) {
    this.gameController = gameController;
    this.aiPaddle = aiPaddle;
    this.tumbleweed = tumbleweed;

    this.setConfig(GameConfig.level1);  // Set initial config
  }

  setConfig(config) {
    this.skillLevel = config.ai.skillLevel;
    this.kickChanceCoefficient = config.ai.kickChanceCoefficient;
    this.kickMissExtraDelay = config.ai.kickMissExtraDelay;
    this.kickDelay = config.ai.kickDelay;
    this.kickCooldownBase = config.ai.kickCooldownBase;
    this.idleTimeout = config.ai.idleTimeout;
  }

  setTumbleweed(tumbleweed) {
    this.tumbleweed = tumbleweed;
  }

  removeTumbleweed() {
    this.tumbleweed = null;
  }

  computerKick() {
    if (!this.aiPaddle.isKicking && !this.aiPaddle.isWindingUp && !this.aiPaddle.isOnCooldown) {
      const kickChance = (GameConfig.level1.ai.kickChanceCoefficient * this.skillLevel) / 100;
      const kickMissChance = 1 - this.skillLevel / 100;
      const randomValue = Math.random();

      if (randomValue < kickChance) {
        this.aiPaddle.windUp();
        this.aiPaddle.isWindingUp = true;

        const willMiss = Math.random() < kickMissChance;
        const kickDelay = willMiss ? GameConfig.level1.ai.kickMissExtraDelay + 300 * Math.random() : GameConfig.level1.ai.kickDelay;

        setTimeout(() => {
          this.aiPaddle.kick();
          this.aiPaddle.isWindingUp = false;
        }, kickDelay);

        this.aiPaddle.isOnCooldown = true;
        const cooldownDuration = GameConfig.level1.ai.kickCooldownBase + 500 * Math.random();

        setTimeout(() => {
          this.aiPaddle.isOnCooldown = false;
        }, cooldownDuration);
      }
    }
  }

  moveComputerPaddle() {
    if (!this.tumbleweed) return;
  
    const tumbleweedVelocity = this.tumbleweed.body.velocity;

    if (tumbleweedVelocity.x < 0) {
      const speed = (this.skillLevel / 100) * 10;
      const newY = Math.min(
        Math.max(this.tumbleweed.body.position.y, this.aiPaddle.height / 2),
        this.gameController.canvas.height - this.aiPaddle.height / 2
      );

      const deltaY = newY - this.aiPaddle.body.position.y;
      const stepY = Math.sign(deltaY) * Math.min(Math.abs(deltaY), speed);

      if (this.aiPaddle.body.position && this.aiPaddle.body.position.x !== undefined && this.aiPaddle.body.position.y !== undefined) {
        const newYPosition = Math.min(Math.max(this.aiPaddle.body.position.y + stepY, this.aiPaddle.height / 2), this.gameController.canvas.height - this.aiPaddle.height / 2);
        Matter.Body.setPosition(this.aiPaddle.body, {x: this.aiPaddle.body.position.x, y: newYPosition});
      } else {
        console.error('AI paddle position is undefined:', this.aiPaddle.body.position);
      }      

      if (this.aiPaddle.idle) {
        clearTimeout(this.aiPaddle.idleTimeout);
        this.aiPaddle.idle = false;
      }

      this.computerKick();
    } else {
      if (!this.aiPaddle.idle) {
        this.aiPaddle.idle = true;

        // Call the idleMovement function after a delay when the AI paddle is idle
        this.aiPaddle.idleTimeout = setTimeout(() => {
          this.idleMovement();
        }, GameConfig.level1.ai.idleTimeout);
      }
    }
  }

  // Function to manage the idle movement of AI paddle
  idleMovement() {
    const minY = this.aiPaddle.height / 2;
    const maxY = this.gameController.canvas.height - this.aiPaddle.height / 2;

    // Randomly set Y position within the permissible range
    const positionY = Math.min(Math.max(this.getRandom(minY, maxY), minY), maxY);

    // Set AI paddle position if it's defined
    if (this.aiPaddle.body.position && this.aiPaddle.body.position.x !== undefined) {
      Matter.Body.setPosition(this.aiPaddle.body, {
        x: this.aiPaddle.body.position.x,
        y: positionY,
      });
    } else {
      console.error('AI paddle position is undefined:', this.aiPaddle.body.position);
    }
  }

  // Helper function to generate a random number within a given range
  getRandom(min, max) {
    return Math.random() * (max - min) + min;
  }
}

export default AIController;
