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
		this.startLocation = new Point(x, y);
		this.transform.setLocation(x, y);
		this.speed = 2;
		this.projectiles = new Array(); //NOTE: do not reassign. An array containing player's projectiles.
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
		CTX.drawImage(player_ship, 0, 0, player_ship.width, player_ship.height);
		CTX.restore();
	}

	getX() { return this.transform.getX(); }
	getY() { return this.transform.getY(); }
	getRotation() { return this.transform.getRotation(); }
}
