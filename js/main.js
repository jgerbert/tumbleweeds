/**
 * Main.js - The entry point of the Tumbleweed Pong game.
 *
 * This file is responsible for initializing the HTML canvas element and creating
 * a GameController instance. Its primary purpose is to set up the game environment
 * and separate the game's core logic (handled by GameController) from the initial
 * setup and configuration.
 *
 * By using Main.js as the starting point for the application, the structure of the
 * game remains organized, making it easier to maintain and expand the code in the
 * future. It serves as a convenient place to initiate the game while keeping it
 * separate from the game's internal logic.
 */

// This section imports all the necessary modules using ES6 module syntax.
import GameController from './controllers/GameController.js';
import GameStage from './models/GameStage.js';

// This section gets the gameCanvas element and sets its dimensions 
// to match the window dimensions.
const canvas = document.getElementById('gameCanvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const initialLevel = 1;  // or whatever your initial level is
const gameStage = new GameStage(canvas.width, canvas.height, initialLevel);
// Create a new GameController instance and pass the canvas to it
const gameController = new GameController(gameStage, canvas);
gameStage.setGameController(gameController);
