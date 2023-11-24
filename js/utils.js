/**
 * utils.js - A utility module containing helper functions for the Tumbleweed Pong game.
 *
 * This module provides two utility functions that are used throughout the game:
 *
 * 1. preloadImages(): A function responsible for preloading all necessary images
 *    for the game. By preloading images, the game ensures that all required assets
 *    are loaded and ready to use before the game starts, preventing visual glitches
 *    or delays in rendering due to loading times.
 *
 * 2. lockScreenOrientation(): A function responsible for locking the screen orientation
 *    to landscape mode on mobile devices. This is important for ensuring a consistent
 *    and enjoyable gameplay experience on mobile devices, as the game is designed to
 *    be played in landscape mode.
 *
 * By organizing these utility functions in a separate module, the code remains clean,
 * modular, and easier to maintain, allowing for more straightforward modification or
 * extension in the future.
 */

// Preload images and audio files before starting the game
export function preloadAssets() {
  const images = {
    leftPaddle: 'assets/images/p1-paddle.png',
    rightPaddle: 'assets/images/p2-paddle.png',
    tumbleweed: 'assets/images/tumbleweed.png',
    background1: 'assets/images/background1.png',
    background3: 'assets/images/background3.png',
  };

  const audioFiles = {
    thump: 'assets/sounds/THUMP.mp3',
    beep: 'assets/sounds/bloop.mp3',
    gunshot: 'assets/sounds/gunshot.mp3',
    go: 'assets/sounds/go.mp3',
    3: 'assets/sounds/3.mp3',
    2: 'assets/sounds/2.mp3',
    1: 'assets/sounds/1.mp3',
    round1: 'assets/sounds/round1.mp3',
    round2: 'assets/sounds/round2.mp3',
    round3: 'assets/sounds/round3.mp3',
    round4: 'assets/sounds/round4.mp3',
    round5: 'assets/sounds/round5.mp3',
    gameover1: 'assets/sounds/gameover1.mp3',
    gameover2: 'assets/sounds/gameover2.mp3',
    gameover3: 'assets/sounds/gameover3.mp3',
    song1: 'assets/sounds/song1.mp3',
    doh1: 'assets/sounds/doh1.mp3',
    doh2: 'assets/sounds/doh2.mp3',
    ping: 'assets/sounds/ping.mp3',
    // gameover4: 'assets/sounds/gameover4.mp3',
  };

  // Preload images
  const imagePromises = Object.entries(images).map(([key, src]) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = src;
      img.onload = () => resolve([key, img]);
    });
  });

  // Preload audio files
  const audioPromises = Object.entries(audioFiles).map(([key, src]) => {
    return new Promise((resolve) => {
      const audio = new Audio();
      audio.src = src;
      audio.oncanplaythrough = () => {
        resolve([key, src]); // return the src string, not the Audio object
      };
    });
  });
  
  return Promise.all([...imagePromises, ...audioPromises]).then((assets) => {
    const assetObject = { images: {}, audio: {} };
    assets.forEach(([key, value]) => {
      if (images.hasOwnProperty(key)) {
        assetObject.images[key] = value;
      } else if (audioFiles.hasOwnProperty(key)) {
        assetObject.audio[key] = value;
      }
    });
    return assetObject;
  });
}    

// Lock Screen Orientation on mobile devices
export function lockScreenOrientation() {
    if (screen.orientation && screen.orientation.lock) {
      screen.orientation.lock('landscape').catch((error) => {
        console.error('Screen Orientation API not supported:', error);
      });
    } else {
      console.error('Screen Orientation API not supported');
    }
  }

  // Get the center of the canvas
  export function getCanvasCenter(canvas) {
    return {
      x: canvas.width / 2,
      y: canvas.height / 2
    };
  }