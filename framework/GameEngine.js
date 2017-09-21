//Map raw input events from the browser into Events.
class RawInputMap {
	static map(event) {
		return new Event();
	}
}


//Updates & renders the current game state
class GameEngine {
	constructor() {
		//TODO define other states, such as playing, game over, etc
		this.keyState = new KeyState(); //keeps track of which keys are down
		
		//TODO define game objects, ex player, enemies, platforms, example:
		this.player = new Player(WIDTH/2, HEIGHT/2);
		this.gameObjects = new Array(); //list of all
		this.gameObjects.push(this.player);
		
		//TODO define GameStates
		this.testGameState = new TestGameState(this.gameObjects); //pass all objects
		this.currentState = this.testGameState;
		this.currentState.onEnter();
		
	}
	update() {
		this.currentState.update();
	}
	render() {
		this.currentState.render();
	}
	
	//receive an event from the browser.
	receiveRawKeyEvent(e, isPressed) {
		this.receiveEvent(RawInputMap.map(e));
		this.keyState.setKey(e.key, isPressed);
	}
	
	//receive Events
	receiveEvent(e) {
		// console.log(e);
		if (e instanceof Event) {
			this.currentState.receiveEvent(e);
		} else {
			throw new TypeError(e + " is not an Event.");
		}
		
	}

	//transition from the current state to a new state, ex from the start menu to the playing state.
	enterState(newState) {
		this.currentState.onExit();
		this.currentState = newState;
		this.currentState.onEnter();
	}
	
	getKeyState() {
		return this.keyState;
	}
}


