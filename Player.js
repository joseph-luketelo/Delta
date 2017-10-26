/*
  	A simple Player that can move horizontally on the screen.
	(use wasd keys to move)
  	See GameObject.js for more details
*/
class PlayerSprite {
	constructor() {
		//setup images
		this.idle = new Image();
		this.forward = new Image();
		this.backward = new Image();
		this.left = new Image();
		this.right = new Image();
		this.idle.src = 'assets/ship_idle.png';
		this.forward.src = 'assets/ship_forward.png';
		this.backward.src = 'assets/ship_backward.png';
		this.left.src = 'assets/ship_left.png';
		this.right.src = 'assets/ship_right.png';
		
		this.shift = 0;
		this.frameWidth = 50;
		this.frameHeight = 90;
		this.widthOffset = this.frameWidth/2;
		this.heightOffset = this.frameHeight/2
		this.totalFrames = 60;
		this.currentFrame = 1;
		this.currentImage = this.idle;
	}
	update() {
		this.shift += this.frameWidth;
		if (this.currentFrame == this.totalFrames) {
			this.shift = 0;
			this.currentFrame = 1;
		}
		this.currentFrame++;
		this.currentImage = this.idle;
	}
	render() {
		CTX.drawImage(this.currentImage, this.shift, 0, this.frameWidth, this.frameHeight, -this.widthOffset, -this.heightOffset, this.frameWidth, this.frameHeight);
	}
	selectForward() { this.currentImage = this.forward; }
	selectIdle() { this.currentImage = this.idle; }
	selectBackward() { this.currentImage = this.backward; }
	selectLeft() { this.currentImage = this.left; }
	selectRight() { this.currentImage = this.right; }
}


class Player extends GameObject {
	constructor(x = 0, y = 0) {
		super();
		this.startLocation = new Point(x, y);
		this.transform.setLocation(x, y);
		this.speed = 2;
		this.projectiles = new Array();
		this.sprite = new PlayerSprite();
		this.width = 50; //same as sprite
		this.height = 90;
	}
	
	update() {
		this.sprite.update();
		if (ENGINE.getKeyState().getKey('w')) {
			this.move(0, -this.speed);
			this.sprite.selectForward();
		}
		if (ENGINE.getKeyState().getKey('a')) { //NOTE possible optimization, set up reference to ENGINE's KeyState in constructor.
			this.move(-this.speed, 0);
			this.sprite.selectLeft();
		}
		if (ENGINE.getKeyState().getKey('s')) {
			this.move(0, this.speed);
			this.sprite.selectBackward();
		}
		if (ENGINE.getKeyState().getKey('d')) {
			this.move(this.speed, 0);
			this.sprite.selectRight();
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
		CTX.save();
		CTX.translate(this.getX(), this.getY());
		CTX.rotate(this.getRotation());
		this.sprite.render();
		CTX.restore();
	}
	
	getX() { return this.transform.getX(); }
	getY() { return this.transform.getY(); }
	getRotation() { return this.transform.getRotation(); }
	
	//Used by CollisionSystem?
	getProjectiles() {
		return this.projectiles();
	}
}