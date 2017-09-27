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

		//Define game objects here, ex player, enemies, platforms, example:
		this.player = new Player(WIDTH/2, HEIGHT/2);
		this.asteroids = new Array(); //array of asteroids
		// this.gameObjects = new Array();

		//Define your System here. pass objects defined above to your system's constructor.
		//let yourSystem = new SomeKindOfSystem(relevantObjects); //example
		let playerSystem = new PlayerSystem(this.player);
		let collisionSystem = new CollisionSystem(this.player, this.asteroids);

		//Add your system to the main playingState
		// this.playingState.addSystem(yourSystem); //example
		this.playingState.addSystem(playerSystem);

		//Register event listeners from GameObjects and Systems with approrpiate GameState
		//ex typically playingState, but GameObjects relating to the pause menu would register to the pausedState.
		this.playingState.registerEventListeners(this.player.getEventListeners());

		//set initial game state and enter
		this.currentState = this.playingState; //set the current state.
		this.currentState.onEnter();
	}

	update() {
		this.currentState.update();
	}

	render() {
		this.currentState.render();
	}

	//receive Events, and pass to the current state to handle.
	receiveEvent(e) {
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
			this.receiveEvent(keyEvent);
			this.keyState.setKey(e.key, isPressed);
		}
	}

	//accessed by objects who want to know about KeyStates, ex Player.
	getKeyState() {
		return this.keyState;
	}
}
