class Bullet extends GameObject {
	constructor(x , y, playerSystem) {
		super();
		this.player = playerSystem.player;
		this.startLocation = new Point(x, y);
		this.transform.setLocation(x, y);
		this.angle = 0;
		this.speed = 30;//how fast the bullet moves
		this.move = 0;//makes the bullet shoot upwards
	}
	update() {
		if (ENGINE.getKeyState().getKey('g')&& (this.move <-800)) {
			this.move = 0;
			this.angle = this.player.angle; //makes sure bullet doesnt curve after fire
		}
	}
	render() {
		CTX.save();
		CTX.translate(this.player.getX(), this.player.getY());
		CTX.rotate(this.angle*Math.PI/180);
		CTX.fillStyle = Colors.GREEN;
		CTX.fillRect(-3, -80+this.move,5,40);
		this.move -= this.speed;
		CTX.restore();
	}
	getX() { return this.transform.getX(); }
	getY() { return this.transform.getY(); }
	getRotation() { return this.transform.getRotation(); }
}
