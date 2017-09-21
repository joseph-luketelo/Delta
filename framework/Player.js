
class Player extends GameObject {
	constructor(x = 0, y = 0) {
		super();
		this.location = new Point(x, y);
		this.speed = 2;
		
		//TODO add event listeners
		// this.keyEventHandler = new EventListener(function(e) {
		// }, EventFilter.KEYBOARD);
		// this.eventListeners.push(this.keyEventHandler);
		
		//TODO add player states if needed. ex walking, running, attacking, shooting
		// this.currentState = new State();
			//TODO handle keyboard events here
	}
	update() {
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
		// this.currentState.render();
		CTX.fillStyle = Colors.BLUE;
		CTX.fillRect(this.location.getX(), this.location.getY(), 10, 10);
	}
}
