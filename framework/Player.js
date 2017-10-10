/*
	A simple Player that can move horizontally on the screen.
	(use a and d keys)
	See GameObject.js for more details
*/
var player_ship = new Image();
player_ship.onload = function() {
};
player_ship.src = 'assets/player_ship.png';

class Player extends GameObject {
	constructor(x = 0, y = 0) {
		super();
		this.location = this.transform.getLocation(); //reference for convenience
		this.transform.getLocation().set(x, y);
		this.speed = 2;
		this.projectiles = new Array(); //NOTE: do not reassign. An array containing player's projectiles.
		
		// NOTE add EventListeners here if needed. example:
		// this.gameEventHandler = new EventListener(EventFilter.GAME_EVENT, function(e) {
		//	handle game event
		// });
		// this.addEventListener(this.keyEventHandler);

		// Add player states if needed. ex walking, running, attacking, shooting, taking damage
	}
	update() {
		if (ENGINE.getKeyState().getKey('w')) {
			this.move(0, -this.speed);
		}
		if (ENGINE.getKeyState().getKey('a')) { //NOTE possible optimization, set up reference to ENGINE's KeyState in constructor.
			this.move(-this.speed, 0);
		}
		if (ENGINE.getKeyState().getKey('s')) {
			this.move(0, this.speed);
		}
		if (ENGINE.getKeyState().getKey('d')) {
			this.move(this.speed, 0);
		}
	}
	move(x, y) {
		this.location.add(x, y);
	}

	render() {
		//TODO render player here. currently just a blue square.
		CTX.drawImage(player_ship,this.location.getX(), this.location.getY(), player_ship.width, player_ship.height);
	}

	getX() { return this.location.getX(); }
	getY() { return this.location.getY(); }
	
	//Used by CollisionSystem.
	getProjectiles() {
		return this.projectiles();
	}
}
