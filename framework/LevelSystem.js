/*
Classes for managing game mode, ie scroller/asteroids, and spawning stuff.
Modes: scroller, asteroid, boss
	determines player's movement mode
	determine when things spawn based on score/difficulty
	presets, sample progressions

	Level Types:
		Scroller:
			- enemies spawn from top of screen only (level scrolls upwards putting them into view)
			- level is completed once the player reached a certain score
		Asteroid:
			- enemies spawn from all sides (like traditional asteroid game)
			- this stage is unlocked after clearing the scroller stage by achieving 10,000 points (this will be done by updating the canvas backgrounds so that it appears to be a different stage)
			- level is completed after surviving x amount of time and/or reaching a certain high-score threshold
		Boss:
			- big single enemy, difficult to kill
			- follows you around/has pattern
			- level is completed once boss is dead

	Level progression:
		> scroller lvl (easy)
			-fewer asteroids, slow
		> asteroid lvl (easy)
			-fewer asteroids, slow
		> boss lvl (easy)
			-
		> scroller lvl (med)
			-more asteroids, asteroids faster
		> asteroid lvl (med)
			-more asteroids, asteroids faster
		> boss lvl (med)
				-
	TODO
		restrict player movement between modes
		UI, bg, or transition to indicate mode change
*/

const Mode = {
	ASTEROID: {
		type: "ASTEROID",
	},
	SCROLLER: {
		type: "SCROLLER",
		ast_start_x_range: new Point(0, WIDTH),
		ast_start_y_range: new Point(-50, -50),
	},
	BOSS_A: "BOSS_A",
	BOSS_S: "BOSS_S"
}

/*	A Container object for predefined levels
*/
const LevelPresets = {
	/*	naming: lvl_#type
		#: level number
		type s: scroller
		type a: asteroid
		type ba: boss & asteroid
		type bs: boss & scroller
	*/
	asteroid_spawnAreas: [
		new Rectangle(-80, -80, WIDTH + 40, 50), //north
		new Rectangle(-80, HEIGHT + 40, WIDTH + 40, 50), //south
		new Rectangle(-80, -80, 50, HEIGHT + 40), //east
		new Rectangle(WIDTH + 40, -80, 50, HEIGHT + 40), //east
	],

	level_01: function() {
		// level
		const mode = Mode.SCROLLER;
		const levelNum = 1;
		//asteroid
		const a_supplier = function() {
			let ast = new TestAsteroid();
			let x = mode.ast_start_x_range.rand();
			let y = mode.ast_start_y_range.rand();
			ast.setLocation(x, y);
			let dx = randFloat(-0.5, 0.5);
			let dy = randFloat(2, 5);
			ast.setVelocity(dx, dy);
			return ast;
		};
		const a_spawnFreqRange = new Point(10, 50); //frequency range to spawn asteroids (frames)
		const a_numPerSpawnRange = new Point(1, 1); //number of asteroids to spawn at each spawn interval
		const a_maxNum = -1; //max number of asteroids to spawn for this level
		// const a_maxNum = 5; //max number of asteroids to spawn for this level
		const asteroidSpawner = new ObjectSpawner(a_supplier, a_spawnFreqRange, a_numPerSpawnRange, a_maxNum);

		//enemy
		const e_supplier = function() { return new TestEnemy(); };
		const e_spawnFreqRange = new Point(1, 1); //frequency range to spawn enemies (frames)
		const e_numPerSpawnRange = new Point(1, 1); //number of enemies to spawn at each spawn interval
		const e_maxNum = 0; //max number of enemies to spawn for this level
		const enemySpawner = new ObjectSpawner(e_supplier, e_spawnFreqRange, e_numPerSpawnRange, e_maxNum);

		const targetScore = 50;
		return new Level(mode, levelNum, targetScore, asteroidSpawner, enemySpawner, undefined);
	},

	level_02: function() {
		const mode = Mode.SCROLLER;
		const levelNum = 2;
		const a_supplier = function() {
			let ast = new TestAsteroid();
			let x = mode.ast_start_x_range.rand();
			let y = mode.ast_start_y_range.rand();
			ast.setLocation(x, y);
			let dx = randFloat(-1, 1);
			let dy = randFloat(2, 5);
			ast.setVelocity(dx, dy);
			return ast;
		};
		const a_spawnFreqRange = new Point(1, 1); //frequency range to spawn asteroids (frames)
		const a_numPerSpawnRange = new Point(1, 1); //number of asteroids to spawn at each spawn interval
		const a_maxNum = 10; //max number of asteroids to spawn for this level
		// const a_maxNum = -1; //max number of asteroids to spawn for this level
		const asteroidSpawner = new ObjectSpawner(a_supplier, a_spawnFreqRange, a_numPerSpawnRange, a_maxNum);

		const e_supplier = function() { return new TestEnemy(); };
		const e_spawnFreqRange = new Point(1, 1); //frequency range to spawn enemies (frames)
		const e_numPerSpawnRange = new Point(1, 1); //number of enemies to spawn at each spawn interval
		const e_maxNum = 0; //max number of enemies to spawn for this level
		const enemySpawner = new ObjectSpawner(e_supplier, e_spawnFreqRange, e_numPerSpawnRange, e_maxNum);

		const targetScore = 50;
		return new Level(mode, levelNum, targetScore, asteroidSpawner, enemySpawner, undefined);
	},

	level_a00: function() {
		const mode = Mode.ASTEROID;
		const levelNum = undefined;
		const a_supplier = function() {
			let ast = new TestAsteroid();

			let rect = LevelPresets.asteroid_spawnAreas[randInt(0, 4)];
			let x = randFloat(rect.getX(), rect.getX() + rect.getWidth());
			let y = randFloat(rect.getY(), rect.getY() + rect.getHeight());
			let loc = new Point(x, y);

			const halfWidth = WIDTH/2;
			const halfHeight = HEIGHT/2;
			let target = new Point(
				halfWidth + randFloat(-halfWidth, halfWidth),
				halfHeight + randFloat(-halfHeight, halfHeight));
			let vel = new Point(x, y);
			vel.subPoint(target);
			vel.normalize();
			let spd = randFloat(1, 3);
			vel.mult(-spd);

			ast.setLocation(loc.getX(), loc.getY());
			ast.setVelocityP(vel);
			return ast;
		}

		const a_spawnFreqRange = new Point(80, 80); //frequency range to spawn asteroids (frames)
		const a_numPerSpawnRange = new Point(1, 1); //number of asteroids to spawn at each spawn interval
		const a_maxNum = -1; //max number of asteroids to spawn for this level
		// const a_maxNum = -1; //max number of asteroids to spawn for this level
		const asteroidSpawner = new ObjectSpawner(a_supplier, a_spawnFreqRange, a_numPerSpawnRange, a_maxNum);

		// const e_supplier = function() { return new TestEnemy(); };
		// const e_spawnFreqRange = new Point(10, 20); //frequency range to spawn enemies (frames)
		// const e_numPerSpawnRange = new Point(1, 1); //number of enemies to spawn at each spawn interval
		// const e_maxNum = 0; //max number of enemies to spawn for this level
		// const enemySpawner = new ObjectSpawner(e_supplier, e_spawnFreqRange, e_numPerSpawnRange, e_maxNum);

		const targetScore = 50;
		return new Level(mode, levelNum, targetScore, asteroidSpawner, undefined, undefined);
	},


	// Return a new array of all level presets
	getPresets: function() {
		const CLASS = LevelPresets;
		// return [CLASS.level_01(), CLASS.level_02()]; //a
		// return [CLASS.level_a00(), CLASS.level_02()]; //b
		return [CLASS.level_01(), CLASS.level_a00()]; //c

		//return [scr1, ast1, boss1, scr2, ast2, boss2]; //future level order
	}
}



