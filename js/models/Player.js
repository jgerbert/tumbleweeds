 class Player {
  constructor(isServing = false) {
    this.score = 0; // The player's score
    this.isServing = isServing; // Flag indicating if the player is serving
  }

  // Increments the score of the player by one
  addPoint() {
    this.score++;
  }

  // Toggles the serving status of the player
  toggleServingStatus() {
    this.isServing = !this.isServing;
  }

  // Sets the serving status of the player
  setServingStatus(isServing) {
    this.isServing = isServing;
  }

  // Retrieves the current score of the player
  getScore() {
    return this.score;
  }

  // Resets the player's score to zero
  resetScore() {
    this.score = 0;
  }

  // Retrieves the current serving status of the player
  isPlayerServing() {
    return this.isServing;
  } 
} 

export default Player; 
