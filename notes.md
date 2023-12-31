

## To Do
- High score tracking.
- Responsive UI for desktop and mobile devices.
- Animation illusions - Instead of perfectly round particles, consider using irregular shapes or even small animated sprites of dust clouds.  If resources allow, consider adding a small animation for each particle, such as a swirl or puff, to enhance the cartoon-like feel.
- Game Paused on Key press P 
- Single player and two player modes.
- Ricochet sound on high-speed collisions -Sound Effect
For the sound effect, you can trigger a gunshot ricochet sound alongside the particle effect creation. Ensure the sound is brief and has that characteristic 'zing' sound followed by a softer settling noise, mimicking dust settling after the initial impact.

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
    -morgan freeman mode, w/mf narration

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

## ConceptGPT

To enhance the realism and cartoon-like quality of your particle effects in simulating dust blowing in the wind, we can delve into several concepts that bridge computer science, art, and physics. Here's how we can deepen the thought process:

Perlin Noise for Natural Variation: You're already using simplex noise, a derivative of Perlin noise, for wind simulation. Perlin noise is a concept from computer graphics that generates natural-looking textures. You can further leverage this by varying the shape and movement of the dust particles, not just their direction. This introduces the concept of stochastic processes in physics, where systems have random variables and behaviors, closely mimicking the chaotic, uneven movement of dust in nature.

Particle Dynamics and Fluid Simulation: In physics, especially fluid dynamics, the behavior of particles (like dust) in a fluid (like air) is complex and influenced by various factors like air pressure, humidity, and turbulence. Implementing simplified fluid dynamic principles in your code can make the dust movement more realistic. Think about implementing algorithms that mimic vorticity and turbulence to give each particle a unique, lifelike trajectory.

Non-Uniform Shapes and Textures: In the real world, dust isn't perfectly round. It's irregular and varied. To replicate this, introduce variability in shape and texture. This can be achieved through procedural generation, a concept in computer graphics where shapes and textures are algorithmically created rather than manually drawn. This can give each particle a unique, 2D cartoon-like appearance, enhancing the visual diversity and realism of your dust particles.

Lighting and Shading Effects: The appearance of particles is greatly affected by how light interacts with them. Implementing basic lighting and shading models from computer graphics, like Lambertian reflectance for diffuse reflection, can add depth and dimension to your particles, making them appear more 3D in a 2D space. This ties into the broader concept of visual perception and how humans perceive depth and texture.

Artistic Stylization using Animation Principles: Finally, to give it a cartoon feel, apply principles from traditional animation. Concepts like squash and stretch or secondary action can be subtly implemented to give life to the particles. This doesn't just improve visual appeal but also leverages the psychological aspect of gestalt principles, where the human mind perceives patterns and movements in a way that ascribes life-like qualities to inanimate objects.

By integrating these concepts, your particle system can simulate dust in a more realistic, visually appealing manner that aligns with the cartoon aesthetics of your game. This multidisciplinary approach not only solves the technical challenge but also enriches the player's experience by grounding it in a blend of artistic expression and scientific principles.

