/*
	Contains main game logic & structure.
	Updates & renders the current GameState
	Use different GameStates for different desired behaviours,
	ex playing, paused, menu, game over, etc.
*/

class GameEngine {
	constructor() {
		this.keyState = new KeyState(); //keeps track of which keys are down
		
		//TODO define game objects here, ex player, enemies, platforms, example:
		this.player = new Player(WIDTH/2, HEIGHT/2);
		this.gameObjects = new Array(); //list of all
		this.gameObjects.push(this.player);
		
		//TODO define other states, such as playing, game over, etc
		//pass GameObjects to the states that should know about them. 
		// ex a PlayingState should know about the Player, a PauseState shouldn't.
		this.testGameState = new TestGameState(this.gameObjects); //pass all objects to this state.
		
		this.currentState = this.testGameState; //set the current state.
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
	
	//receive a KeyboardEvent from the browser, 
	//translate the KeyboardEvent into an Event, and queue it,
	//and update the KeyState.
	receiveRawKeyEvent(e, isPressed) {
		this.receiveEvent(RawKeyMap.map(e));
		this.keyState.setKey(e.key, isPressed);
	}
	
	//accessed by objects who want to know about KeyStates, ex Player.
	getKeyState() {
		return this.keyState;
	}
}


