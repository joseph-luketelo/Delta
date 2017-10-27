class BulletSystem extends System {
	constructor(bullet) {
		super();
		this.bullet = bullet;
	}
	update() {
		this.bullet.update();
	}
	render() {
		this.bullet.render();
	}
	getBullet() {
		return this.bullet;
	}
	setBullet(b) {
		this.bullet = b;
	}

}
