/*
	A template for a CollisionSystem.
	Handles collisions between objects like player, projectiles, and asteroids.
	NOTE: alter as needed.
 */



class CollisionSystem extends System {
	// @param player: The player
	// @param asteroids: An array of asteroids
	constructor(player, asteroids) {
		if (player instanceof Player == false || asteroids instanceof Array == false) { throw new Error("Invalid arguments"); }
		super();
		
		// GameObjects or lists of GameObjects that will be checked for collisions.
		this.player = player;
		this.asteroids = asteroids;
		// this.projectiles = player.getProjectiles(); //get the player's list of projectiles.
		// this.enemies = enemies;
	}
	
	update() {
		this.checkPlayer_Asteroids();
		this.checkProjectiles_Asteroids();
	}
	
	// Check if player is colliding with an asteroid
	checkPlayer_Asteroids() {
		// TODO check collision
		// TODO handle the collision
	}
	
	// Check if any of the player's projectiles are colliding wit an asteroid
	checkProjectiles_Asteroids() {
		// TODO check collision
		// TODO handle the collision
	}
	
	//NOTE example method for if an asteroid is hit
	damageAsteroid(asteroid, projectile) {
		asteroid.damage(projectile.getDamage);
	}
}
