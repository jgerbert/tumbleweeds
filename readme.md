
# Tumbleweeds: A Whirlwind Adventure Awaits!
Let's get ready to tumble!! A unique and engaging 2D physics-based game where players control paddles to interact with a tumbleweed in a dynamic environment.

Embark on a whimsical journey in 'Tumbleweeds,' a unique 2D physics-based adventure where strategy meets chaos. Control paddles to navigate a tumbleweed through dynamic environments, mastering the unpredictable forces of wind and physics in this captivating, ever-evolving challenge.

## Table of Contents
1. [Game Features](#game-features)
2. [Technical Details](#technical-details)
3. [Project Structure](#project-structure)
4. [Project Files](#project-files)
5. [Setup and Installation](#setup-and-installation)

## Game Features
- Classic Pong gameplay with a twist.
- Customizable game settings.

## Technical Details
The game is built using the following technologies and frameworks:

- HTML5
- CSS3
- JavaScript
- Matter.js - a 2D physics engine, for managing the physics world and the interactions between game objects.
- Simplex noise for x and y direction + force for wind simulation
- Model-View-Controller (MVC) architecture pattern for separation of concerns for better maintainability and scalability.
- ES6 Modules: Enhances code organization and modularity, making it easier to manage dependencies and updates.

# Project Structure
The code structure is organized into **models**, **views**, and **controllers**. The models (`Tumbleweed.js`, `Paddle.js`, and `Player.js`) represent the game objects and their properties. The views (`GameStageView.js`) is responsible for rendering the game objects on the canvas. The controllers (`GameController.js` and `InputController.js`) manage the game state and handle player input.

## `js/models/`
Directory for game models.
- `CollisionEffect.js`: manages the partcles that represent ricochet dust in the game.
- `GameStage.js`: Represents the Matter.js world with game elements.
- `Paddle.js`: Represents the paddles and their behavior.
- `Tumbleweed.js`: Represents the tumbleweed Hexagon (ball) and its movement logic.
- `Wind.js`: Represents the wind and its force generation. Uses Simplex noise with x and y direction and force.
- `WindArrow.js`: manages the display of a wind arrow and the generation of particles to represent the effect of wind in the game environment
- `Particle.js`: particles class manages the partcles that represent atmospheric dust in the game.
- `Player.js`: Represents a game player with properties and methods related to scoring and serving.

## `js/views/`
Directory for game views.

- `gameStageView.js`: Renders the Matter.js world on the canvas.

## `js/controllers/`
Directory for game controllers.

- `GameController.js`: Manages the game loop, handling input, and initializing the game, and interacts with models and views to update and render the game state.
- `InputController.js`: Handles user input and in-game actions. Player Paddle mouse and touch control.
- `UIManager.js`: Manages UI elements like scores and display area.
- `AIController.js`: Manages the computer player’s paddle movement.
- `RenderingManager.js`: takes care of calling the render() methods of gameStageView and uiManager

## `js/services/`
Directory for game services like collisions.

- `Collisions.js`: Handles in-game collisions.

## `js/main.js`
Initializes the game controller and sets up event listeners.

## `js/utils.js`
Utility functions for browser resize handling, mobile device orientation checks, and other reusable code.

## `js/gameConfig.js`
Separates configuration from code for easier game balancing.

## `css/styles.css`
Styles for game elements ensuring responsive design.

## Project Files

1. **index.html**: The main HTML file that includes the canvas element for the game, and the required script tags for Matter.js and the game logic.

2. **main.js**: The entry point of the game, responsible for initializing the game world, controllers, and views. It sets up the game loop and handles game updates and rendering.

3. **gameStage.js**: The game world class, responsible for creating and managing the Matter.js physics world, as well as creating game objects like paddles and tumbleweed.

4. **gameStageView.js**: The world view class, responsible for rendering the game world and its objects on the canvas.

5. **GameController.js**: The game controller class, responsible for managing the game state, handling game events, updating player scores, and managing the game world.

6. **InputController.js**: The input controller class, responsible for handling player input from mouse, touch, and keyboard events. It includes methods for controlling the paddles and interacting with tumbleweed.

7. **Tumbleweed.js**: The tumbleweed model class, representing a tumbleweed object in the game world. It includes properties and methods related to the tumbleweed's physics body, size, position, and initial velocity.

8. **Paddle.js**: The paddle model class, representing a paddle object in the game world. It includes properties and methods related to the paddle's physics body, size, position, and movement.

9. **Player.js**: The player model class, representing a game player. It includes properties for the player's score and serving status, as well as methods for adding points and toggling serving.

## Setup and Installation
To run the game locally:
1. Clone the repository.
2. Open `index.html` in a web browser.