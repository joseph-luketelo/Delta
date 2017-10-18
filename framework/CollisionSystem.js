/*
	Checks for and handles collisions between objects like player, projectiles, and asteroids.
	Responsible for determining if conditions of a collision (ex distance threshold).
	NOTE: alter as needed.
 */

class CollisionSystem extends System {
	// @param player: The player
	// @param asteroids: An array of asteroids
	constructor(playerSystem, asteroidSystem) {
		if (playerSystem instanceof PlayerSystem == false || asteroidSystem instanceof GameObjectSystem == false) { throw new Error("Invalid arguments"); }
		super();
		
		// GameObjects or lists of GameObjects that will be checked for collisions.
		this.playerSystem = playerSystem;
		this.asteroidSystem = asteroidSystem;
		// this.projectiles = player.getProjectiles(); //get the player's list of projectiles.
		// this.enemies = enemies;
	}
	
	setup() {
	}
	
	update() {
		this.checkPlayer_Asteroids();
		this.checkProjectiles_Asteroids();
	}
	
	onEnter() {}
	onExit() {}
	render() {}
	
	// Check if player is colliding with an asteroid
	checkPlayer_Asteroids() {
		// TODO check for collision between player & asteroids
		// let player = playerSystem.getPlayer();
		// let asteroids = this.asteroidSystem.getObjects();
	}
	
	// Check if any of the player's projectiles are colliding wit an asteroid
	checkProjectiles_Asteroids() {
		// TODO check collision
	}
	
	//NOTE example method for if an asteroid is hit
	damageAsteroid(asteroid, projectile) {
		asteroid.damage(projectile.getDamage);
	}
}
