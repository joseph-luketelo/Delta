/*
	Contains main game logic & structure.
	Updates & renders the current GameState
	Use different GameStates for different desired behaviours,
	ex playing, paused, menu, game over, etc.
*/


let GameStatePresets = {
	getNewPlayingState: function() {
		let playingState = new PlayingGameState();
		
		//Define Systems here.
		let playerSystem = new PlayerSystem(new Player(WIDTH/2, HEIGHT/2)); //updates and renders player
		let asteroidSystem = new GameObjectSystem(); //updates and renders asteriods
		let enemySystem = new GameObjectSystem(); //updates and renders enemies
		let collisionSystem = new CollisionSystem(playerSystem, asteroidSystem); //sample collision system
		let bossSystem = undefined;
		
		//Spawning & levelling TODO use preset levels array on the LevelSet
		let levelSetSupplier = LevelPresets.getPresets;
		let levelManager = new LevelManager(levelSetSupplier, playerSystem, asteroidSystem, enemySystem, bossSystem); // levels, playerSystem, asteroidSystem, enemySystem, bossSystem)
		
		playingState.addSystem(levelManager);
		
		//Add your System to the main playingState
		playingState.addSystem(playerSystem);
		playingState.addSystem(asteroidSystem);
		playingState.addSystem(enemySystem);
		playingState.addSystem(collisionSystem);
		
		return playingState;
	}
}


class GameEngine {
	constructor() {
		this.keyState = new KeyState(); //keeps track of which keys are down
		
		// NOTE: -moved PlayingState initialization stuff in GameEngine's 
		// constructor to GameStatePresets object
	
		this.playingState = GameStatePresets.getNewPlayingState();
		//set initial GameState and enter
		
		this.currentState = this.playingState; //the GameEngine's current State
		this.currentState.onEnter();
	}

	// Future: implement pausing
	// pauseGame() {
	// 	this.enterState(this.pausedState);
	// } 
	// unPause() {
	// 	this.enterState(this.playingState);
	// }
	//start playing a new game from the start menu
	
	//setup a new game by assigning new instances
	setupNewGame() {
		this.keyState.clearKeys();
		this.playingState = GameStatePresets.getNewPlayingState();
		this.currentState = this.playingState; //the GameEngine's current State
		this.currentState.onEnter();
	}
	
	// setup by calling setup() or reset() on all necessary objects. higehr cohesion
	// setupNewGame() {
	// 	//TODO call or setup() methods on necessary classes
	// 	for (let state of this.gameStates) {
	// 		state.setup();
	// 	}
	// }
	
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
	
	tryEnterState(newState) {
		if (newState instanceof State == false) { throw new TypeError(); }
		if (this.currentState.canExit() && newState.canEnter()) {
			this.enterState(newState);
		}
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
