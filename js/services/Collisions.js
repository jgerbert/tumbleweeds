// The CollisionHandler class is a blueprint for creating collision handling objects
// in Object-Oriented Programming (OOP). It's designed to handle the collisions of
// game entities (in this case, the tumbleweed and paddles).
import CollisionEffect from '../models/CollisionEffect.js'; // Path to where the CollisionEffect class is located

class CollisionHandler {
    constructor(leftPaddle, rightPaddle, gameStage, assets, leftPlayer, rightPlayer) {
        this.leftPaddle = leftPaddle;
        this.rightPaddle = rightPaddle;
        this.gameStage = gameStage;
        this.assets = assets;
        this.leftPlayer = leftPlayer;
        this.rightPlayer = rightPlayer;
        this.thumpSound = new Audio(this.assets.audio.thump);
        this.collisionEffect = new CollisionEffect(); // Initialize CollisionEffect
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

            // Log colliding bodies and their velocities
            console.log('Colliding bodies:', pair.bodyA.label, pair.bodyB.label);
            console.log('Body A velocity:', pair.bodyA.velocity);
            console.log('Body B velocity:', pair.bodyB.velocity);

            // Identify if we have a collision with a paddle
            const paddle = (pair.bodyA === this.leftPaddle.body || pair.bodyA === this.rightPaddle.body)
                ? pair.bodyA
                : (pair.bodyB === this.leftPaddle.body || pair.bodyB === this.rightPaddle.body)
                ? pair.bodyB
                : null;

            if (paddle && (pair.bodyA === tumbleweed || pair.bodyB === tumbleweed)) {
                this.playThumpSound();

                // Calculate the speed of the tumbleweed
                const tumbleweedSpeed = Math.sqrt(tumbleweed.velocity.x ** 2 + tumbleweed.velocity.y ** 2);
                const thresholdSpeed = 13.00; // ricochet particle threshold 

                if (tumbleweedSpeed > thresholdSpeed) {
                    let validContactFound = false;
                
                    for (let i = 0; i < pair.contacts.length; i++) {
                        const contact = pair.contacts[i];
                        if (contact && contact.vertex) {
                            const collisionPoint = { x: contact.vertex.x, y: contact.vertex.y };
                            const collisionNormal = { x: pair.collision.normal.x, y: pair.collision.normal.y };
                
                            console.log(`Valid contact found at index ${i}:`, collisionPoint);
                            this.collisionEffect.createRicochetParticles(collisionPoint, collisionNormal);
                            validContactFound = true;
                            break; // Break after finding the first valid contact
                        }
                    }
                
                    if (!validContactFound) {
                        console.log('No valid contact point found for collision');
                    }
                }                
            }
    
            // Identify if we have a collision with a collection zone
            const collectionZone = (pair.bodyA.label === 'leftCollectionZone' || pair.bodyA.label === 'rightCollectionZone')
                ? pair.bodyA
                : (pair.bodyB.label === 'leftCollectionZone' || pair.bodyB.label === 'rightCollectionZone')
                ? pair.bodyB
                : null;
    
            if (collectionZone && (pair.bodyA === tumbleweed || pair.bodyB === tumbleweed)) {
                if (collectionZone.label === 'leftCollectionZone') {
                    this.rightPlayer.addPoint();
                    this.rightPlayer.isServing = true;
                    this.leftPlayer.isServing = false;
                } else { // rightCollectionZone
                    this.leftPlayer.addPoint();
                    this.leftPlayer.isServing = true;
                    this.rightPlayer.isServing = false;
                }
                this.gameStage.removeTumbleweed();
            }
        });
    }    

  playThumpSound() {
      this.thumpSound.play();
  }

  updateCollisionEffect() {
      this.collisionEffect.update();
  }

  renderCollisionEffect(ctx) {
      this.collisionEffect.render(ctx);
  }
}

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