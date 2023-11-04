
class gameStageView {
  constructor(gameStage, canvas, leftPaddle, rightPaddle, tumbleweed) {
    this.gameStage = gameStage;
    this.canvas = canvas;
    this.context = canvas.getContext('2d');
    this.leftPaddle = leftPaddle;
    this.rightPaddle = rightPaddle;
    this.tumbleweed = tumbleweed;
  }

  setBackground(background) {  // Add this method
    this.background = background;
  }

  render() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    // update the canvas background image
    if (this.background) {
      this.canvas.style.backgroundImage = `url('${this.background}')`;
    }
    this.leftPaddle.render(this.context);
    this.rightPaddle.render(this.context);
    const tumbleweed = this.gameStage.getTumbleweed();
    if (tumbleweed) {
      tumbleweed.render(this.context);
    }
  }

  clearCanvas() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
}

export default gameStageView;