class PlayerBulletSystem extends GameObjectSystem {
	constructor(playerSystem) {
		super();
		this.player = playerSystem.player;
		this.rapid = 10;//timer before you can spawn new bullet
	}
	update() {
		if (this.rapid >= 0) { //prevent rapid from decrementing forever
			this.rapid --;
		}
		super.update();
		if (ENGINE.getKeyState().getKey('g')) {
			this.spawnBullet();
		}
	}
	render() {
		super.render();
	}
	spawnBullet(){
		//if timer is reset, player can shoot a new bullet
		if(this.rapid <0){
			this.addObject(new Bullet(this.player.getX(), this.player.getY(), this.player.angle, 10, Colors.GREEN));
			this.rapid = 10;
		}
	}
}