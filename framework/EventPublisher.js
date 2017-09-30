/*
	Publishes events to the EventQueue of the game engine's current game state.
	Objects that want to create Events will need an EventPublisher.
	Objects that inherit from GameObject inherit an EventPublisher.
	References global GameEngine ENGINE. not great practice, open to suggestions
*/
class EventPublisher {
	publishEvent(e) {
		ENGINE.receiveEvent(e);
	}
}
