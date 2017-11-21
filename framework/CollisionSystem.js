/*
	Checks for and handles collisions between objects like player, projectiles, and asteroids.
	Responsible for determining if conditions of a collision (ex distance threshold).
	NOTE: alter as needed.
	
	
 */

class CollisionSystem extends System {
	// @param player: The player
	// @param asteroids: An array of asteroids
	constructor(playerSystem, asteroidSystem, bulletSystem, bossSystem) {
		if (playerSystem instanceof PlayerSystem == false || asteroidSystem instanceof GameObjectSystem == false) { throw new Error("Invalid arguments"); }

		super();
		
		// GameObjects or lists of GameObjects that will be checked for collisions.
		this.playerSystem = playerSystem;
		this.player = playerSystem.getPlayer();
		this.asteroidSystem = asteroidSystem;
		this.bulletSystem = bulletSystem;
		// this.projectiles = player.getProjectiles(); //get the player's list of projectiles.
		// this.enemies = enemies;
		
		this.bossSystem = bossSystem;
		// this.boss = bossSystem.getObjects()[0];
		// this.bossBullets = this.boss.getBullets(); //Array<Bullet>
		
	}
	
	update() {
		this.checkPlayer_Asteroids();
		this.checkProjectiles_Asteroids();
		
		//TODO:
		//player - asteroids: asteroid damages player
		//player bullets - asteroids: player bullets damage asteroid
		//boss bullets - player: boss bullets damage player
		//boss - player: boss damages player
		//player bullets - boss: bullets damage boss
		
		
		//ex
		// if (this.bossSystem.getObjects()[0] != undefined) {
		// 	this.checkBossCollision();
		// }
	}
	
	onEnter() {}
	onExit() {}
	render() {}

	//check if GameObjects a and b are colliding.
	static Distance_check(a, b){
		if (a instanceof GameObject == false) { throw new TypeError("a needs to be a GameObject."); }
		if (b instanceof GameObject == false) { throw new TypeError("b needs to be a GameObject."); }
		// getting x and y coordinates of each object
		let x1 = a.getX();
		let x2 = b.getX();
		let y1 = a.getY();
		let y2 = b.getY();
		//calculating distance between two points
		let sum = Math.pow((x2-x1),2) + Math.pow((y2-y1), 2);
		let distance = Math.sqrt(sum);
		//check distance
		if(distance < 47){
			return true;
		}
		return false;
	}
	
	//return the distance between two points or objects
	// static getDistance(a, b) {
	// }
	
	//return true or false
	static Distance_check_arr_arr(arrA, arrB) {
		//TODO
	}
	
	// return true or false
	static Distance_check_obj_arr(obj, arr) {
		//TODO
	}
	
	
	
	// Check if player is colliding with an asteroid
	checkPlayer_Asteroids() {
		let asteroids = this.asteroidSystem.getObjects(); //returns an array of asteroids

		let ploc = this.player.getLocation();	
		for (let ast of asteroids) {
			//let loc = ast.getLocation();
			//if distance between player & asteroid < dist
				//ast.deactivate();
				if (CollisionSystem.Distance_check(this.player,ast) == true) {
					this.player.damage(0);
					console.log("damage");
				}
		}

		
		//console.log("....")

		// TODO check for collision between player & asteroids
		// let player = playerSystem.getPlayer();
		// let asteroids = this.asteroidSystem.getObjects();
	}

	

	
	// Check if any of the player's projectiles are colliding wit an asteroid
	checkProjectiles_Asteroids() {
		
		
		// // TODO check collision
		// let asteroids = this.asteroidSystem.getObjects();
		// let projectiles = this.bulletSystem.getObjects();
		// for(let ast of asteroids){
		// 	for(let proj of projectiles){
		// 		if(CollisionSystem.Distance_check(ast,proj) == true){
		// 			asteroids.damage(0);
		// 			console.log("damage asteroid");
		// 		}
		// 	}
		// }
	}
	
	
	
	
	//NOTE example method for if an asteroid is hit
	damageAsteroid(asteroid, projectile) {
		asteroid.damage(projectile.getDamage);
	}
}