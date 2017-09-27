/*
	A possible template for a CollisionSystem.
	Handles collisions between objects like player, projectiles, and asteroids.
 */

class CollisionSystem extends System {
	// @param player: The player
	// @param asteroids: An array of asteroids
	constructor(player = null, asteroids = null) {
		super();
		this.player = player;
		this.asteroids = asteroids;
	}
	update() {
		//TODO implement collision checking & handling
		/*  Example
			for each asteroid
				if asteroid is colliding with player
				player.damage(asteroid.density)
				asteroid.deactivate(false);
				//possibly publish a CollisionEvent, for other Systems interested
				//in collisions. ex sound or particle system.
				this.publishEvent(new CollisionEvent());
		*/
	}
}
