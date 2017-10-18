/*
	A State contains blank methods that can be overridden by subclasses
	for desired behaviours.
	A State is used by any class that requires different states and behaviours.
	ex for the GameEngine, there might be an idleState, playingState, pausedState, etc

	The State pattern eliminates the need for using switch statements to choose a behaviour.
	A State should reflect the using object's behaviours and methods.

	// example:
	class GameEngine {
		constructor() {
			this.currentState = new GameState(); //empty initial state
		}

		//the behaviour that depends on the current state
		gameBehaviour() {
			currentState.gameBehaviour();
		}

		//change the current state
		setState(state) {
			this.currentState = state;
		}
	}

	//base empty state class
	class GameState {
		gameBehaviour() {}
	}

	//idle behaviour
	class IdleGameState extends GameState {
		gameBehaviour() {
			//idle behaviour
		}
	}

	//dance behaviour
	class DanceGameState extends GameState {
		gameBehaviour() {
			//dance behaviour
		}
	}

	let engine = new GameEngine();
	engine.gameBehaviour(); //does nothing
	engine.setState(new IdleGameState());
	engine.gameBehaviour(); //idles
	engine.setState(new DanceGameState());
	engine.gameBehaviour(); //dances
*/


class State {
	// setup() {}
	update() {}
	onEnter() {} //entry logic, ex. start a timer, spawn stuff
	onExit() {} //exit logic, ex stop a timer, release resources
	render() {}

	//Return true if this state can be entered.
	//override for specific entry requirements.
	canEnter () {return true;}
	canExit () {return true;}
}
