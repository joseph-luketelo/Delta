/*
	Contains main game logic & structure.
	Updates & renders the current GameState
	Use different GameStates for different desired behaviours,
	ex playing, paused, menu, game over, etc.
*/

class GameEngine {
	constructor() {
		this.keyState = new KeyState(); //keeps track of which keys are down
		this.playingState = new PlayingGameState(); //the main GameState
		// this.startMenuState = new GameState(); //TODO
		// this.pausedState = new GameState(); //TODO
		// this.gameOverState = new GameState(); //TODO

		//Define game objects here
		//

		//Define Systems here.
		let playerSystem = new PlayerSystem(new Player(WIDTH/2, HEIGHT/2)); //updates and renders player
		let asteroidSystem = new GameObjectSystem(); //updates and renders asteriods
		let collisionSystem = new CollisionSystem(playerSystem, asteroidSystem); //sample collision system
		
		//spawn testing TODO move to a container class
		let testObjSupplier = function() { return new TestAsteroid(); };
		let spawnFreqRange = new Point(5, 5);
		let numPerSpawnRange = new Point(1, 1);
		let maxNum = 10;
		let testAstSpawner = new ObjectSpawner(testObjSupplier, spawnFreqRange, numPerSpawnRange, maxNum);
		let testEneSpawner = new ObjectSpawner(testObjSupplier, spawnFreqRange, numPerSpawnRange, maxNum);
		let level_01 = new Level(Mode.SCROLLER, 100, testAstSpawner, testEneSpawner, undefined); // mode, targetScore, asteroidSpawner, enemySpawner, bossSpawner
		let level_02 = new Level(Mode.SCROLLER, 200, testAstSpawner, testEneSpawner, undefined);
		let levels = [level_01, level_02];
		let gameModeManager = new GameModeManager(levels, playerSystem, asteroidSystem, undefined, undefined); // levels, playerSystem, asteroidSystem, enemySystem, bossSystem)
		this.playingState.addSystem(gameModeManager);
		
		//Add your System to the main playingState
		this.playingState.addSystem(playerSystem);
		this.playingState.addSystem(asteroidSystem);
		this.playingState.addSystem(collisionSystem);

		//set initial GameState and enter
		this.currentState = this.playingState; //set the current state.
		this.currentState.onEnter();
	}

	update() {
		//update the current GameState. the current state will update its systems.
		this.currentState.update();
	}

	render() {
		//render the current GameState. the current will render its systems.
		this.currentState.render();
	}

	//receive Events, and pass to the current state to queue
	queueEvent(e) {
		if (e instanceof Event == false) { throw new TypeError(); }
		this.currentState.enqueueEvent(e);
	}

	// Switch to a new state, ex from the start menu to the playing state.
	enterState(newState) {
		if (newState instanceof State == false) { throw new TypeError(); }
		this.currentState.onExit();
		this.currentState = newState;
		this.currentState.onEnter();
	}

	// Translates the given KeyboardEvent into an Event, queues it,
	// and updates this game engine's keyState.
	// @param e: a KeyboardEvent from the browser
	// @param isPressed: a boolean representing whether the KeyboardEvent
	// corresponded to a pressed or released event.
	receiveRawKeyEvent(e, isPressed) {
		const keyEvent = RawKeyMap.map(e);
		if (keyEvent != null) {
			this.queueEvent(keyEvent);
			this.keyState.setKey(e.key, isPressed);
		}
	}

	//accessed by objects who want to know about KeyStates, ex Player.
	getKeyState() {
		return this.keyState;
	}
}
