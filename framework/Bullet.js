class Bullet extends GameObject {
	constructor(x , y, playerSystem) {
		super();
		this.player = playerSystem.player;
		this.startLocation = new Point(x, y);
		this.transform.setLocation(x, y);
		this.xloc = x;
		this.yloc = y;
		this.rotation =0;
		this.angle = 0;
		this.speed = 25;//how fast the bullet moves
		this.ymove = 0;//makes the bullet shoot upwards

	}
	//&& (this.ymove <-500)
	update() {
		if (ENGINE.getKeyState().getKey('g')) {
			this.ymove = 0;
			//console.log(this.getX());
			this.xloc = this.player.getX();
			this.yloc = this.player.getY();
			this.angle = this.player.angle;
			this.rotate(this.angle);
		}
	}
	move(x, y) {
		this.transform.getLocation().add(x, y);
	}
 //TODO Rotation is correct but origin point is not
	rotate(angle) {
		this.transform.setRotation(angle*Math.PI/180);
	}

	render() {
		CTX.save();
		CTX.rotate(this.getRotation());
		CTX.translate(this.getX(), this.getY());
		CTX.fillStyle = Colors.GREEN;
		CTX.fillRect(this.xloc , (this.yloc)+this.ymove,5,40);
		this.ymove -= this.speed;
		CTX.restore();
	}


	getX() { return this.transform.getX(); }
	getY() { return this.transform.getY(); }
	getRotation() { return this.transform.getRotation(); }

}
