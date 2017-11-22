# Delta

To run the game, open index.html in a browser.


**_Current functionaliy:_**
- "wasd" to move, "g" to fire
- asteroids & enemies spawn depending on level
- (testing) asteroids destroyed automatically when offscreen (instead of by player); game automatically progress through levels.
- basic UI
- player rotation depends on current level mode (scroller or asteroid)


**_TODO - main todo's:_**
- Systems:
	- asteroid fragments - jason
	- enemy behaviour - jason?
		-target player or shoot randomly/in some pattern
		-add projectiles
	- moving bg - daniel
	- sound - ash
	- boss - sukhdeep
	- collision - ahmed?, ash?
	- tests & engine - amanda
- start menu, game over menu, scoreboard, prev round scores
- keep player in bounds/on screen, add stayInBounds function to player
- UI - fix score positioning

**_TODO - refinement:_**
- smooth player movement & rotation, via vel, accel
	- rotate towards a target, rather than raw rotation
	- smooth rotation reset when transitioning via rot velocity
- testing: refine difficulty scaling of level progression. see LevelProgression [link]
- transition smoothly between modes, effects, UI indicators, etc
	- ensure all asteroids are deactivated before goign to next mode/level?

**_TODO - low priority:_**
- optimization - stuttering issues?
- fonts, UI stuff
- only queue raw key events that we're interested in
- levelsystem acts like fsm but doesnt implement the exact methods
- handle window focus, key repeats
- unchecked: specifying num per spawn: spawning more than maxNum of enemies (if max num is 5, but here 7 is still spawned.)
- factor out transform? make x, y, rot variables on game object, or have GameObject extend Transform
- figure out how to use REQUIREJS or something similar, for concatenating multiple js files into one.
- image/canvas buffering?
