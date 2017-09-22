/*
	A State contains blank methods that can be overridden by subclasses
	for desired behaviours.
	A State is used by any class that requires different states and behaviours.
	ex for the GameEngine, there might be an idleState, playingState, pausedState, etc
	
	The State pattern eliminates the need for using switch statements to choose a behaviour.
	A State should reflect the using object's behaviours and methods.
	
	// example:
	class User {
		constructor() {
			this.currentState = new UserState(); //initial state
		}
		
		//the behaviour that depends on the current state
		doSomething() {
			currentState.doSomething();
		}
		
		//change the current state
		setState(state) {
			this.currentState = state;
		}
	}
	
	//base state class
	class UserState {
		doSomething() {}
	}
	
	//idle behaviour
	class IdleUserState extends UserState {
		doSomething() {
			//idle behaviour
		}
	}
	
	//dance behaviour
	class DanceUserState extends UserState {
		doSomething() {
			//dance behaviour
		}
	}
	
	let user = new User();
	user.doSomething(); //does nothing
	user.setState(new IdleUserState());
	user.doSomething(); //idles
	user.setState(new DanceUserState());
	user.doSomething(); //dances
*/


class State {
	update() {}
	render() {}
	onEnter() {} //entry logic, ex. start a timer, spawn stuff
	onExit() {} //exit logic, ex stop a timer, release resources
	
	//Return true if this state can be entered.
	//override for specific entry requirements.
	canEnter () {return true;}
	canExit () {return true;}
}
