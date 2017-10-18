/*
Classes for managing game mode, ie scroller/asteroids, and spawning stuff.
Modes: scroller, asteroid, boss
	determines player's movement mode
	determine when things spawn based on score/difficulty
	presets, sample progressions
	
	from the game doc:
		Sample progression: scroller lvl (easy) > asteroid lvl (easy) 
			> boss lvl (easy) > scroller lvl (med) > asteroid lvl (med) 
			> boss lvl (med) > etc. //original
		Sample progression: scroller lvl (easy) > scroller lvl (med) 
			> boss lvl (invaders mode) > asteroid lvl (easy) > asteroid lvl (med) 
			> boss lvl (asteroid mode) > etc 
			//may want to switch to this for smoother and simpler transition
*/

let Mode = {
	ASTEROID: "ASTEROID",
	SCROLLER: "SCROLLER",
	BOSS_A: "BOSS_A",
	BOSS_S: "BOSS_S"
}


/*	A Container object for predefined levels
*/
let LevelPresets = {
	/*	naming: lvl_#type
		#: level number
		type s: scroller
		type a: asteroid
		type ba: boss & asteroid
		type bs: boss & scroller
	*/
	
	/* TEMPLATE LEVEL
	lvl_00_template: function() { //Level supplier
		const mode = Mode.SCROLLER;
		const levelNum = 0;
		const a_supplier = function() { return new TestAsteroid(); };
		const a_spawnFreqRange = new Point(1, 1); //frequency range to spawn asteroids (frames)
		const a_numPerSpawnRange = new Point(1, 1); //number of asteroids to spawn at each spawn interval
		const a_maxNum = 5; //max number of asteroids to spawn for this level
		const asteroidSpawner = new ObjectSpawner(a_supplier, a_spawnFreqRange, a_numPerSpawnRange, a_maxNum);
		
		const e_supplier = function() { return new TestAsteroid(); };
		const e_spawnFreqRange = new Point(1, 1); //frequency range to spawn enemies (frames)
		const e_numPerSpawnRange = new Point(1, 1); //number of enemies to spawn at each spawn interval
		const e_maxNum = 5; //max number of enemies to spawn for this level
		const enemySpawner = new ObjectSpawner(e_supplier, e_spawnFreqRange, e_numPerSpawnRange, e_maxNum);
		
		const targetScore = -1;
		return new Level(mode, levelNum, targetScore, asteroidSpawner, enemySpawner, undefined);
	*/
	
	//Return a new Level
	level_01s: function() { //Level supplier
		const mode = Mode.SCROLLER;
		const levelNum = 1;
		const a_supplier = function() { return new TestAsteroid(); };
		const a_spawnFreqRange = new Point(1, 1); //frequency range to spawn asteroids (frames)
		const a_numPerSpawnRange = new Point(1, 1); //number of asteroids to spawn at each spawn interval
		const a_maxNum = 5; //max number of asteroids to spawn for this level
		const asteroidSpawner = new ObjectSpawner(a_supplier, a_spawnFreqRange, a_numPerSpawnRange, a_maxNum);
		
		const e_supplier = function() { return new TestEnemy(); };
		const e_spawnFreqRange = new Point(1, 1); //frequency range to spawn enemies (frames)
		const e_numPerSpawnRange = new Point(1, 1); //number of enemies to spawn at each spawn interval
		const e_maxNum = 5; //max number of enemies to spawn for this level
		const enemySpawner = new ObjectSpawner(e_supplier, e_spawnFreqRange, e_numPerSpawnRange, e_maxNum);
		
		const targetScore = 100;
		return new Level(mode, levelNum, targetScore, asteroidSpawner, enemySpawner, undefined);
	},
	
	level_02s: function() { //Level supplier
		const mode = Mode.SCROLLER;
		const levelNum = 2;
		const a_supplier = function() { return new TestAsteroid(); };
		const a_spawnFreqRange = new Point(1, 1); //frequency range to spawn asteroids (frames)
		const a_numPerSpawnRange = new Point(1, 1); //number of asteroids to spawn at each spawn interval
		const a_maxNum = 10; //max number of asteroids to spawn for this level
		// const a_maxNum = -1; //max number of asteroids to spawn for this level
		const asteroidSpawner = new ObjectSpawner(a_supplier, a_spawnFreqRange, a_numPerSpawnRange, a_maxNum);
		
		const e_supplier = function() { return new TestEnemy(); };
		const e_spawnFreqRange = new Point(1, 1); //frequency range to spawn enemies (frames)
		const e_numPerSpawnRange = new Point(1, 1); //number of enemies to spawn at each spawn interval
		const e_maxNum = 10; //max number of enemies to spawn for this level
		const enemySpawner = new ObjectSpawner(e_supplier, e_spawnFreqRange, e_numPerSpawnRange, e_maxNum);
		
		const targetScore = 200;
		return new Level(mode, levelNum, targetScore, asteroidSpawner, enemySpawner, undefined);
	},
	
	
	// Return a new array of all level presets
	getPresets: function() {
		const CLASS = LevelPresets;
		return [CLASS.level_01s(), CLASS.level_02s()];
	}
}

