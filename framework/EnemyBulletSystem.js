class EnemyBulletSystem extends GameObjectSystem {
	constructor() {
		super();
	}

	spawnBullet(x,y,angle,speed, color){
		this.addObject(new Bullet(x, y, angle, speed, color));
	}

}