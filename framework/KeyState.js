//Responsible for keeping track of whether a key is being held up or down.
//The GameEngine owns an instance of this class.

class KeyState {
	constructor() {
		//value names should match key names in KeyboardEvent.key
		//ref: https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key
		this.keys = ["w", "a", "s", "d", //an array of keys we want to keep track of.
					"q", "e", "r", "t", "y",
					"z", "x", "c", "v",
					"g",
					" ", "Shift", "Control"]; //" " is for the spacebar.
		this.keyMap = new Map(); //Map<String, Boolean>
		for (let k of this.keys) {
			this.keyMap.set(k, false);
		}

	}
	setKey(key, state) {
		if (this.keyMap.has(key)) {
			this.keyMap.set(key, state);
		}
		// console.log(key, state);
	}

	//set each key to false
	clearKeys() {
		this.keyMap.forEach(function(value, key) {
			value = false;
		});
	}

	//get whether a key is being held down or not.
	//@param key: a string equal to one of the values in this.keys array.
	//@return true if the given key is down, false if it"s up
	getKey(key) {
		return this.keyMap.get(key);
	}
}
