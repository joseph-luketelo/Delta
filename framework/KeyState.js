// //Singleton. Responsible for keeping track of if a key is being held up or down.

class KeyState {
	constructor() {
		this.keys = ["w", "a", "s", "d"];
		this.keyMap = new Map();
		for (let k of this.keys) {
			this.keyMap.set(k, false);
		}
		this.instance = null;
		
	}
	setKey(key, state) {
		if (this.keyMap.has(key)) {
			this.keyMap.set(key, state);
		}
		// console.log(key, state);
	}
	
	//get whether a key is down or up
	getKey(key) {
		return this.keyMap.get(key);	
	}
}