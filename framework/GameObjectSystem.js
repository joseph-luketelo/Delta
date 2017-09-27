/*
	A system that updates and renders a single game object or array of game objects.
 */
class GameObjectSystem extends System {
	constructor(args) {
		super();
		this.gameObjects = new Array();
		if (args instanceof Array) {
			for (let obj of args) {
				if (obj instanceof GameObject == false) throw new TypeError();
				this.gameObjects.push(obj);
			}
		} else if (args instanceof GameObject) {
			this.gameObjects.push(args);
		} else {
			throw new TypeError();
		}

	}
	update() {
		for (let o of this.gameObjects) {
			o.update();
		}
	}

	render() {
		for (let o of this.gameObjects) {
			o.render();
		}
	}
}
