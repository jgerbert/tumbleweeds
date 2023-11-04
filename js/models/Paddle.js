
// Import necessary libraries and configurations
import GameConfig from '../GameConfig.js';
import Matter from 'https://cdn.skypack.dev/matter-js@0.18.0';

const { Body, Bodies } = Matter; // Import the Body and Bodies modules from Matter.js

class Paddle {

  // Define config as a static property
  static config = GameConfig.level1.paddle;  

  constructor(x, y, width, height, canvasHeight, isLeft, label, assets) {

    // Assets and audio for paddle interactions.
    this.assets = assets;
    this.beepSound = new Audio(this.assets.audio.beep);
    this.gunshotSound = new Audio(this.assets.audio.gunshot);

    // Paddle configuration

    // The default force applied by the paddle when not performing any special actions.
    this.paddleNormalForce = Paddle.config.normalForce; 
    // The force applied by the paddle during a normal kick action.
    this.kickForce = Paddle.config.kickForce;
    // The enhanced force applied by the paddle during a super kick. Typically a multiple of the regular kick force.
    this.superKickForce = Paddle.config.superKickForce;
    // The angle (in degrees) at which the paddle must be rotated to qualify for a super kick.
    this.KickAngle = Paddle.config.KickAngle;
    // Duration (in milliseconds) for how long the paddle takes to perform the kicking rotation.
    this.kickRotationDuration = Paddle.config.kickRotationDuration;
    // Duration (in milliseconds) for how long the paddle takes to reset back to its original position after a kick.
    this.resetRotationDuration = Paddle.config.resetRotationDuration;
    
    // Paddle dimensions and alignment properties.
    this.width = Paddle.config.width;
    this.height = Paddle.config.height;

    // Determine the image path for the paddle and set it as a sprite.
    const imagePath = this.isLeft ? Paddle.config.leftPaddleImage : Paddle.config.rightPaddleImage;

    this.isLeft = isLeft;
    this.canvasHeight = canvasHeight;
    this.isKicking = false; // Flag to check if the paddle is currently in a "kicking" state.

    this.sprite = new Image();
    this.sprite.src = imagePath;

    // Create a physics body for the paddle.
    this.body = Matter.Bodies.rectangle(x, y, this.width, this.height, {
      label: isLeft ? 'leftPaddle' : 'rightPaddle',
      isStatic: true,
    });

    // Scaling factors for adjusting the paddle image's size.
    //this.xScale = this.width / 80;
    //this.yScale = this.height / 600;
  }

  // Set the Y-coordinate for the paddle's position.
  setYPosition(y) {
    Body.setPosition(this.body, { x: this.body.position.x, y: y });
  }

  // Retrieve the Y-coordinate of the paddle's current position.
  getYPosition() {
    return this.body.position.y;
  }

  // Draw the paddle image at its current position on the canvas.
  render(context) {
    context.save();
    context.translate(this.body.position.x, this.body.position.y);
    context.rotate(this.body.angle);
    context.drawImage(
      this.sprite,
      // negative half of the paddle's width, which effectively centers 
      // the image at the new origin set by context.translate().*/
      -this.width / 2,
      -this.height / 2,
      this.width,
      this.height
    );
    context.restore();
  }

  // Prepare the paddle for a kick action by rotating it.
  windUp() {
    const targetAngle = this.isLeft ? Math.PI / 4 : -Math.PI / 4;
    this.rotate(targetAngle, 160, this.easeInOutQuad);
  }

  // Execute the kick action with a rotating animation.
  kick() {
    this.isKicking = true;
    const initialRotation = this.body.angle;
    const targetAngle = this.isLeft ? -Math.PI / 4 : Math.PI / 4;
    this.rotate(targetAngle, this.kickRotationDuration, this.bounceEaseOut, () => {
      const resetAngle = 0;
      this.rotate(resetAngle, this.resetRotationDuration, this.easeInOutQuad);
      this.isKicking = false;
    });
    
  }

  // This method checks if the paddle is currently performing a kick and if the angle conditions are met.
  isPaddleKickingAtCorrectAngle() {
    return this.isKicking && 
           ((this.isLeft && -KICK_ANGLE <= this.body.angle && this.body.angle <= 0) ||
           (!this.isLeft && 0 <= this.body.angle && this.body.angle <= KICK_ANGLE));
  }

  // Easing function for smooth transition during animations.
  easeInOutQuad(t) {
    return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
  }

