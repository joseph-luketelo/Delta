class Bullet extends GameObject {
	constructor(x , y, angle, speed, color) {
		super();
		this.startLocation = new Point(x, y);
		this.transform.setLocation(x, y);
		this.angle = angle;
		this.speed = speed;//how fast the bullet moves
		this.color = color;
		this.move = 0;//makes the bullet shoot upwards
	}
	update() {
		this.transform.getLocation().add(this.speed*Math.sin(this.angle * Math.PI /180), -this.speed * Math.cos(this.angle * Math.PI / 180));
		this.move -= this.speed;
		if (this.isOffscreen()) {
			this.deactivate();
		}
	}
	render() {
		CTX.save();
		CTX.translate(this.getX(),this.getY());
		CTX.rotate(this.angle*Math.PI/180);
		CTX.fillStyle = this.color;
		CTX.fillRect(-3, -65,5,40);
		CTX.restore();
	}

	getX() { return this.transform.getX(); }
	getY() { return this.transform.getY(); }
	getRotation() { return this.transform.getRotation(); }
}