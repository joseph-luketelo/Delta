/*
	Used for categorizing newly created Events, and filtering specific Events
	to specific EventListeners.
	See Event.js
*/

let EventFilter = {
	KEYBOARD: "KEYBOARD",
	COLLISION: "COLLISION",
	DESTROY: "DESTROY", //when an object (asteroid, enemy, player) is destroyed
	GAME: "GAME",
	// GAME_EVENT: "GAME_EVENT",
	OTHER: "OTHER",
}
