//Responsible for keeping track of whether a key is being held up or down.
//The GameEngine owns an instance of this class.

class KeyState {
	constructor() {
		//an array of keys we want to keep track of.
		//values should match key names in KeyboardEvent.key
		//TODO documentation link here
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

	//get whether a key is being held down or not.
	//@param key: a string equal to one of the values in this.keys array.
	//@return true if the given key is down, false if it's up
	getKey(key) {
		return this.keyMap.get(key);
	}
}
