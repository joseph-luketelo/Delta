//Map KeyboardEvents from the browser into Events like pause.
class RawKeyMap {
	static map(keyEvent) {
		switch(keyEvent.key) {
			case 'p':
				if (keyEvent.type == "keyup") {
					ENGINE.queueEvent(new Event(EventFilter.GAME, EventEnum.GAME_PAUSE));
				}
		}
		// //TODO map KeyboardEvents from the browser to the appropriate Event.
		// return new Event(EventFilter.KEYBOARD, keyEvent.type + "_" + keyEvent.key);
		// //TODO return null for undesired key events.
	}
}
