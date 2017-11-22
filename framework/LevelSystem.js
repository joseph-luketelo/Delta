/*
Classes for managing game mode, ie scroller/asteroids, and spawning stuff.
Modes: scroller, asteroid, boss
	determines player's movement mode
	determine when things spawn based on score/difficulty
	presets, sample progressions

	Level Types:
		Scroller:
			- asteroids & enemies spawn from top of screen
			- level is completed once the player reached a certain score
		Asteroid:
			- asteroids spawn from all sides (like traditional asteroid game)
			- this stage is unlocked after clearing the scroller stage by achieving 10,000 points (this will be done by updating the canvas backgrounds so that it appears to be a different stage)
			- level is completed after surviving x amount of time and/or reaching a certain high-score threshold
		Boss:
			- big single enemy, difficult to kill
			- follows you around/has pattern
			- level is completed once boss is dead
				-
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
	BOSS: {
		type: "BOSS",
	},
	BOSS_A: "BOSS_A",
	BOSS_S: "BOSS_S",
}


/*	Class responsible for spawning objects.
	contains data about how often an object should spawn, how many,
	and if a max number of spawned objects has been reached.
*/
class ObjectSpawner {
	constructor(objectSupplier, spawnFreqRange, numPerSpawnRange, maxNum) {
		if (objectSupplier == undefined) { throw new TypeError(); }
		this.objectSupplier = objectSupplier; //a callback/function that returns a new GameObject
		//objectSupplier responsible for setting variables on obejct like spawn location, speed
		this.spawnFreqRange = spawnFreqRange; //a point specifying the frequency that asteroids should spawn (in frames).
		this.numPerSpawnRange = numPerSpawnRange; // a number specifying the number of objects to spawn each spawn interval.
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
	constructor(mode, levelNum, targetScore, asteroidSpawner, enemySpawner, bossSpawner) {
		//NOTE unchecked constructor
		this.mode = mode; //the mode, one of: Mode.SCROLLER, Mode.ASTEROID, Mode.BOSS_A, Mode.BOSS_S
		this.levelNum = levelNum; //the current level number. will be printed to the screen.
		this.targetScore = targetScore; //the score that must be reached in order to proceed to next level. set to -1 if unused.
		this.asteroidSpawner = asteroidSpawner;
		this.enemySpawner = enemySpawner;
		this.spawners = new Array(); //array of ObjectSpawners
		this.bossSpawner = bossSpawner;
		if (asteroidSpawner instanceof ObjectSpawner) {
			this.spawners.push(asteroidSpawner);
		}
		if (enemySpawner instanceof ObjectSpawner) {
			this.spawners.push(enemySpawner);
		}
		if (bossSpawner instanceof ObjectSpawner) {
			this.spawners.push(bossSpawner);
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
	getBossBuffer() {
		return this.bossSpawner == undefined ? undefined : this.bossSpawner.getBuffer();
	}
}

// Class that updates and manages Levels. Each level contains data for spawning asteroids & enemies
class LevelSystem extends System {
	constructor(levelPresetsSupplier, playerSystem, asteroidSystem, enemySystem, bossSystem, bgSystem) {
		super();
		this.systems = new Array();
		this.asteroidSystem = asteroidSystem;
		this.enemySystem = enemySystem;
		this.playerSystem = playerSystem;
		this.player = playerSystem.getPlayer();
		this.bgSystem = bgSystem;
		
		this.bossSystem = bossSystem;

		this.score = 0;
		this.levels = levelPresetsSupplier();
		this.currentLevel = this.levels[0];
		this.levelCount = 0; //levels[] index
		this.levelCondition = undefined;
		this.setLevelCondition(this.currentLevel.getMode());

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

	//set player movement and level's win condition base on the mode
	setLevelCondition(mode) {
		if (mode.type == "ASTEROID") {
			this.levelCondition = this.isScoreReached;
			this.player.selectAsteroidMode(); //set player move mode
		} else if (mode.type == "SCROLLER") {
			this.levelCondition = this.isScoreReached;
			this.player.selectScrollerMode(); //set player move mode
		} else if (mode.type == "BOSS") {
			//TODO
			this.levelCondition = this.isScoreReached;
			this.player.selectScrollerMode(); //set player move mode
		}
		else { throw new TypeError("invalid mode: " + mode); }
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
		if (this.bossSystem != undefined) {
			const bosses = this.currentLevel.getBossBuffer();
			if (bosses != undefined) {
				while (bosses.length > 0) {
					const b = bosses.pop();
					this.bossSystem.addObject(b);
				}
			}
		}
		if (this.currentLevel.getMode() == Mode.SCROLLER) {
			this.bgSystem.scroll();
		}
	}

	render() {
		this.currentLevel.render(); //render level elements
		fillText("" + this.score, WIDTH -20, 20, Fonts.DEFAULT);
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
			this.setLevelCondition(this.currentLevel.getMode());

		} else { //if next level is undefined, then all levels have been cleared.
			if (this.levelsCleared == false) { //check flag, ensure only called once
				// this.levelsCleared = true;
				// const event = new Event(EventFilter.GAME, EventEnum.GAME_WON, undefined);
				// this.publishEvent(event);
				console.log("All levels cleared.");
				this.levelsCleared = true;
			}
		}
	}

	addToScore(points) {
		if (!this.levelsCleared) {
			this.score += points;
		}
	}

	getMode() {
		return this.currentLevel.getMode();
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
			this.destroy(); //NOTE testing - call deactivate() instead.
			// this.deactivate();
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
