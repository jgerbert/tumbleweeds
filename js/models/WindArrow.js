import Particle from './Particle.js'; 

// Represents the wind arrow used to visualize wind direction and force.
class WindArrow {
    // Constructor initializes the WindArrow with necessary properties.
    constructor(renderContext) {
        this.size = 36; // Static size of the wind arrow
        this.scalingFactor = 0.001; // Factor to scale wind magnitude to a visual representation
        this.particleUpdateRate = 1000 / 60; // Limit updates to 60fps
        this.prevNumParticles = null; // Previous count of particles generated
        this.particles = []; // List to store particles
        this.lastUpdateTime = performance.now(); // Timestamp of last update
        this.ctx = renderContext; // Canvas rendering context
    }

    // Cubic easing function for smooth transitions
    easeOutCubic(t) {
        return 1 - Math.pow(1 - t, 3);
    }

    // Function to scale a value linearly from one range to another
    linearScale(value, valueMin, valueMax, outputMin, outputMax) {
        return outputMin + (outputMax - outputMin) * ((value - valueMin) / (valueMax - valueMin));
    }

    // Generate particles to visualize wind force
    generateParticles(force, numParticles) {
        const windAngle = Math.atan2(force.y, force.x);
        let newParticles = []; // Create a temporary array to hold new particles
    
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

    // Update wind arrow properties and generate particles based on wind force
    update(force) {
        const windAngle = Math.atan2(force.y, -force.x); // Angle of the wind force
        const windMagnitude = Math.sqrt(force.x * force.x + force.y * force.y); // Magnitude of the wind force
    
        const minParticles = 1;  // Minimum number of particles
        const maxParticles = 1;  // Maximum number of particles
        const numParticles = Math.floor(this.linearScale(windMagnitude, 0.00002, 0.00012, minParticles, maxParticles)); // Number of particles based on wind magnitude
    
        let newParticles = []; // Initialize an empty array to capture new particles
    
        if (this.prevNumParticles === null || this.prevNumParticles !== numParticles) {
            newParticles = this.generateParticles(force, numParticles);
            this.particles = this.particles.concat(newParticles); // Add new particles to existing ones
        }        
    
        // Define range values for wind magnitude and opacity
        const minWindMagnitude = 0.00002;
        const maxWindMagnitude = 0.00012;
        const minOpacity = .05;
        const maxOpacity = .4; 
        const opacity = this.linearScale(windMagnitude, minWindMagnitude, maxWindMagnitude, minOpacity, maxOpacity); // Calculate opacity based on wind magnitude
    
        const bottomMargin = 10; // Margin for wind arrow positioning
        this.ctx.save(); // Save the current canvas context state
    
        this.ctx.translate(this.ctx.canvas.width / 2, this.ctx.canvas.height - (bottomMargin + this.size / 2)); // Position the arrow
        this.ctx.rotate(-windAngle); // Rotate the arrow based on wind direction
        this.ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`; // Set fill style with calculated opacity
    
        // Draw the arrow shape
        this.ctx.beginPath();
        this.ctx.moveTo(-this.size / 2, 0);
        this.ctx.lineTo(this.size / 2, 0);
        this.ctx.lineTo(this.size / 2 - windMagnitude * this.scalingFactor, 0.5 * this.size / 6);
        this.ctx.closePath();
        this.ctx.fill();
        
        this.ctx.restore(); // Restore the canvas context state
    
        return newParticles; // Return the new particles at the end of the update
    }
}

// Export the WindArrow class for external use.
export default WindArrow;