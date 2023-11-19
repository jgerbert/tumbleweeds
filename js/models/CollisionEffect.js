class CollisionEffect {
    /**
     * Constructor for the CollisionEffect class.
     * Initializes an empty array to hold particle objects.
     */
    constructor() {
        this.particles = []; // Array to store active particles
    }

    /**
     * Creates particles that simulate a ricochet effect upon collision.
     * @param {Object} collisionPoint - The point of collision.
     * @param {Object} collisionNormal - The normal vector at the point of collision.
     * @param {number} numParticles - The number of particles to create.
     */
    createRicochetParticles(collisionPoint, collisionNormal, numParticles = 20) {
        const colors = ['#8b4513', '#654321', '#a0522d']; // Darker shades of brown

        for (let i = 0; i < numParticles; i++) {
            // Adjusted angle and increased speed for a 'zing' effect
            const angle = Math.atan2(-collisionNormal.y, -collisionNormal.x) + (Math.random() - 0.5) * Math.PI / 3;
            const speed = Math.random() * 3 + 2; // Increased initial speed

            // Smaller, elongated, and irregular size
            const size = Math.random() * 2 + 1; // Much smaller size
            const opacity = 0.8 - Math.random() * 0.4;

            const particle = {
                x: collisionPoint.x,
                y: collisionPoint.y,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                size,
                color: colors[i % colors.length],
                opacity,
                lifespan: 60 // Adjust as needed
            };

            this.particles.push(particle);
        }
    }

    /**
     * Updates the state of each particle.
     * Moves particles based on their velocity and decreases their lifespan.
     */
    update() {
        this.particles.forEach(particle => {
            // Update particle position based on its velocity
            particle.x += particle.vx;
            particle.y += particle.vy;

            // Fade out logic: decrease opacity
            const fadeRate = 0.02; // Adjust to control fade-out speed
            particle.opacity -= fadeRate;
            particle.opacity = Math.max(particle.opacity, 0); // Ensure opacity stays above 0

            // Decrease lifespan
            particle.lifespan--;
        });

        // Remove particles that have ended their lifespan
        this.particles = this.particles.filter(particle => particle.lifespan > 0);
    }

    /**
     * Renders the particles to the canvas.
     * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
     */
    render(ctx) {
        this.particles.forEach(particle => {
            // Render elongated and irregular shapes
            ctx.fillStyle = particle.color;
            ctx.beginPath();
            ctx.ellipse(particle.x, particle.y, particle.size, particle.size / 2, Math.random() * Math.PI, 0, 2 * Math.PI);
            ctx.fill();
        });
    }
}

// Export the CollisionEffect class for use in other modules
export default CollisionEffect;