/*	Class responsible for spawning objects.
	contains data about how often an object should spawn, how many,
	and if a max number of spawned objects has been reached.
*/
class ObjectSpawner {
	constructor(objectSupplier, spawnFreqRange, numPerSpawnRange, maxNum) {
		this.objectSupplier = objectSupplier; //a callback/function that returns a new GameObject
		//objectSupplier responsible for setting variables on obejct like spawn location, speed
		this.spawnFreqRange = spawnFreqRange; //a point specifying the frequency that asteroids should spawn (in frames).
		this.numPerSpawnRange = numPerSpawnRange; //TODO unused. a number specifying the number of objects to spawn each spawn interval.
		this.maxNum = maxNum; //maximum number of objects that can be spawned. set to -1 for unlimited.
		this.totalSpawned = 0; //total number spawned so far
		this.maxReached = false; //flag, true if totalSpawned reaches maxNum
		this.nextSpawn = this.spawnFreqRange.randInt(); //countdown timer till next spawn
		this.isReady = false; //flag, true if countdown timer has reached 0 and an object has been spawned.
		this.objBuffer = new Array(); //array for holding spawned objects. used by LevelManager
	}

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

	spawn(args) {
		this.totalSpawned += 1;
		this.objBuffer.push(this.objectSupplier(/* use args */));
		this.isReady = false;
	}

	getIsReady() { return this.isReady; }
	getBuffer() { return this.objBuffer; }
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

	update() {
		for (let spawner of this.spawners) {
			spawner.update();
			if (spawner.getIsReady()) {
				spawner.spawn(/*args*/);
				spawner.resetTimer();
			}
		}
	}

	render() {
		CTX.fillStyle = Colors.WHITE;
		CTX.font = Fonts.DEFAULT.str;
		fillText("level: " + this.levelNum, WIDTH/2, 20, Fonts.DEFAULT);
		fillText("mode: " + this.mode.type, WIDTH/2, HEIGHT -10, Fonts.DEFAULT);
	}

