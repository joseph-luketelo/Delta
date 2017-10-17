// TODO make object lists for GameObjectSystem
// Updated:
// GameEngine.js
// GameModeManager.js
// GameObjectSystem.js
// CollisionSystem.js
 



/*
	A system that updates and renders an array of game objects.
	GameObjects in an array will be automatically removed if they are set to inactive.
	encapsualte an array of objects, allows for all objects in array to be updated & rendered,
	and for the same array to be accesed by different systems.
*/
class GameObjectSystem extends System {
	constructor() {
		super();
		this.gameObjects = new Array(); //array of game objects
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
			this.addObject(o);
		}
	}
	
	//return array of objects
	getObjects() {
		return this.gameObjects;
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
	
	getLength() {
		return this.gameObjects.length;
	}
}
