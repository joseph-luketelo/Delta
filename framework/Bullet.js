class Bullet extends GameObject {
	constructor(x = 0, y = 0) {
		super();
		this.startLocation = new Point(x, y);
		this.transform.setLocation(x, y);
		this.speed = 15;
		this.ymove = 0;
	}

	update() {
		if (ENGINE.getKeyState().getKey('g')&& this.ymove <-800) {
			//TODO set bullet to top of space ship here
			this.ymove = 0;
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
		
		CTX.fillStyle = Colors.WHITE;
		CTX.fillRect(0,this.ymove,5,40);
		this.ymove -= this.speed;
		CTX.restore();
	}
	
	
	getX() { return this.transform.getX(); }
	getY() { return this.transform.getY(); }
	getRotation() { return this.transform.getRotation(); }

}





