// The CollisionHandler class is a blueprint for creating collision handling objects
// in Object-Oriented Programming (OOP). It's designed to handle the collisions of
// game entities (in this case, the tumbleweed and paddles).
class CollisionHandler {
  constructor(leftPaddle, rightPaddle, gameStage, assets, leftPlayer, rightPlayer) {
    this.leftPaddle = leftPaddle;
    this.rightPaddle = rightPaddle;
    this.gameStage = gameStage;
    this.assets = assets;
    this.leftPlayer = leftPlayer;
    this.rightPlayer = rightPlayer;
    this.thumpSound = new Audio(this.assets.audio.thump);
  }

  handleCollision(event) {
    const pairs = event.pairs;
  
    pairs.forEach(pair => {
      const tumbleweedObj = this.gameStage.getTumbleweed();

     // Check if the tumbleweed exists before trying to use it
    if (!tumbleweedObj) {
      return;
    }

    const tumbleweed = tumbleweedObj.body;
  
      // Identify if we have a collision with a paddle
      const paddle = (pair.bodyA === this.leftPaddle.body || pair.bodyA === this.rightPaddle.body)
        ? pair.bodyA
        : (pair.bodyB === this.leftPaddle.body || pair.bodyB === this.rightPaddle.body)
        ? pair.bodyB
        : null;
  
      if (paddle && (pair.bodyA === tumbleweed || pair.bodyB === tumbleweed)) {
        // Call the paddleForce method on the correct paddle object
        if (paddle === this.leftPaddle.body) {
          this.leftPaddle.paddleForce(tumbleweed);
        } else {
          this.rightPaddle.paddleForce(tumbleweed);
        }
        this.playThumpSound();
      }
  
      // Identify if we have a collision with a collection zone
      const collectionZone = (pair.bodyA.label === 'leftCollectionZone' || pair.bodyA.label === 'rightCollectionZone')
        ? pair.bodyA
        : (pair.bodyB.label === 'leftCollectionZone' || pair.bodyB.label === 'rightCollectionZone')
        ? pair.bodyB
        : null;
  
      if (collectionZone && (pair.bodyA === tumbleweed || pair.bodyB === tumbleweed)) {
        // Implement scoring logic depending on the collection zone the tumbleweed collided with
        if (collectionZone.label === 'leftCollectionZone') {
          this.rightPlayer.addPoint();
          this.rightPlayer.isServing = true;
          this.leftPlayer.isServing = false;
        } else { // rightCollectionZone
          this.leftPlayer.addPoint();
          this.leftPlayer.isServing = true;
          this.rightPlayer.isServing = false;
        }
        // Remove the tumbleweed from the gameStage
        this.gameStage.removeTumbleweed();
      }
    });
  }

  playThumpSound() {
    this.thumpSound.play();
  }
   // Call the method to remove the tumbleweed from the game stage
   removeTumbleweed() {
    this.gameStage.removeTumbleweed();
  }
}

// We export the CollisionHandler class so it can be imported and used in other modules.
export default CollisionHandler;

/* 
This CollisionHandler class is designed to handle collisions within the game, 
specifically collisions between tumbleweeds and paddles. Below is a detailed breakdown 
of the class and its methods:

Constructor:
The constructor of the class is called when a new instance of the class is created. 
It takes in leftPaddle, rightPaddle, gameStage, assets, leftPlayer, and rightPlayer 
as parameters and assigns them to the instance of the class. Additionally, it sets up 
an array bodiesToRemove for holding game objects to be removed later and creates a 
new audio object thumpSound for playing a thump sound during a collision. Finally,
it sets up a tumbleweed property, which is initially null, to keep track of the 
tumbleweed object involved in the collision.

handleCollision:
This method is triggered when a collision occurs in the game. It accepts an event object 
that carries data about the collision. This event object contains pairs of bodies involved 
in the collision. The handleCollision method iterates over these pairs and checks for each 
pair if the bodies involved in the collision include a tumbleweed and a paddle (either left 
or right). If so, it applies a force to the tumbleweed in the direction of the paddle (using 
the paddleForce method of the Paddle class) and plays the thump sound.

playThumpSound:
This method plays a thump sound by calling the play method on the thumpSound audio object.

The class is exported as a default export at the end, making it available for importing 
into other modules.
*/
