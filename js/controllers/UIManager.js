import { getCanvasCenter } from '../utils.js';
import GameConfig from '../GameConfig.js';

class UIManager {
  // Constructor initializes the canvas, context, and sets the initial state.
  
  constructor(canvas, handleStartButtonClick) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.canvas.addEventListener('click', handleStartButtonClick);

    // Group state related variables together
    this.state = {
      current: 'start',
      roundNumber: 0,
      countdown: null,
      showScores: false
    };
    // Group score related variables together
    this.score = {
      leftPlayerScore: 0,
      rightPlayerScore: 0
    };

    this.setFont(GameConfig.ui.fontSize);
    this.resetFont(); // Reset the shadow right after setting it

    // Group state related variables together
    this.state = {
      current: 'start',
      roundNumber: 0,
      countdown: null,
      showScores: false,
      transitionMessage: ''  // Add the transitionMessage property here
    };

  }

  // Set the font size, color, and shadow
  setFont(size) {
    this.ctx.font = `${size} ${GameConfig.ui.fontName}`;
    this.ctx.fillStyle = GameConfig.ui.fontColor;
    this.ctx.textAlign = 'center';
    this.ctx.shadowColor = GameConfig.ui.shadow.color;
    this.ctx.shadowBlur = GameConfig.ui.shadow.blur;
    this.ctx.shadowOffsetX = GameConfig.ui.shadow.offsetX;
    this.ctx.shadowOffsetY = GameConfig.ui.shadow.offsetY;
  }

  // Reset shadow to avoid it being applied to other elements
  resetFont() {
    this.ctx.shadowOffsetX = 0;
    this.ctx.shadowOffsetY = 0;
    this.ctx.shadowColor = 'transparent';
    this.ctx.shadowBlur = 0; // also reset the blur
  }

  // Draws the start button in the center of the canvas.
drawStartButton() {
  this.setFont(GameConfig.ui.fontSize);
  this.ctx.fillText('START', getCanvasCenter(this.canvas).x, getCanvasCenter(this.canvas).y);
  this.resetFont(); // Reset right after drawing the text
}

// Draws the round number and, if applicable, the countdown timer with the given y-offsets.
drawStartRoundText(roundNumber, yOffsetRound, yOffsetCountdown, countdown) {
  this.setFont(GameConfig.ui.fontSize);
  this.ctx.fillText('Round ' + roundNumber, getCanvasCenter(this.canvas).x, getCanvasCenter(this.canvas).y + yOffsetRound);
  if (countdown !== null) {
    this.ctx.fillText(countdown, getCanvasCenter(this.canvas).x, getCanvasCenter(this.canvas).y + yOffsetCountdown);
  }
  this.resetFont(); // Reset right after drawing the text
}


  // Clears any text displayed on the canvas.
  clearText() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  // Updates the UI state, round number, and countdown value, then triggers a render.
  setState(state, transitionMessage, roundNumber, countdown) {

    // Only clear the canvas if we're transitioning to a new state
    if (this.state.current !== state) {
      this.clearText();
    }

    this.state.current = state;
    if (transitionMessage) {
        this.state.transitionMessage = transitionMessage;
    }
    if (roundNumber) {
        this.state.roundNumber = roundNumber;
    }
    if (countdown) {
        this.state.countdown = countdown;
    }
    
    this.render();
    if (this.state.current === 'game') {
        this.state.showScores = true;
        this.setScores(this.score.leftPlayerScore, this.score.rightPlayerScore, this.state.roundNumber);
    }
  }
  

// Draws scores and round on the canvas.
drawScores() {
  this.setFont(GameConfig.ui.secondaryFontSize);
  this.ctx.fillText('Left: ' + this.score.leftPlayerScore, this.canvas.width / 4, 50);
  this.ctx.fillText('Round: ' + this.state.roundNumber, this.canvas.width / 2, 50); // changed this.score.roundNumber to this.state.roundNumber
  this.ctx.fillText('Right: ' + this.score.rightPlayerScore, this.canvas.width * 3 / 4, 50);
  this.resetFont(); // Reset right after drawing the text
}


// Updates scores.
setScores(leftScore, rightScore, roundNumber) {
  this.score.leftPlayerScore = leftScore;
  this.score.rightPlayerScore = rightScore;
  this.state.roundNumber = roundNumber;
  this.drawScores();
}
  
// Renders the UI elements based on the current state.
render() {
  if (this.state.current === 'start') {
    this.drawStartButton();
  } else if (this.state.current === 'round') {
    this.drawStartRoundText(this.state.roundNumber, -25, null, null);
  } else if (this.state.current === 'countdown') {
    this.drawStartRoundText(this.state.roundNumber, -25, 25, this.state.countdown);
  } else if (this.state.current === 'game' && this.state.showScores) {
    this.drawScores(); 
  } else if (this.state.current === 'go') {
    this.setFont(GameConfig.ui.fontSize);
    this.ctx.fillText('Go!', getCanvasCenter(this.canvas).x, getCanvasCenter(this.canvas).y);
    this.resetFont(); // Reset right after drawing the text
  } else if (this.state.current === 'transition') {
    this.setFont(GameConfig.ui.fontSize);
    this.ctx.fillText(this.state.transitionMessage, getCanvasCenter(this.canvas).x, getCanvasCenter(this.canvas).y);
    this.resetFont(); // Reset right after drawing the text
  } else if (this.state.current === 'gameOver') {  // Add this
    this.setFont(GameConfig.ui.fontSize);
    this.ctx.fillText('Game Over', getCanvasCenter(this.canvas).x, getCanvasCenter(this.canvas).y);
    this.resetFont(); // Reset right after drawing the text
  }
}

drawTransitionText(message) {
  this.setFont(GameConfig.ui.fontSize);
  this.ctx.fillText(message, getCanvasCenter(this.canvas).x, getCanvasCenter(this.canvas).y);
  this.resetFont();
}
}

export default UIManager;