  // Easing function to simulate a bounce effect.
  bounceEaseOut(t) {
    const n1 = 7.6;
    const d1 = 2.25;

    if (t < 1 / d1) {
      return n1 * t * t;
    } else if (t < 2 / d1) {
      return n1 * (t -= 1.5 / d1) * t + 0.75;
    } else if (t < 2.5 / d1) {
      return n1 * (t -= 2.25 / d1) * t + 0.9375;
    } else {
      return n1 * (t -= 2.625 / d1) * t + 0.984375;
    }
  }

// Helper method to check if the tumbleweed collided with the center of the lower half of the paddle.
isSuperKickCollision(collisionPoint) {
  return Math.abs(this.body.angle) <= 5 && collisionPoint < this.height / 4 && collisionPoint >= 0;
}

// Helper method to calculate the force magnitude based on various conditions during a collision.
calculateForceMagnitude(collisionPoint, tumbleweed) {
  const angleModifier = 1 - Math.abs(this.body.angle) / 45 * 0.32;
  const collisionPointModifier = 1 - Math.abs(collisionPoint) / (this.height / 2);

  // Super Kick condition
  if (this.isSuperKickCollision(collisionPoint)) {
      this.playGunshotSound();
      tumbleweed.tumbleweedReference.enableTrail(true); // Enable the trail
      tumbleweed.tumbleweedReference.isFading = false;  // Reset the fading flag
      
      // Start fading the trail after 1 second (1000 milliseconds)
      setTimeout(() => {
          tumbleweed.tumbleweedReference.isFading = true;
      }, 400); // duration of the trial in ms

      return this.superKickForce * angleModifier * Math.abs(collisionPointModifier);
  } else {
      tumbleweed.tumbleweedReference.enableTrail(false);
      tumbleweed.tumbleweedReference.isFading = false; // Reset the fading flag
      return this.kickForce * angleModifier * Math.abs(collisionPointModifier);
  }

}

// Paddle Force function
paddleForce(tumbleweed) {
  const forceDirection = this.isLeft ? -1 : 1;

  // Check if the paddle is in a kicking state and the angle conditions
  if (this.isKicking && 
    ((this.isLeft && -45 <= this.body.angle && this.body.angle <= 0) ||
    (!this.isLeft && 0 <= this.body.angle && this.body.angle <= 45))) {
      
    // Calculate the collision point based on the tumbleweed's Y position and the paddle's Y position
    const collisionPoint = tumbleweed.position.y - this.body.position.y;
    
    // Check if the collision is on the bottom half of the paddle
    if (collisionPoint > 0) {
      const forceMagnitude = this.calculateForceMagnitude(collisionPoint, tumbleweed);

      
      let xVelocity = forceDirection * forceMagnitude * Math.abs(Math.cos(this.body.angle));

      // Ensure the tumbleweed is moving in the intended direction
      if (this.isLeft && xVelocity < 0) {
        xVelocity = Math.abs(xVelocity);  // Force the direction to the right
      } else if (!this.isLeft && xVelocity > 0) {
        xVelocity = -xVelocity;  // Force the direction to the left
      }
      
      const velocityVector = {
        x: xVelocity,
        y: -forceMagnitude * Math.abs(Math.sin(this.body.angle)),
      };
      
      Matter.Body.setVelocity(tumbleweed, velocityVector);
    }
  } else {
    // If the paddle is not in a kicking state, apply the normal force
    const velocityVector = {
      x: forceDirection * this.paddleNormalForce,
      y: 0,
    };

    Matter.Body.applyForce(tumbleweed, tumbleweed.position, velocityVector);
  }
}

  // Handle the rotation of the paddle for various actions like wind-up and kick.
  rotate(targetAngle, duration, easingFunction, callback) {
    const startAngle = this.body.angle;
    const angleChange = targetAngle - startAngle;
    const startTime = Date.now();

    const step = () => {
      const currentTime = Date.now();
      const elapsedTime = currentTime - startTime;
      const progress = Math.min(elapsedTime / duration, 1);
      const easedProgress = easingFunction(progress);

      const currentAngle = startAngle + angleChange * easedProgress;
      Body.setAngle(this.body, currentAngle);

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        if (callback) callback();
      }
    };

    step();
  }

  // Play the gunshot sound effect.
  playGunshotSound() {
    this.gunshotSound.play();
  }

}

export default Paddle;