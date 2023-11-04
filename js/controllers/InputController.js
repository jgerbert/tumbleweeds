// responsible for handling user input in the Tumbleweed Pong game.

// import PaddleClass from '../models/Paddle.js';

class InputController {
  constructor(leftPaddle, rightPaddle, canvas, controlLeftPaddle = false) {
    this.leftPaddle = leftPaddle;
    this.rightPaddle = rightPaddle;
    this.canvas = canvas;
    this.controlLeftPaddle = controlLeftPaddle;
    this.keyStates = {};
    
    this.engine = leftPaddle.engine;
    this.gameStage = leftPaddle.gameStage;
    
    this.keyStates = {
        32: false, // Spacebar
        80: false, // 'p' key
    };
    
    this.addMouseAndTouchControl();
    this.addKeyboardControl();
  }    

  setControlLeftPaddle(value) {
    this.controlLeftPaddle = value;
    this.addMouseAndTouchControl();
  }

  addMouseAndTouchControl() {
    const canvasRect = this.canvas.getBoundingClientRect();

    const updatePaddlePosition = (paddle, posY) => {
      if (posY < paddle.height / 2) {
        paddle.setYPosition(paddle.height / 2);
      } else if (posY > this.canvas.height - paddle.height / 2) {
        paddle.setYPosition(this.canvas.height - paddle.height / 2);
      } else {
        paddle.setYPosition(posY);
      }
    };

    this.canvas.onmousemove = (event) => {
      const mouseY = event.clientY - canvasRect.top;
      if (this.controlLeftPaddle) {
        updatePaddlePosition(this.leftPaddle, mouseY);
      }
      updatePaddlePosition(this.rightPaddle, mouseY);
    };

    this.canvas.ontouchmove = (event) => {
      const touchY = event.touches[0].clientY - canvasRect.top;
      if (this.controlLeftPaddle) {
        updatePaddlePosition(this.leftPaddle, touchY);
      }
      updatePaddlePosition(this.rightPaddle, touchY);
    };
  }

  handleKeyDown(event) {
    if (event.key === 'l' || event.key === 'L') {
      this.leftPaddle.windUp();
    }
    if (event.key === 'a' || event.key === 'A') {
      this.rightPaddle.windUp();
    }
  }

  handleKeyUp(event) {
    if (event.key === 'l' || event.key === 'L') {
      this.leftPaddle.kick();
    }
    if (event.key === 'a' || event.key === 'A') {
      this.rightPaddle.kick();
    }
  }
/*property
    addEventListener, bind, handleKeyDown, handleKeyUp
*/
addKeyboardControl() {
  document.addEventListener('keydown', ((event) => {
    this.handleKeyDown(event);
  }).bind(this));

  document.addEventListener('keyup', ((event) => {
    this.handleKeyUp(event);
  }).bind(this));
}
}

export default InputController