TODO
moving bg
add event for setup (ash)
write more tests
.
only queue raw key events that we're interested in
smooth player movement, rotation, acceleration
levelsystem acts like fsm but doesnt implement the exact methods
handle on window unfocus, key repeats


Changes:
asteroids.js - unused
	comment out

Colors.js
	add Fonts global object.
	fix alpha values (255 to 1.0)

globals
	add global function: fillText(text, x, y, font, ctx = CTX)

GameEngine
	documentation

GameObject.js
	change game object offscreen buffer variables to static getters

GameState.js
	style & formatting

LevelSystem.js
	add player movement/rotation restrictions based on mode (scroller or asteroid)

PlayingGameState.js
	fix pausing (p to toggle pause)

main.js
	update setup console message
