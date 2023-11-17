// Import Matter.js using Skypack CDN
import Matter from 'https://cdn.skypack.dev/matter-js@0.18.0';
import GameConfig from '../GameConfig.js';

// Class representing the game stage or arena.
class gameStage {
  constructor(canvasWidth, canvasHeight, level) {

    // Create a physics engine instance.
    this.matterEngine = Matter.Engine.create();
    
    // Get the physics world instance from the engine and set vertical gravity.
    this.matterWorld = this.matterEngine.world;
    this.matterWorld.gravity.y = GameConfig[`level${level}`].world.gravity;

    // Define the wall properties, which are static bodies (non-moveable) with specific rendering options.
    this.wallOptions = {
      isStatic: true,
    };

    // Initialize game boundaries
    this.setupBoundaries(canvasWidth, canvasHeight);
    
    // Initialize an empty placeholder for the tumbleweed object.
    this.tumbleweed = null;

     // Set the game controller
    this.gameController = null;

    // Enable debug rendering
    // this.enableDebugRendering(canvasWidth, canvasHeight);
    }
  
  setGameController(gameController) {
    this.gameController = gameController;
  }

  setAIController(aiController) {
    this.aiController = aiController;
  }

  // Method to create or update the walls (boundaries) of the game stage
  setupBoundaries(canvasWidth, canvasHeight) {
    const wallWidth = 100;  // Thickness of the walls
    const offset = 49;  // Offset for the collection zones

    // Using helper function to reduce repetitive code
    this.topWall = this.createWall(this.topWall, canvasWidth / 2, -wallWidth / 2, canvasWidth, wallWidth);
    this.bottomWall = this.createWall(this.bottomWall, canvasWidth / 2, canvasHeight + wallWidth / 2, canvasWidth, wallWidth);
    this.leftWall = this.createWall(this.leftWall, -wallWidth / 2 - offset, canvasHeight / 2, wallWidth, canvasHeight, 'leftCollectionZone');
    this.rightWall = this.createWall(this.rightWall, canvasWidth + wallWidth / 2 + offset, canvasHeight / 2, wallWidth, canvasHeight, 'rightCollectionZone');
    }

  // Helper method to create or update a wall
  createWall(wall, posX, posY, width, height, label) {
    if (wall) {
      Matter.Body.setPosition(wall, { x: posX, y: posY });
      Matter.Body.setVertices(wall, Matter.Vertices.fromPath(`0 0 ${width} 0 ${width} ${height} 0 ${height}`));
    } else {
      const options = label ? { ...this.wallOptions, label } : this.wallOptions;
      wall = Matter.Bodies.rectangle(posX, posY, width, height, options);
      Matter.World.add(this.matterWorld, wall);
    }
    return wall;
  }

  // Method to add a game object to the Matter.js world.
  addGameObject(gameObject) {
    // Add the game object's body to the physics world.
    Matter.World.add(this.matterWorld, gameObject.body);
  }

  setTumbleweed(tumbleweed) {
    this.tumbleweed = tumbleweed;
    // Add the tumbleweed's body to the Matter.js world.
    this.addGameObject(tumbleweed);
  }

  getTumbleweed() {
    return this.tumbleweed;
  }

  removeTumbleweed() {
    if (this.tumbleweed) {
      Matter.World.remove(this.matterWorld, this.tumbleweed.body);
      this.tumbleweed = null;
      // Assuming the AIController instance is correctly managed in GameController, you can call removeTumbleweed() like this:
      // this.gameController.aiController.removeTumbleweed();
    }
  }
// renderer for wireframes 
  /* enableDebugRendering(canvasWidth, canvasHeight) {
    // Create a renderer using the canvas element
    this.renderer = Matter.Render.create({
        element: document.body, // You can change this to a specific HTML element if needed
        engine: this.matterEngine,
        options: {
            width: canvasWidth,
            height: canvasHeight,
            wireframes: true, // Shows the shapes of the bodies
            showCollisions: true, // Highlights collision points
            showVelocity: true, // Shows velocity vectors
            // ... other options ...
        }
    });

    // Run the renderer
   Matter.Render.run(this.renderer);
} */
}

export default gameStage;
