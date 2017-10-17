/*
Classes for managing game mode, ie scroller/asteroids, and spawning stuff.
Modes: scroller, asteroid, boss
	determines player's movement mode
	determine when things spawn based on score/difficulty
	presets, sample progressions
	
*/

let Mode = {
	ASTEROID: "ASTEROID",
	SCROLLER: "SCROLLER",
	BOSS: "BOSS"
}

//test asteroid that dies after its life runs out
class TestAsteroid extends GameObject {
	constructor() {
		super();
		this.vel = Point.randPoint();
		this.rotSpd = Math.random() * (Math.PI/30);
		this.vel.mult(2);
		this.life = 100;
	}
	update() {
		this.life--;
		if (this.life <= 0) {
			this.deactivate();
		}
		this.transform.getLocation().addPoint(this.vel);
		this.transform.setRotation(this.transform.getRotation() + this.rotSpd);
	}
	render() {
		CTX.save();
		CTX.translate(this.transform.getX(), this.transform.getY());
		CTX.rotate(this.transform.getRotation());
		CTX.fillStyle = Colors.BLACK;
		CTX.fillRect(-5, -5, 10, 10);
		CTX.restore();
	}
	spawn(x, y) {
		this.transform.setLocation(x, y);
	}
	getLife() {
		return this.life;
	}
}



// or spawn frequency & max num to spawn
class ObjectSpawner {
	constructor(objectSupplier, spawnFreqRange, numPerSpawnRange, maxNum) {
		this.objectSupplier = objectSupplier;
		this.spawnFreqRange = spawnFreqRange;
		this.numPerSpawnRange = numPerSpawnRange; //TODO unused
		this.maxNum = maxNum;
		this.totalSpawned = 0;
		this.maxReached = false;
		this.nextSpawn = this.spawnFreqRange.randInt(); //countdown timer till next spawn
		this.isReady = false; 
		this.objBuffer = new Array();
	}
	
	update() {
		if (!this.maxReached) {
			this.nextSpawn--;
			if (this.nextSpawn <= 0) { // && !this.maxReached
				this.isReady = true;
			}
		}
	}
	
	resetTimer() {
		if (this.totalSpawned < this.maxNum) {
			this.nextSpawn = this.spawnFreqRange.randInt();
			this.isReady = false;
		} else {
			this.maxReached = true;
		}
	}
	
	spawn(args) {
		this.totalSpawned += 1;
		this.objBuffer.push(this.objectSupplier());
		this.isReady = false;
	}
	getIsReady() {
		return this.isReady;
	}
	getBuffer() {
		return this.objBuffer;
	}
}


//keep track of spawning data, add spawned obejcts to a buffer
class Level {
	constructor(mode, targetScore, asteroidSpawner, enemySpawner, bossSpawner) { //TODO unchecked
		//NOTE unchecked
		this.mode = mode;
		this.targetScore = targetScore;
		this.asteroidSpawner = asteroidSpawner;
		this.enemySpawner = enemySpawner;
		this.spawners = new Array();
		this.spawners.push(asteroidSpawner);
		this.spawners.push(enemySpawner);
	}
	
	update() {
		for (let spawner of this.spawners) {
			spawner.update();
			if (spawner.getIsReady()) {
				spawner.spawn();
				spawner.resetTimer();
			}
		}
	}
	
	onEnter() {
		//TODO set/restrict player movement
	}
	
	// onExit() {
	// }
	
	getMode() {
		return this.mode;
	}
	getTargetScore() {
		return this.targetScore;
	}
	
	getAsteroidBuffer() {
		return this.asteroidSpawner.getBuffer();
	}
	getEnemyBuffer() {
		return this.enemySpawner.getBuffer;
	}
}

//driven by score
class GameModeManager extends System {
	constructor(levels, playerSystem, asteroidSystem, enemySystem, bossSystem) {
		super();
		// if (player instanceof Player == false ||
		// 	asteroids instanceof Array == false ||
		// 	enemies instanceof Array == false ||
		// 	bosses instanceof Array == false ||
		// 	levels instanceof Array == false) { //an array of levels to progress through
		// 	throw new TypeError();
		// }
		this.score = 0;
		this.levels = levels;
		this.currentLevel = this.levels[0];
		this.levelCount = 0;
		
		this.asteroidSystem = asteroidSystem;
		this.enemySystem = enemySystem;
		
		//listen for onDestroy events, handle object destroyed, add to score
		let destroyListener = new EventListener(EventFilter.DESTROY, function(event) {
			destroyed = event.getData(); //expect the object that was destroyed
			if (destroyed instanceof Asteroid == false) { throw new TypeError(); }
			else if (destroyed instanceof Enemy == false) { throw new TypeError(); } // && destroyed instanceof Boss == false
			const points = destroyed.getPoints();
			this.addToScore(points);
			this.checkScore();
		});
		
		this.addEventListener(destroyListener);
	}

	update() {
		this.currentLevel.update();
		const asteroids = this.currentLevel.getAsteroidBuffer();
		while (asteroids.length > 0) {
			const a = asteroids.pop();
			this.asteroidSystem.addObject(a);
		}
	}
	
	render() {}
	
	//check score & if game mode should change
	checkScore() {
		if (this.score >= this.currentLevel.getTargetScore()) {
			this.goToNextLevel();
		}
	}
	
	goToNextLevel() {
		this.currentLevel.onExit();
		this.levelCount++;
		this.currentLevel = this.levels[this.levelCount];
		this.currentLevel.onEnter();
	}
	
	addToScore(points) {
		this.score += points;
	}

	spawnAsteroid() {
		//add asteroid to asteroids list
	}

	spawnEnemy() {
		//add enemy to enemies list
	}

	

	setPlayerMovement(isTopDown) { 
		//TODO restrict player movement based on mode
	}
}
