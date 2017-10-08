/*
	A system that updates and renders a single game object or array of game objects.
	GameObjects will be removed if they are set to inActive.
	
 */
class GameObjectSystem extends System {
	constructor() {
		super();
		this.gameObjects = new Array();
	}
	
	// Add a single GameObject
	addObject(o) {
		if (o instanceof GameObject == false) { throw new TypeError(); }
		this.gameObjects.push(o);
	}
	
	// Add an array of GameObjects
	addObjects(gameObjects) {
		if (gameObjects instanceof Array == false) { throw new TypeError(); }
		for (let o of gameObjects) {
			this.addGameObject(o);
		}
	}
	
	//update all game objects in the list, and remove inactive ones.
	update() {
		let toRemove = [];
		//update all objects, and flag inactive ones for removal.
		for (let i = 0; i < this.gameObjects.length; i++) {
			const o = this.gameObjects[i];
			o.update();
			if (!o.getIsActive()) {
				toRemove.push(i);
			}
		}
		//remove inactive gameobjects
		for (let i of toRemove) {
			this.gameObjects.splice(i, 1);
		}
	}

	render() {
		for (let o of this.gameObjects) {
			o.render();
		}
	}
}
