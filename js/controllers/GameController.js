import Matter from 'https://cdn.skypack.dev/matter-js@0.18.0';
import Paddle from '../models/Paddle.js';
import Tumbleweed from '../models/Tumbleweed.js';
import Player from '../models/Player.js'; 
import Wind from '../models/Wind.js';
import GameConfig from '../GameConfig.js';
import GameStageView from '../views/GameStageView.js';
import WindArrow from '../models/WindArrow.js';
// import Particle from '../models/Particle.js';
import InputController from './InputController.js';
import UIManager from './UIManager.js';
import AIController from './AIController.js';
import CollisionHandler from '../services/Collisions.js';
import { lockScreenOrientation, preloadAssets, getCanvasCenter } from '../utils.js';

const LEFT_PADDLE_POSITION_RATIO = 0.02;
const RIGHT_PADDLE_POSITION_RATIO = 0.98;

class GameController {
  constructor(gameStage, canvas) {
    this.lastUpdateTime = performance.now();
    this.canvas = canvas;
    this.gameStage = gameStage;
    this.leftPlayer = new Player(true); // Left player serves first
    this.rightPlayer = new Player(false);
    this.roundNumber = 0;
    this.isCountdownRunning = false;
    this.particles = [];
    this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
    lockScreenOrientation();
    this.init();
  }

  async init() {
    this.updateCanvasDimensions();
    this.assets = await preloadAssets();
    await this.createAudio(); 
    this.createPaddles();
    this.updatePaddlePositions();
    this.createControllers();
    this.createCollisionHandler();
    this.createWind();
    this.addGameObjectsToStage();
    this.createViews();
    this.bindEventListeners();
    this.gameLoop();
  }

  bindEventListeners() {
    this.bindResizeEvent();
    this.bindClickEvent();
    this.bindKeyEvent();
    this.bindEngineEvent();
  }

  bindResizeEvent() {
    window.addEventListener('resize', this.updateCanvasDimensions.bind(this));
  }

  bindClickEvent() {
    this.canvas.addEventListener('click', this.handleStartButtonClick.bind(this));
  }

  bindKeyEvent() {
    document.addEventListener('keydown', this.inputController.handleKeyDown.bind(this.inputController));
    document.addEventListener('keyup', this.inputController.handleKeyUp.bind(this.inputController));
    document.addEventListener('keydown', this.handleKeyDown.bind(this));
  }

// Tumbleweed spped limiter
  bindEngineEvent() {
    Matter.Events.on(this.gameStage.matterEngine, 'beforeUpdate', (event) => {
        this.wind.apply(event.timestamp);
        this.limitTumbleweedSpeed(); // Tumbleweed spped limiter
    });
    Matter.Events.on(this.gameStage.matterEngine, 'collisionStart', (event) => {
        this.handleCollisionAndUpdateScores(event);
    });
}

