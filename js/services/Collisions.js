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
        this.pingSound = new Audio(this.assets.audio.ping);
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
    
                            // Play the ping sound and create particles
                            this.playPingSound();
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

  playPingSound() {
        this.pingSound.play();
  }

  updateCollisionEffect() {
      this.collisionEffect.update();
  }

  renderCollisionEffect(ctx) {
      this.collisionEffect.render(ctx);
  }
}

export default CollisionHandler;
