//publishes events to the event queue of the current game state.
//objects that want to create Events will need an EventPublisher.
//TODO references global GAME_ENGINE. not great practice, open to suggestions.
class EventPublisher {
	publishEvent(e) {
		ENGINE.receiveEvent(e);
	}
}