  updateCanvasDimensions() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.gameStage.setupBoundaries(this.canvas.width, this.canvas.height);
    if (this.leftPaddle && this.rightPaddle) {
      this.updatePaddlePositions();
    }
  }

  updatePaddlePositions() {
    const leftPaddleX = this.canvas.width * LEFT_PADDLE_POSITION_RATIO;
    const rightPaddleX = this.canvas.width * RIGHT_PADDLE_POSITION_RATIO;
    Matter.Body.setPosition(this.leftPaddle.body, { x: leftPaddleX, y: this.leftPaddle.getYPosition() });
    Matter.Body.setPosition(this.rightPaddle.body, { x: rightPaddleX, y: this.rightPaddle.getYPosition() });
  }

  async loadAudioFile(url) {
    const response = await fetch(url);
    const arrayBuffer = await response.arrayBuffer();
    const audioBuffer = await this.audioContext.decodeAudioData(arrayBuffer);
    return audioBuffer;
  }

  async createAudio() {
    this.thumpSound = new Audio(this.assets.audio.thump);
    this.beepSound = new Audio(this.assets.audio.beep);
    this.gunshotSound = new Audio(this.assets.audio.gunshot);
    this.goSound = new Audio(this.assets.audio.go);
    this.round1Sound = new Audio(this.assets.audio.round1);
    this.backgroundMusic = await this.loadAudioFile(this.assets.audio.song1);
    this.gameoverSound1 = new Audio(this.assets.audio.gameover1);
    this.gameoverSound2 = new Audio(this.assets.audio.gameover2);
    this.gameoverSound3 = new Audio(this.assets.audio.gameover3);
    this.dohSound1 = new Audio(this.assets.audio.doh1);
    this.dohSound2 = new Audio(this.assets.audio.doh2);
  }   
  
  playBackgroundMusic() {
    // Create a buffer source for the background music
    this.backgroundMusicSource = this.audioContext.createBufferSource();
    this.backgroundMusicSource.buffer = this.backgroundMusic;
    this.backgroundMusicSource.loop = true;

    // Create a gain node
    this.gainNode = this.audioContext.createGain();

    // Connect the source to the gain node and the gain node to the destination
    this.backgroundMusicSource.connect(this.gainNode);
    this.gainNode.connect(this.audioContext.destination);

    // Capture the current time
    const currentTime = this.audioContext.currentTime;

    // Start the source
    this.backgroundMusicSource.start(currentTime);

    // Fade in over 2 seconds
    this.gainNode.gain.setValueAtTime(0, currentTime); // initial volume
    this.gainNode.gain.linearRampToValueAtTime(1, currentTime + 2); // target volume over 6 seconds
  }

  stopBackgroundMusic() {
    // Check if the source and gain node exist before trying to stop the music
    if (this.backgroundMusicSource && this.gainNode) {
        // Stop the source
        this.backgroundMusicSource.stop();

        // Disconnect the source and gain node
        this.backgroundMusicSource.disconnect(this.gainNode);
        this.gainNode.disconnect(this.audioContext.destination);

        // Nullify the source and gain node to ensure they are garbage collected
        this.backgroundMusicSource = null;
        this.gainNode = null;
    }
}

