/*
	A simple Player that can move horizontally on the screen.
	(use a and d keys)
	See GameObject.js for more details
*/
// var player_ship = new Image();
// player_ship.onload = function() {
// };
// player_ship.src = 'assets/player_ship.png';

var player_idle = new Image();
player_idle.onload = function() {
};
player_idle.src = 'assets/ship_idle.png';

var player_forward = new Image();
player_forward.onload = function() {
};
player_forward.src = 'assets/ship_forward.png';

var player_backward = new Image();
player_backward.onload = function() {
};
player_backward.src = "assets/ship_backward.png";

var player_left = new Image();
player_left.onload = function() {
};
player_left.src = 'assets/ship_left.png';

var player_right = new Image();
player_right.onload = function() {
};
player_right.src = 'assets/ship_right.png';

var shift = 0;
var frameWidth = 50;
var frameHeight = 90;
var totalFrames = 60;
var currentFrame = 0;

var player_state = player_idle;

class Player extends GameObject {
	constructor(x = 0, y = 0) {
		super();
		this.startLocation = new Point(x, y);
		this.transform.setLocation(x, y);
		this.speed = 2;
		this.projectiles = new Array(); //NOTE: do not reassign. An array containing player's projectiles.
	}
	
	// setup() {
	// 	this.transform.setLocation(this.startLocation.getX(), this.startLocation.getY());
	// 	while (this.projectiles.length > 0) {
	// 		this.projectiles.pop();
	// 	}
	// }
	
	update() {
		if (ENGINE.getKeyState().getKey('w')) {
			this.move(0, -this.speed);
			player_state= player_forward;
		}
		if (ENGINE.getKeyState().getKey('a')) { //NOTE possible optimization, set up reference to ENGINE's KeyState in constructor.
			this.move(-this.speed, 0);
			player_state = player_left;
		}
		if (ENGINE.getKeyState().getKey('s')) {
			this.move(0, this.speed);
			player_state = player_backward;
		}
		if (ENGINE.getKeyState().getKey('d')) {
			this.move(this.speed, 0);
			player_state = player_right;
		}
	}
	move(x, y) {
		this.transform.getLocation().add(x, y);
	}
	
	rotate(radians) {
		const rot = this.getRotation();
		this.transform.setRotation(rot + radians);
	}
	
	render() {
		//TODO rotation
		CTX.save();
		CTX.translate(this.getX(), this.getY());
		CTX.rotate(this.getRotation());
		//CTX.drawImage(player_idle, 0, 0, player_idle.width, player_idle.height);
		CTX.drawImage(player_state, shift, 0, frameWidth, frameHeight, 0, 0, frameWidth, frameHeight);
		shift += 50;
		if (currentFrame== totalFrames) {
			shift = 0;
			currentFrame = 0;
		}
		currentFrame++;
		player_state = player_idle;
		CTX.restore();
	}
	
	
	getX() { return this.transform.getX(); }
	getY() { return this.transform.getY(); }
	getRotation() { return this.transform.getRotation(); }
	

 

	
	//Used by CollisionSystem?
	// getProjectiles() {
	// 	return this.projectiles();
	// }
}
