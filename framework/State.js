

//For objects who requre different different behaviours depending on different states,
//a State object can be created for each desired behaviour.
//the State pattern eliminates the need for using switch statements to choose a behaviour.
//A State should reflect the object's behaviours through methods, ex update and render.
class State {
	update() {}
	render() {}
	onEnter() {} //entry logic, ex. start a timer
	onExit() {} //exit logic, ex stop a timer
	canEnter () {return true;}
	canExit () {return true;}
}