/*
	Enum of specific events, used for handling Event objects. if an EventListener wants to receive events under
	EventFilter.KEYBOARD, they can then handle the the specific key event.
	Some possible event enums: player attack, enemy attack, collision event, 
		picking up item, activating a lever or door, game pause, resume,
		defeating boss, triggering sounds
	
	// example
	handleKeyEvent(e) {
		switch(e.getEventEnum()) {
			case EventEnum.KEY_UP_D:
				console.log("d key was released.");
				break;
			case EventEnum.KEY_DOWN_D:
				console.log("d key is was pressed.");
				break;
		}
	}

*/


let EventEnum = {
	KEY_DOWN_W: "KEY_DOWN_W",
	KEY_DOWN_A: "KEY_DOWN_A",
	KEY_DOWN_S: "KEY_DOWN_S",
	KEY_DOWN_D: "KEY_DOWN_D",

	KEY_UP_W: "KEY_UP_W",
	KEY_UP_A: "KEY_UP_A",
	KEY_UP_S: "KEY_UP_S",
	KEY_UP_D: "KEY_UP_D",
	
	GAME_EVENT_DOOR_OPEN: "GAME_EVENT_DOOR_OPEN",
	
	OTHER: "OTHER"
};



