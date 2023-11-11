
# Tumbleweeds Game
A unique and engaging 2D physics-based game where players control paddles to interact with a tumbleweed in a dynamic environment.

## Table of Contents
1. [Game Features](#game-features)
2. [Project Structure](#project-structure)
3. [Technical Requirements](#technical-requirements)
4. [Setup and Installation](#setup-and-installation)
5. [Contributing](#contributing)
6. [License](#license)

## Game Features
- Classic Pong gameplay with a twist.
- Single player and two player modes.
- Customizable game settings.
- Responsive UI for desktop and mobile devices.
- High score tracking.


# Project Structure

## `js/models/`
Directory for game models.

- `GameStage.js`: Represents the Matter.js world with game elements.
- `Paddle.js`: Represents the paddles and their behavior.
- `Tumbleweed.js`: Represents the tumbleweed Hexagon (ball) and its movement logic.
- `Wind.js`: Represents the wind and its force generation.
- `Player.js`: Represents a game player with properties and methods related to scoring and serving.

## `js/views/`
Directory for game views.

- `gameStageView.js`: Renders the Matter.js world on the canvas.

## `js/controllers/`
Directory for game controllers.

- `GameController.js`: Manages the game loop, handling input, and initializing the game, and interacts with models and views to update and render the game state.
- `InputController.js`: Handles user input and in-game actions.
- `UIManager.js`: Manages UI elements like scores and display area.
- `AIController.js`: Manages the computer player’s paddle movement
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

## Project Structure

1. **index.html**: The main HTML file that includes the canvas element for the game, and the required script tags for Matter.js and the game logic.

2. **main.js**: The entry point of the game, responsible for initializing the game world, controllers, and views. It sets up the game loop and handles game updates and rendering.

3. **gameStage.js**: The game world class, responsible for creating and managing the Matter.js physics world, as well as creating game objects like paddles and tumbleweed.

4. **gameStageView.js**: The world view class, responsible for rendering the game world and its objects on the canvas.

5. **GameController.js**: The game controller class, responsible for managing the game state, handling game events, updating player scores, and managing the game world.

6. **InputController.js**: The input controller class, responsible for handling player input from mouse, touch, and keyboard events. It includes methods for controlling the paddles and interacting with tumbleweed.

7. **Tumbleweed.js**: The tumbleweed model class, representing a tumbleweed object in the game world. It includes properties and methods related to the tumbleweed's physics body, size, position, and initial velocity.

8. **Paddle.js**: The paddle model class, representing a paddle object in the game world. It includes properties and methods related to the paddle's physics body, size, position, and movement.

9. **Player.js**: The player model class, representing a game player. It includes properties for the player's score and serving status, as well as methods for adding points and toggling serving.


## Code Structure

The code structure is organized into **models**, **views**, and **controllers**. The models (`Tumbleweed.js`, `Paddle.js`, and `Player.js`) represent the game objects and their properties. The views (`WorldView.js` and `TumbleweedView.js`) are responsible for rendering the game objects on the canvas. The controllers (`GameController.js` and `InputController.js`) manage the game state and handle player input.

The game uses **Matter.js**, a 2D physics engine, for managing the physics world and the interactions between game objects. The code is modular and organized in a way that makes it easy to understand and extend. The use of classes and methods, as well as proper naming conventions, ensures that the code is easy to read and maintain.



## OLD Possible Project Structure

- `index.html`: Main HTML file containing the canvas element and links to CSS and JavaScript files.
- `assets/fonts/`: Directory for fonts.
- `assets/images/`: Directory for images.
- `js/models/`: Directory for game models.
  - `World.js`: Represents the Matter.js world with game elements.
  - `Paddle.js`: Represents the paddles and their behavior.
  - `Tumbleweed.js`: Represents the ball and its movement logic.
  - `Player.js`: Represents a game player.
  - `Wind.js`: The Wind object.
- `js/views/`: Directory for game views.
  - `WorldView.js`: Renders the Matter.js world on the canvas.
  - `UIManager.js`: Manages UI elements like scores and display area.
- `js/controllers/`: Directory for game controllers.
  - `GameController.js`: Manages game logic and game loop.
  - `InputController.js`: Handles user input and in-game actions.
- `js/main.js`: Initializes the game, sets up event listeners, and starts the game loop.
- `js/utils.js`: Utility functions for browser resize handling, mobile device orientation checks, and other reusable code.
- `css/styles.css`: Styles for game elements ensuring responsive design.

## Functional Requirements

The game should include the following features:

- Classic Pong gameplay with two paddles and a ball
- Single player and two player modes
- Customizable game settings such as paddle size, ball speed, and game score limit
- Pause, resume, and restart functionality
- Game over screen with the option to play again or quit

The game should have the following functionality:

- Main menu screen with options to start single player or two player mode, adjust game settings, or quit the game
- Customizable game settings including paddle size, ball speed, game score limit, and sound volume
- Two paddles that can be moved up and down by players using the keyboard or touch controls
- A ball that bounces off walls and paddles and awards points when it passes the opponent's paddle
- High score tracking and display of top scores on the main menu screen
- Pause, resume, and restart functionality during gameplay
- Game over screen with the option to play again or quit the game

## Non-Functional Requirements

- User interface should be responsive and work well on desktop and mobile devices
- The game should have minimal lag or delay during gameplay
- The game should be maintainable and easy to update or modify in the future

## Technical Requirements

The game should be built using the following technologies and frameworks:

- HTML5
- CSS3
- JavaScript
- Matter.js
- Model-View-Controller (MVC) architecture pattern for separation of concerns

## Setup and Installation
To run the game locally:
1. Clone the repository.
2. Open `index.html` in a web browser.

## World Objects

- Top and bottom borders
- Left and right collection zones
- Paddles 
  - Left paddle
  - Right paddle
- Tumbleweeds
- Wind
- Wind Gauge
- UIManager 

## UIManager Objects

- Scores 
- Wind gauge
- Display area for centered UI object module
  - Start button
  - 3 to 1 Countdown
  - Round #_
  - Game Over
  - Game Paused on Key press P 

## Game Functions 

- Tumbleweed and Paddle Collisions
- Paddle kick 
- Player Paddle mouse and touch control
- Computer paddle movement
- Keep Scores with Tumbleweed and Collection Zone Collisions
- Random windforce using Simplex noise with x and y direction and force

## Wish List
  - Powerups
    - Speed: increases the velocity of the ball by 20%.
    - Sticky: when the ball collides with the paddle, the ball remains stuck to the paddle unless the spacebar is pressed again. This allows the player to better position the ball before releasing it.
    - Pass-Through: collision resolution is disabled for non-solid blocks, allowing the ball to pass through multiple blocks.
    - Pad-Size-Increase: increases the width of the paddle by 50 pixels.
    - Confuse: activates the confuse postprocessing effect for a short period of time, confusing the user.
    - Chaos: activates the chaos postprocessing effect for a short period of time, heavily disorienting the user.
    - Slingshot

    Here are a few thoughts on animation illusions that can be used in video games:

Squash and stretch - Exaggerating the squashing and stretching of objects can make motions seem more dynamic. For example, when a character jumps, you may squash them down as they crouch and then stretch them upwards as they spring up. This exaggeration of the motion makes it seem more alive.
Anticipation - Before a major action, animating a wind up or anticipation can add appeal and weight to the motion. For example, a character may lean back or swing their arms backwards before throwing a punch or jumping.
Secondary motion - Adding extra secondary motions in addition to the primary action can make animations seem more realistic. For example, having a character's clothes or hair move after they stop running, or jiggling/bouncing effects after an impact.
Slow in and slow out - Animating objects to speed up and slow down gradually at the starts and ends of motions makes the movement seem less robotic. This ease in and ease out gives a more natural, appealing feel.
Exaggerated physics - Exaggerating physics effects like gravity, momentum, and inertia can give more life to motions. For example, elongating the floaty hang time on a character's jump before gravity pulls them down.
Particle effects - Using particle effects like trails, dust clouds and debris adds extra flair to things like running, jumping and impacts for added dynamism.
Overlapping action - Having different parts of a character or object move at slightly different rates creates a more complex, organic look to animation. For example, having a character's arms and legs move at different rates when running.
The key is to push the exaggeration and secondary motion to add appeal, weight and dynamism to key actions the player sees often. Clever illusions can bring limited animations to life.