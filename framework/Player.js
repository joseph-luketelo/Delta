/*
	A simple Player that can move on the screen.
	See GameObject.js for more details
	(use a and d keys)

*/

class Player extends GameObject {
	constructor(x = 0, y = 0) {
		super();
		this.location = new Point(x, y);
		this.speed = 2;
		
		// add event listeners if needed. example:
		// this.gameEventHandler = new EventListener(EventFilter.GAME_EVENT, function(e) {
		//	handle game event
		// });
		// this.eventListeners.push(this.keyEventHandler);
		
		// Add player states if needed. ex walking, running, attacking, shooting
		// this.currentState = new State();
		
	}
	update() {
		//TODO possible optimization, set up reference to ENGINE's KeyState in constructor.
		if (ENGINE.getKeyState().getKey('a')) {
			this.move(-this.speed, 0);
		}
		if (ENGINE.getKeyState().getKey('d')) {
			this.move(this.speed, 0);
		}
		
	}
	move(x, y) {
		this.location.add(x, y);
	}
	render() {
		CTX.fillStyle = Colors.BLUE;
		CTX.fillRect(this.location.getX(), this.location.getY(), 10, 10);
	}
}
