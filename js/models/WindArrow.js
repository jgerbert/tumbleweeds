import Particle from './Particle.js'; 

// Configuration Constants for WindArrow
const WIND_ARROW_MIN_PARTICLES = 0;  // Minimum number of particles for visualization
const WIND_ARROW_MAX_PARTICLES = 0.4; // Maximum number of particles for strong winds
const WIND_ARROW_SIZE = 66;          // Size of the wind arrow for visualization
const WIND_ARROW_SCALING_FACTOR = 0.001; // Factor to scale wind magnitude to a visual representation

/**
 * Represents the wind arrow used to visualize wind direction and force.
 * This class manages the display of a wind arrow and the generation of particles
 * to represent the effect of wind in the game environment.
 */
class WindArrow {
    /**
     * Constructor to initialize the WindArrow with necessary properties.
     * @param {CanvasRenderingContext2D} renderContext - The canvas rendering context.
     */
    constructor(renderContext) {
        this.size = WIND_ARROW_SIZE;  // Size of the arrow for rendering
        this.scalingFactor = WIND_ARROW_SCALING_FACTOR;  // Scaling factor for wind magnitude
        this.particleUpdateRate = 1000 / 60; // Rate to limit particle updates (60fps)
        this.prevNumParticles = null; // Tracks previous particle count for optimization
        this.particles = []; // Stores generated particles
        this.lastUpdateTime = performance.now(); // Timestamp of the last update
        this.ctx = renderContext; // Canvas rendering context for drawing
    }

    /**
     * Eases out cubic transitions for smooth animations.
     * @param {number} t - The time variable in the range [0, 1].
     * @return {number} The eased value.
     */
    easeOutCubic(t) {
        return 1 - Math.pow(1 - t, 3);
    }

    /**
     * Scales a value linearly from one range to another.
     * @param {number} value - The input value to be scaled.
     * @param {number} valueMin - The minimum of the input range.
     * @param {number} valueMax - The maximum of the input range.
     * @param {number} outputMin - The minimum of the output range.
     * @param {number} outputMax - The maximum of the output range.
     * @return {number} The scaled output value.
     */
    linearScale(value, valueMin, valueMax, outputMin, outputMax) {
        return outputMin + (outputMax - outputMin) * ((value - valueMin) / (valueMax - valueMin));
    }

    /**
     * Generates particles to visualize the wind force.
     * @param {Object} force - The wind force vector.
     * @param {number} numParticles - Number of particles to generate.
     * @return {Particle[]} An array of new Particle instances.
     */
    generateParticles(force, numParticles) {
        const windAngle = Math.atan2(force.y, force.x);
        let newParticles = [];

        for (let i = 0; i < numParticles; i++) {
            const x = this.ctx.canvas.width / 2; // Particle starting position x-coordinate
            const y = this.ctx.canvas.height;    // Particle starting position y-coordinate
            const angleOffset = (Math.random() - 0.5) * Math.PI / 4; // Random angle variation
            const initialForce = Math.sqrt(force.x**2 + force.y**2) * (Math.random() * 0.5 + 0.5); // Force acting on particle
            const thrustTime = Math.random() * 0 + 900; // Time duration for particle thrust
    
            newParticles.push(new Particle(x, y, windAngle + angleOffset, initialForce, thrustTime));
        }
        return newParticles;
    }

    /**
     * Updates the wind arrow's properties and generates particles based on wind force.
     * @param {Object} force - The wind force vector.
     * @return {Particle[]} An array of new Particle instances.
     */
    update(force) {
        const windAngle = Math.atan2(force.y, -force.x);
        const windMagnitude = Math.sqrt(force.x * force.x + force.y * force.y);

        // Determine the number of particles based on wind magnitude
        const numParticles = Math.floor(this.linearScale(windMagnitude, 0.00002, 0.00012, WIND_ARROW_MIN_PARTICLES, WIND_ARROW_MAX_PARTICLES));

        let newParticles = [];
        if (this.prevNumParticles === null || this.prevNumParticles !== numParticles) {
            newParticles = this.generateParticles(force, numParticles);
            this.particles = this.particles.concat(newParticles);
        }

        // Opacity calculation based on wind magnitude
        const minOpacity = .05;
        const maxOpacity = .4; 
        const opacity = this.linearScale(windMagnitude, 0.00002, 0.00012, minOpacity, maxOpacity);

        // Draw the wind arrow with appropriate rotation and opacity
        const bottomMargin = 10; // Margin for positioning the wind arrow at the bottom
        this.ctx.save(); // Save the current state of the canvas context

        // Position and rotate the wind arrow according to the wind direction
        this.ctx.translate(this.ctx.canvas.width / 2, this.ctx.canvas.height - (bottomMargin + this.size / 2));
        this.ctx.rotate(-windAngle); // Rotate the arrow to align with the wind direction

        // Set the style for the wind arrow (semi-transparent white based on wind strength)
        this.ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;

        // Draw the arrow shape
        this.ctx.beginPath();
        this.ctx.moveTo(-this.size / 2, 0); // Start at the left point of the arrow
        this.ctx.lineTo(this.size / 2, 0); // Line to the right point
        // Line back to create the arrowhead (size scaled with wind magnitude)
        this.ctx.lineTo(this.size / 2 - windMagnitude * this.scalingFactor, 0.5 * this.size / 6);
        this.ctx.closePath();
        this.ctx.fill(); // Fill the arrow shape with the current fill style
        
        this.ctx.restore(); // Restore the canvas context to its saved state

        return newParticles; // Return the new particles for further processing if needed
    }
}

// Export the WindArrow class for external use.
export default WindArrow;