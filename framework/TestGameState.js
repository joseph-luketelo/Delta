


//A GameState for when the game is in the start menu.
class TestGameState extends GameState {
	constructor(gameObjects) {
		super();
		this.gameObjects = gameObjects;
		this.addListeners(gameObjects);
		//add listeners here
		//TODO add listeners on GameObjects to listenerMap
		// this.listenerMap.addListener(some_listener);
	}
	update() {
		this.eventQueue.dequeue(this.listeners);
		for (let obj of this.gameObjects) {
			obj.update();
		}
	}
	render() {
		CTX.fillStyle = Colors.WHITE; //background
		CTX.fillRect(0, 0, WIDTH, HEIGHT);
		//random square
		
		for (let obj of this.gameObjects) {
			obj.render();
		}
	}
}