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
		let player = new Player(WIDTH/2, HEIGHT/2);
		let asteroids = new Array(); //array of asteroids

		//Define Systems here.
		let gameObjectSystem = new GameObjectSystem(); //System that updates and renders GameObjects
		gameObjectSystem.addObject(player);
		gameObjectSystem.addObjects(asteroids);
		let collisionSystem = new CollisionSystem(player, asteroids); //sample collision system

		//Add your System to the main playingState
		this.playingState.addSystem(gameObjectSystem);
		this.playingState.addSystem(collisionSystem);

		//set initial game state and enter
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