	onEnter() {}
	onExit() {}
	getMode() { return this.mode; }
	getLevelNum() { return this.levelNum; }
	getTargetScore() { return this.targetScore; }
	getAsteroidBuffer() { return this.asteroidSpawner.getBuffer(); }
	getEnemyBuffer() {
		return this.enemySpawner == undefined ? undefined : this.enemySpawner.getBuffer();
	}
}

// Class that updates and manages Levels. Each level contains data for spawning asteroids & enemies
class LevelSystem extends System {
	constructor(levelPresetsSupplier, playerSystem, asteroidSystem, enemySystem, bossSystem) {
		super();
		this.systems = new Array();
		this.asteroidSystem = asteroidSystem;
		this.enemySystem = enemySystem;
		this.playerSystem = playerSystem;
		this.player = playerSystem.getPlayer();

		this.score = 0;
		this.levelPresetsSupplier = levelPresetsSupplier; //gets a new array of predefined levels
		this.levels = this.levelPresetsSupplier();
		this.currentLevel = this.levels[0];
		this.levelCount = 0; //levels[] index
		this.mode = this.currentLevel.getMode();
		this.levelCondition = undefined;
		this.setLevelCondition(this.mode);

		//listen for Destroy events, add points to score
		const instance = this;
		let destroyListener = new EventListener(EventFilter.DESTROY, function(event) {
			let points = event.getData();
			instance.addToScore(points);
			instance.checkNextLevelCondition();
		});

		this.levelsCleared = false; //flag for preventing multiple gameWon events
		this.addEventListener(destroyListener);
	}

	//set level's win condition base on the mode, as well as player movement
	setLevelCondition(mode) {
		if (mode.type == "ASTEROID") {
			this.levelCondition = this.isScoreReached;
			this.player.selectAsteroidMode(); //set player move mode
		} else if (mode.type == "SCROLLER") {
			this.levelCondition = this.isScoreReached;
			this.player.selectScrollerMode(); //set player move mode
		} else { throw new TypeError(); }
	}

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
		if (this.levelCondition()) {
			this.goToNextLevel();
		}
	}

	// Return true if player's score has reached the level's target score.
	isScoreReached() { return this.score >= this.currentLevel.getTargetScore(); }

	// Return true if there are no active asteroids or enemies left.
	isLevelCleared() { return (this.asteroidSystem.getLength() == 0 && this.enemySystem.getLength() == 0); }

	// Proceed to the next level, or publish a game won Event if all levels have been cleared.
	goToNextLevel() {
		this.currentLevel.onExit();
		this.levelCount++;
		if (this.levels[this.levelCount] != undefined) {
			this.currentLevel = this.levels[this.levelCount];
			this.currentLevel.onEnter();
			this.setLevelCondition(this.currentLevel.getMode()); //TODO test

		} else { //if next level is undefined, then all levels have been cleared.
			if (this.levelsCleared == false) { //check flag, ensure only called once
				//TODO uncomment when ready to handle game won
				// this.levelsCleared = true;
				// const event = new Event(EventFilter.GAME, EventEnum.GAME_WON, undefined);
				// this.publishEvent(event);
			}
		}
	}

	addToScore(points) {
		this.score += points;
	}
}

const Images = {
	asteroid: {
		image: new Image(),
		width: 51,
		height: 49,
		wOffset: 51/2,
		hOffset: 49/2,
	},
	alien: {
		image: new Image(),
		width: 51,
		height: 51,
		wOffset: 51/2,
		hOffset: 51/2,
	}
}
Images.asteroid.image.src = "assets/asteroid.png";
Images.alien.image.src = "assets/alien.png";

//Placeholder asteroid class, black rotating squares.
class TestAsteroid extends GameObject {
	constructor(points = 10) {
		super(points);
		this.rotSpd = Math.random() * (Math.PI/30);
		this.image = Images.asteroid;
	}

	update() {
		this.transform.getLocation().addPoint(this.velocity);
		this.transform.setRotation(this.transform.getRotation() + this.rotSpd);
		if (this.isOffscreen()) {
			// this.destroy(); //NOTE testing - call deactivate() instead.
			this.deactivate();
		}
	}

	render() {
		CTX.save();
		CTX.translate(this.transform.getX(), this.transform.getY());
		CTX.rotate(this.transform.getRotation());
		CTX.drawImage(this.image.image, -this.image.wOffset, -this.image.hOffset);
		CTX.restore();
	}
}

//Placeholder enemy class, blue squares.
class TestEnemy extends TestAsteroid {
	constructor(points = 10) {
		super(points);
		this.rotSpd = 0;
		this.image = Images.alien;
	}
	render() {
		CTX.drawImage(this.image.image, -this.image.wOffset, -this.image.hOffset);
	}
}
