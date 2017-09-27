/*
	A GameState for when the game is in the playing mode.
	Also the main GameState used.
*/
class PlayingGameState extends GameState {
	constructor() {
		super();
	}

	update() {
		this.dequeueEvent();
		// this.eventQueue.dequeue(this.eventListeners);
		for (let sys of this.systems) {
			sys.update();
		}
	}

	render() {
		CTX.fillStyle = Colors.WHITE; //background
		CTX.fillRect(0, 0, WIDTH, HEIGHT);

		for (let sys of this.systems) {
			sys.render();
		}
	}
}
