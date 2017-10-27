class Bullet extends GameObject {
	constructor(x , y, playerSystem) {
		super();
		this.startLocation = new Point(x, y);
		this.transform.setLocation(x, y);
		this.xloc = x;
		this.yloc = y;
		this.rotation =0;
		this.speed = 25;//how fast the bullet moves
		this.ymove = 0;//makes the bullet shoot upwards
		this.player = playerSystem.player;
	}

	update() {
		if (ENGINE.getKeyState().getKey('g')&& this.ymove <-500) {
			//TODO set bullet to top of space ship here
			this.ymove = 0;
			//console.log(this.getX());
			this.xloc = this.player.getX();
			this.yloc = this.player.getY();
			this.rotation = this.player.getRotation();
			//console.log(this.rotation);
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

		CTX.fillStyle = Colors.GREEN;
		CTX.fillRect(this.xloc , this.yloc+this.ymove,5,40);
		this.ymove -= this.speed;
		CTX.restore();
	}


	getX() { return this.transform.getX(); }
	getY() { return this.transform.getY(); }
	getRotation() { return this.transform.getRotation(); }

}
