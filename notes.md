

## To Do
- High score tracking.
- Responsive UI for desktop and mobile devices.
- Animation illusions
- Game Paused on Key press P 
- Single player and two player modes.

## Wish List
  - Powerups
    - Speed: increases the velocity of the ball by 20%.
    - Sticky: when the ball collides with the paddle, the ball remains stuck to the paddle unless the spacebar is pressed again. This allows the player to better position the ball before releasing it.
    - Pass-Through: collision resolution is disabled for non-solid blocks, allowing the ball to pass through multiple blocks.
    - Pad-Size-Increase: increases the width of the paddle by 50 pixels.
    - Confuse: activates the confuse postprocessing effect for a short period of time, confusing the user.
    - Chaos: activates the chaos postprocessing effect for a short period of time, heavily disorienting the user.
    - Slingshot
    - confetti cannons on win

## Animation Illusions    
    Here are a few thoughts on animation illusions that can be used in video games:

Squash and stretch - Exaggerating the squashing and stretching of objects can make motions seem more dynamic. For example, when a character jumps, you may squash them down as they crouch and then stretch them upwards as they spring up. This exaggeration of the motion makes it seem more alive.
Anticipation - Before a major action, animating a wind up or anticipation can add appeal and weight to the motion. For example, a character may lean back or swing their arms backwards before throwing a punch or jumping.
Secondary motion - Adding extra secondary motions in addition to the primary action can make animations seem more realistic. For example, having a character's clothes or hair move after they stop running, or jiggling/bouncing effects after an impact.
Slow in and slow out - Animating objects to speed up and slow down gradually at the starts and ends of motions makes the movement seem less robotic. This ease in and ease out gives a more natural, appealing feel.
Exaggerated physics - Exaggerating physics effects like gravity, momentum, and inertia can give more life to motions. For example, elongating the floaty hang time on a character's jump before gravity pulls them down.
Particle effects - Using particle effects like trails, dust clouds and debris adds extra flair to things like running, jumping and impacts for added dynamism.
Overlapping action - Having different parts of a character or object move at slightly different rates creates a more complex, organic look to animation. For example, having a character's arms and legs move at different rates when running.
The key is to push the exaggeration and secondary motion to add appeal, weight and dynamism to key actions the player sees often. Clever illusions can bring limited animations to life.

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

## Alt Project Structure

- `index.html`: Main HTML file containing the canvas element and links to CSS and JavaScript files.
- `assets/fonts/`: Directory for fonts.
- `assets/images/`: Directory for images.
- `js/models/`: Directory for game models.
  - `World.js`: Represents the Matter.js world with game elements.
  - `Paddle.js`: Represents the paddles and their behavior.
  - `Tumbleweed.js`: Represents the ball and its movement logic.
  - `Player.js`: Represents a game player.
  - `Wind.js`: The Wind object.
  - `WindArrow.js`: manages the display of a wind arrow and the generation of particles to represent the effect of wind in the game 
- `Particle.js`: particles class manages the partcles that represent dust in the game.
- `js/views/`: Directory for game views.
  - `WorldView.js`: Renders the Matter.js world on the canvas.
  - `UIManager.js`: Manages UI elements like scores and display area.
- `js/controllers/`: Directory for game controllers.
  - `GameController.js`: Manages game logic and game loop.
  - `InputController.js`: Handles user input and in-game actions.
- `js/main.js`: Initializes the game, sets up event listeners, and starts the game loop.
- `js/utils.js`: Utility functions for browser resize handling, mobile device orientation checks, and other reusable code.
- `css/styles.css`: Styles for game elements ensuring responsive design.