//Placeholder asteroid class, black rotating squares.
class TestAsteroid extends GameObject {
	constructor(points = 10) {
		super(points);
		this.vel = Point.randPoint();
		this.rotSpd = Math.random() * (Math.PI/30);
		this.vel.mult(2);
		this.life = 100;
	}
	
	update() {
		this.life--;
		if (this.life <= 0) {
			this.destroy();
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
	
	getLife() {
		return this.life;
	}
}

//Placeholder enemy class, blue squares.
class TestEnemy extends TestAsteroid {
	constructor(points = 10) {
		super(points);
		this.rotSpd = 0;
	}
	render() {
		CTX.fillStyle = Colors.BLUE;
		CTX.fillRect(this.transform.getX(), this.transform.getY(), 10, 10);
	}
}


/*	Class responsible for spawning objects.
	contains data about how often an object should spawn, how many,
	and if a max number of spawned objects has been reached.
	
*/
class ObjectSpawner {
	constructor(objectSupplier, spawnFreqRange, numPerSpawnRange, maxNum) {
		this.objectSupplier = objectSupplier; //a callback/function that returns a new GameObject
		this.spawnFreqRange = spawnFreqRange; //a point specifying the frequency that asteroids should spawn (in frames).
		this.numPerSpawnRange = numPerSpawnRange; //TODO unused. a number specifying the number of objects to spawn each spawn interval.
		this.maxNum = maxNum; //maximum number of objects that can be spawned. set to -1 for unlimited.
		this.totalSpawned = 0; //total number spawned so far
		this.maxReached = false; //flag, true if totalSpawned reaches maxNum
		this.nextSpawn = this.spawnFreqRange.randInt(); //countdown timer till next spawn
		this.isReady = false; //flag, true if countdown timer has reached 0 and an object has been spawned.
		this.objBuffer = new Array(); //array for holding spawned objects. used by LevelManager
	}
	
	// setup() {
	// 	this.totalSpawned = 0;
	// 	this.maxReached = false;
	// 	this.nextSpawn = this.spawnFreqRange.randInt();
	// 	this.isReady = false;
	// 	while(this.objBuffer.length > 0) {
	// 		this.objBuffer.pop();
	// 	}
	// }
	
	update() {
		if (!this.maxReached) {
			this.nextSpawn--;
			if (this.nextSpawn <= 0) { // && !this.maxReached
				this.isReady = true;
			}
		}
	}
	
	//restart timer for next spawn
	resetTimer() {
		if (this.maxNum == -1 || this.totalSpawned < this.maxNum) {
			this.nextSpawn = this.spawnFreqRange.randInt();
			this.isReady = false;
		} else {
			this.maxReached = true;
			this.isReady = false;
		}
	}
	
	//TODO
	spawn(args) {
		this.totalSpawned += 1;
		this.objBuffer.push(this.objectSupplier(/* use args */));
		this.isReady = false;
	}
	
	getIsReady() {
		return this.isReady;
	}
	
	getBuffer() {
		return this.objBuffer;
	}
}

//Contains data about the current level.
//keep track of spawning data, add spawned obejcts to a buffer
class Level {
	constructor(mode, levelNum, targetScore, asteroidSpawner, enemySpawner, bossSpawner) { //TODO unchecked
		//NOTE unchecked constructor
		this.mode = mode; //the mode, one of: Mode.SCROLLER, Mode.ASTEROID, Mode.BOSS_A, Mode.BOSS_S
		this.levelNum = levelNum; //the current level number. will be printed to the screen.
		this.targetScore = targetScore; //the score that must be reached in order to proceed to next level. set to -1 if unused.
		this.asteroidSpawner = asteroidSpawner;
		this.enemySpawner = enemySpawner;
		this.spawners = new Array(); //array of ObjectSpawners
		if (asteroidSpawner instanceof ObjectSpawner) {
			this.spawners.push(asteroidSpawner);
		}
		if (enemySpawner instanceof ObjectSpawner) {
			this.spawners.push(enemySpawner);
		}
		if (this.spawners.length == 0) {
			console.warn("Warning: no ObjectSpawners were initialized.");
		}
	}
	
	// setup() {
	// 	for (let spawner of this.spawners) {
	// 		spawner.setup();
	// 	}
	// }
	
	update() {
		for (let spawner of this.spawners) {
			spawner.update();
			if (spawner.getIsReady()) {
				spawner.spawn(/*TODO args*/);
				spawner.resetTimer();
			}
		}
	}
	
	//display level stuff
	render() {
		CTX.fillStyle = Colors.BLACK;
		//TODO font style
		CTX.fillText("level: " + this.levelNum, WIDTH/2, 10);
	}
	
	//TODO set/restrict player movement. do in GameModeManager instead?
	onEnter() {}
	onExit() {}
	
	getMode() { return this.mode; }
	getLevelNum() { return this.levelNum; }
	getTargetScore() { return this.targetScore; }
	
	getAsteroidBuffer() {
		return this.asteroidSpawner.getBuffer();
	}
	getEnemyBuffer() {
		return this.enemySpawner == undefined ? undefined : this.enemySpawner.getBuffer();
	}
}

// Class that updates and manages Levels. Each level contains data for spawning asteroids & enemies
class LevelSystem extends System {
	constructor(levelPresetsSupplier, playerSystem, asteroidSystem, enemySystem, bossSystem) {
		super();
		this.score = 0;
		this.levelPresetsSupplier = levelPresetsSupplier; //gets a new array of predefined levels
		this.levels = this.levelPresetsSupplier();
		this.currentLevel = this.levels[0];
		this.levelCount = 0;
		
		this.systems = new Array();
		this.asteroidSystem = asteroidSystem;
		this.enemySystem = enemySystem;

		//listen for Destroy events, add points to score
		let instance = this;
		let destroyListener = new EventListener(EventFilter.DESTROY, function(event) {
			let points = event.getData();
			instance.addToScore(points);
			instance.checkNextLevelCondition();
		});
		
		this.levelsCleared = false; //flag for preventing multiple gameWon events
		this.addEventListener(destroyListener);
	}
	
	// setup() {
	// 	this.score = 0;
	// 	this.levelCount = 0;
	// 	this.currentLevel = this.levels[0];
	// 	// this.levels = this.levelPresetsSupplier();
	// 	for (let l of this.levels) {
	// 		l.setup();
	// 	}
	// }
	
	onEnter() {}
	onExit() {}

	update() {
		this.currentLevel.update();
		const asteroids = this.currentLevel.getAsteroidBuffer();
		if (asteroids != undefined) {
			while (asteroids.length > 0) {
				const a = asteroids.pop();
				this.asteroidSystem.addObject(a);
			}
		}
		const enemies = this.currentLevel.getEnemyBuffer();
		if (enemies != undefined) {
			while (enemies.length > 0) {
				const e = enemies.pop();
				this.enemySystem.addObject(e);
			}
		}
	}
	
	render() {
		this.currentLevel.render(); //render level elements
	}
	
	// Check if game should proceed to next level
	checkNextLevelCondition() {
		// TODO decide when to use isScoreReached() and when to use isLevelCleared()
		if (this.isScoreReached()) {
			this.goToNextLevel();
			
		}
		// this.isLevelCleared();
	}
	
	// Return true if player's score has reached the level's target score.
	isScoreReached() {
		return this.score >= this.currentLevel.getTargetScore();
	}
	
	// Return true if there are no active asteroids or enemies left.
	isLevelCleared() {
		return (this.asteroidSystem.getLength() == 0 && this.enemySystem.getLength() == 0);
	}
	
	// Proceed to the next level, or publish a game won Event if all levels have been cleared.
	goToNextLevel() {
		this.currentLevel.onExit();
		this.levelCount++;
		if (this.levels[this.levelCount] != undefined) {
			this.currentLevel = this.levels[this.levelCount];
			this.currentLevel.onEnter();
		} else { //if next level is undefined, then all levels have been cleared.
			if (this.levelsCleared == false) {
				this.levelsCleared = true;
				const event = new Event(EventFilter.GAME, EventEnum.GAME_WON, undefined);
				this.publishEvent(event);
			}
		}
	}
	
	addToScore(points) {
		this.score += points;
	}

	//set player movement mode
	setPlayerMovement(isTopDown) { 
		//TODO restrict player movement based on mode
	}
	
	
}
