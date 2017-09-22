/*
	A sample GameState
*/
class TestGameState extends GameState {
	constructor(gameObjects) {
		super();
		this.gameObjects = gameObjects;
		this.addListenersFromObjects(gameObjects); //adds the listeners on each GameObject in gameObjects to the listenerMap
		//add other listeners here as needed. ex
		//this.addListener(some_listener);
	}
	update() {
		this.eventQueue.dequeue(this.eventListeners);
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