createPaddles() {

  const paddleConfig = GameConfig['level' + this.roundNumber].paddle;
  const paddleWidth = paddleConfig.width;
  const paddleHeight = paddleConfig.height;
  const leftPaddleImage = paddleConfig.leftPaddleImage;
  const rightPaddleImage = paddleConfig.rightPaddleImage;
  
  // Calculate the x-coordinate for the left paddle based on the canvas width and the leftPaddlePositionRatio from GameConfig
  const leftPaddleX = this.canvas.width * paddleConfig.leftPaddlePositionRatio;
  
  // Calculate the x-coordinate for the right paddle based on the canvas width and the rightPaddlePositionRatio from GameConfig
  const rightPaddleX = this.canvas.width * paddleConfig.rightPaddlePositionRatio;
  
  // Create the left and right paddles with the calculated x-coordinates
  this.leftPaddle = new Paddle(leftPaddleX, this.canvas.height / 2, paddleWidth, paddleHeight, this.canvas.height, true, 'leftPaddle', this.assets, leftPaddleImage);
  this.rightPaddle = new Paddle(rightPaddleX, this.canvas.height / 2, paddleWidth, paddleHeight, this.canvas.height, false, 'rightPaddle', this.assets, rightPaddleImage);
}


  createControllers() {
    this.inputController = new InputController(this.leftPaddle, this.rightPaddle, this.canvas, false);
    this.aiController = new AIController(this, this.leftPaddle);
    this.gameStage.setAIController(this.aiController);
  }

  createCollisionHandler() {
    this.collisionHandler = new CollisionHandler(this.leftPaddle, this.rightPaddle, this.gameStage, this.assets, this.leftPlayer, this.rightPlayer);
  }

  createWind() {
    this.wind = new Wind(this.gameStage.matterEngine.world, GameConfig);
  }

  addGameObjectsToStage() {
    this.gameStage.addGameObject(this.leftPaddle);
    this.gameStage.addGameObject(this.rightPaddle);
  }

  createViews() {
    this.gameStageView = new GameStageView(this.gameStage, this.canvas, this.leftPaddle, this.rightPaddle);
    this.windArrow = new WindArrow(this.gameStageView.context);  // <-- Initialize windArrow here
    this.uiManager = new UIManager(this.canvas);
    this.uiManager.drawStartButton();
  }

  handleStartButtonClick(event) {
    const canvasCenter = getCanvasCenter(this.canvas);
    if (
        event.clientX >= canvasCenter.x - 50 &&
        event.clientX <= canvasCenter.x + 50 &&
        event.clientY >= canvasCenter.y - 25 &&
        event.clientY <= canvasCenter.y + 25
    ) {
        // Remove the event listener
        this.canvas.removeEventListener('click', this.handleStartButtonClick);
    
        // Start the round
        this.startRound();
    }
  }  

  startRound() {
    this.resetScores();
    this.incrementRoundNumber();
    this.updateUI();
    this.setRoundConfig();
    this.displayRoundNumber(this.roundNumber);
  }

  resetScores() {
    this.leftPlayer.resetScore();
    this.rightPlayer.resetScore();
  }

  incrementRoundNumber() {
    this.roundNumber++;
  }

  updateUI() {
    this.uiManager.setScores(this.leftPlayer.getScore(), this.rightPlayer.getScore(), this.roundNumber);
  }

  setRoundConfig() {
    const roundConfig = GameConfig['level' + this.roundNumber];
    this.wind.setConfig(roundConfig);
    this.aiController.setConfig(roundConfig);
    this.gameStageView.setBackground(roundConfig.background);
  }  
  
  displayRoundNumber(roundNumber) {
    this.uiManager.clearText();
    this.uiManager.setState('round', roundNumber);
    let roundSound = new Audio(this.assets.audio[`round${roundNumber}`]);
    roundSound.play();
    setTimeout(() => {
      this.startCountdown(3, roundNumber); // Pass roundNumber here
    }, 2000);
  }

  startCountdown(seconds, roundNumber) {
    this.isCountdownRunning = true;
    if (seconds > 0) {
      this.updateCountdownState(roundNumber, seconds);
      this.playCountdownSound(seconds);
      this.scheduleNextCountdown(seconds, roundNumber);
    } else {
      this.finishCountdown(roundNumber);
    }
  }

  updateCountdownState(roundNumber, seconds) {
    this.uiManager.setState('countdown', null, roundNumber, seconds);
  }

  playCountdownSound(seconds) {
    let countdownSound = new Audio(this.assets.audio[`${seconds}`]);
    countdownSound.play();
  }

  scheduleNextCountdown(seconds, roundNumber) {
    setTimeout(() => {
      this.startCountdown(seconds - 1, roundNumber);
    }, 1000);
  }

  finishCountdown(roundNumber) {
    this.uiManager.clearText();  // Clear any existing text
    this.uiManager.setState('go');  // Set state to 'go'
    this.goSound.play();
    setTimeout(() => {
        this.uiManager.clearText();  // Clear 'Go!' text
        this.uiManager.setState('game', roundNumber);  // Set state to game, and display the roundNumber
        this.spawnTumbleweed();
        this.playBackgroundMusic();
    }, 1000);
    this.isCountdownRunning = false;
  }  

  transitionToNextRound() {
    const aiScore = this.leftPlayer.getScore();
    const playerScore = this.rightPlayer.getScore();

    if (playerScore >= 5 || aiScore >= 5) {
      this.clearStage();
      if (aiScore >= 5) {
        this.handleAIRoundWin();
      } else {
        this.handlePlayerRoundWin();
      }
    }
  }

  handleAIRoundWin() {
    if (this.isGameOver) {
      return;
    }
    this.isGameOver = true;

    // AI won, play a random game over sound
    const gameoverSounds = [this.gameoverSound1, this.gameoverSound2, this.gameoverSound3];
    const randomSound = gameoverSounds[Math.floor(Math.random() * gameoverSounds.length)];
    setTimeout(() => {
      randomSound.play();
    }, 3000);  // Delay of 4 seconds

    this.uiManager.state.transitionMessage = 'AI won round ' + this.roundNumber + '!'; 
    this.uiManager.setState('transition');
    this.stopBackgroundMusic(); // Stop the music here
    setTimeout(() => this.endGame(), 3000);  // End the game
  }

  handlePlayerRoundWin() {
    // Player won
    this.uiManager.state.transitionMessage = 'You won round ' + this.roundNumber + '!'; 
    this.uiManager.setState('transition');
    this.stopBackgroundMusic(); // Stop the music here
    setTimeout(() => {
      this.isCountdownRunning = false; // Ensure the countdown is stopped
      this.startRound();
    }, 3000);
  }

  endGame() {
    // End game logic here, e.g., show "Game Over" screen
    this.uiManager.clearText();  // Clear any existing text
    this.uiManager.setState('gameOver');  // Show "Game Over" screen
    // If you have specific "Game Over" music, play it here
  }

  clearStage() {
    // Remove the tumbleweed from the game stage if it exists
    if (this.gameStage.getTumbleweed()) {
      this.gameStage.removeTumbleweed();
    }
    // If you have other game objects that need to be cleared from the stage,
    // you can call their respective removal methods here.
  }

  serveAITumbleweedAfterDelay() {
    // If it's the AI's turn to serve
    if (this.leftPlayer.isPlayerServing() && !this.gameStage.tumbleweed) {
        const delay = 1000 * (Math.random() * (4 - 1) + 1); // Random time between 1 and 4 seconds
        setTimeout(() => {
            this.serveTumbleweed();
        }, delay);
    }
}

  handleKeyDown(event) {
    if (event.code === 'Space') {
      if (this.rightPlayer.isPlayerServing() && !this.gameStage.tumbleweed) {
        this.serveTumbleweed();
      }
    }
  }  

  serveTumbleweed() {
    if (!this.gameStage.tumbleweed) {
      this.spawnTumbleweed();
    }
  }

  spawnTumbleweed() {
    const config = GameConfig['level' + this.roundNumber].tumbleweed;
    this.tumbleweed = new Tumbleweed(this.canvas.width / 2, this.canvas.height / 2, this.canvas.width, this.canvas.height);
    this.gameStage.setTumbleweed(this.tumbleweed);
    this.aiController.setTumbleweed(this.tumbleweed);
  }
  

  limitTumbleweedSpeed() {
    const config = GameConfig['level' + this.roundNumber].tumbleweed;
    const maxSpeed = config.maxSpeed;
    const maxRotationSpeed = config.maxRotationSpeed;
  
    const tumbleweeds = Matter.Composite.allBodies(this.gameStage.matterEngine.world).filter(
      (body) => body.label === 'tumbleweed'
    );
  
    for (const tumbleweed of tumbleweeds) {
      const speed = Matter.Vector.magnitude(tumbleweed.velocity);
      if (speed > maxSpeed) {
        const newVelocity = Matter.Vector.mult(
          Matter.Vector.normalise(tumbleweed.velocity),
          maxSpeed
        );
        Matter.Body.setVelocity(tumbleweed, newVelocity);
      }
  
      const rotationSpeed = Math.abs(tumbleweed.angularVelocity);
      if (rotationSpeed > maxRotationSpeed) {
        Matter.Body.setAngularVelocity(
          tumbleweed,
          Math.sign(tumbleweed.angularVelocity) * maxRotationSpeed
        );
      }
    }
  }  

  handleCollisionAndUpdateScores(event) {
    const scoresBeforeCollision = {
      left: this.leftPlayer.getScore(),
      right: this.rightPlayer.getScore()
    };
    
    this.collisionHandler.handleCollision(event);
    
    // After handling the collision, update the score in the UI
    this.uiManager.setScores(this.leftPlayer.getScore(), this.rightPlayer.getScore(), this.roundNumber);
  
    // Check if the AI player has scored a point
    if (this.leftPlayer.getScore() > scoresBeforeCollision.left) {
      // If the AI player has scored a point, play one of the "doh" sounds
      // Choose a sound randomly
      const dohSound = Math.random() < 0.5 ? this.dohSound1 : this.dohSound2;
  
      setTimeout(() => {
        dohSound.play();
        // If the AI player has scored a point, set it as the server
        this.leftPlayer.setServingStatus(true);
        this.rightPlayer.setServingStatus(false);
        this.serveAITumbleweedAfterDelay();
      }, 300);  // Delay of .3 second
    } else if (this.rightPlayer.getScore() > scoresBeforeCollision.right) {
      // If the player has scored a point, set it as the server
      this.rightPlayer.setServingStatus(true);
      this.leftPlayer.setServingStatus(false);
    }

    // Check if a round transition is needed
     this.transitionToNextRound();
  }

  gameLoop() {

    // Calculate the time difference (deltaTime) since the last game loop iteration
    const currentTime = performance.now();           // Get the current time in milliseconds
    const deltaTime = currentTime - this.lastUpdateTime; // Subtract the last update time to get the time difference
    this.lastUpdateTime = currentTime;               // Update the lastUpdateTime for the next game loop iteration
 
    // Update the Matter.js physics engine with the latest game state
    Matter.Engine.update(this.gameStage.matterEngine);
 
    // Use the AI controller to determine and execute the computer paddle's movement
    this.aiController.moveComputerPaddle();
 
    // Render the current game state onto the screen (e.g., drawing sprites, backgrounds, etc.)
    this.gameStageView.render();

  if (this.tumbleweed) {
      const maxTrailLength = 350; // Controls the length of the trail

      // Add current position to the start of the trail array
      this.tumbleweed.trail.unshift({
          x: this.tumbleweed.body.position.x,
          y: this.tumbleweed.body.position.y,
          opacity: .38 // opacity of the trail
      });

      // Remove the oldest position if trail is too long
      if (this.tumbleweed.trail.length > maxTrailLength) {
          this.tumbleweed.trail.pop();
      }

      // Decrease the opacity of the ghost sprites as they get older
      for (let i = 1; i < this.tumbleweed.trail.length; i++) {
          this.tumbleweed.trail[i].opacity *= 0.9;
      }

      // Check if the trail should fade out
      if (this.tumbleweed.isFading) {
        this.tumbleweed.fadeTrail();
      }

      // If the trail is empty and fading, disable the trail
      if (this.tumbleweed.trail.length === 0 && this.tumbleweed.isFading) {
        this.tumbleweed.enableTrail(false);
        this.tumbleweed.isFading = false;
      }

      // Retrieve the current wind force from the wind object
      const windForce = this.wind.force;

      // Update the wind arrow based on the current wind force and get any new particles generated by the wind arrow
      const newParticles = this.windArrow.update(windForce);

      // If there are any new particles, add them to the main particles array
      if (newParticles && newParticles.length) {
          this.particles.push(...newParticles);
      }

      // Loop through each particle in the game
      this.particles.forEach((particle, index) => {
          // Update the particle's properties based on the elapsed time and the wind force
          particle.update(deltaTime, windForce);  // Pass deltaTime here.

          // Draw the updated particle on the game's rendering context
          particle.draw(this.gameStageView.context);

          // If the particle's opacity has dropped to 0 or below, remove it from the particles array
          if (particle.opacity <= 0) {
              this.particles.splice(index, 1);
          }
      });

      }
  
  this.uiManager.render();

  requestAnimationFrame(() => this.gameLoop());
}
}

export default GameController