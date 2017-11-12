/*
	Used for categorizing newly created Events, and filtering specific Events
	to specific EventListeners.
	See Event.js
*/

const EventFilter = {
	KEYBOARD: "KEYBOARD",
	COLLISION: "COLLISION",
	DESTROY: "DESTROY", //when an object (asteroid, enemy, player) is destroyed
	GAME: "GAME",
	OTHER: "OTHER",
}
