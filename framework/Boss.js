class BossSprite {
	constructor() {
		//setup images
		this.boss_1 = new Image();
		this.boss_2 = new Image();

		this.boss_1.src = 'assets/boss_1.png';
		this.boss_2.src = 'assets/boss_2.png';

		this.shift = 0;
		this.frameWidth = 200;
		this.frameHeight = 200;
		this.widthOffset = this.frameWidth/2;
		this.heightOffset = this.frameHeight/2
		this.totalFrames = 60;
		this.currentFrame = 1;
		this.currentImage = this.boss_1;
	}
	update() {
		this.shift += this.frameWidth;
		if (this.currentFrame == this.totalFrames) {
			this.shift = 0;
			this.currentFrame = 1;
		}
		this.currentFrame++;
	}
	render() {
		CTX.drawImage(this.currentImage, this.shift, 0, this.frameWidth, this.frameHeight, -this.widthOffset, -this.heightOffset, this.frameWidth, this.frameHeight);
	}

	selectBoss1() { this.currentImage = this.boss_1; }
	selectBoss2() { this.currentImage = this.boss_2; }
}

class Boss extends GameObject {
	constructor(points = 100, life = 100) {
		super(points, life);
		this.transform.setLocation(WIDTH/2,-300);
		this.bossBulletSystem = new EnemyBulletSystem();
		this.sprite = new BossSprite();
		this.state = 0;
		this.moveSpeed = 2;
		this.phase1Shoot = 60;
		this.phase2Shoot = 60;
		this.phase1Move = 0;//makes the boss wiggle in phase 1
		this.phase2Rotate = 0;
		this.phase2Turner = 1;
	}
	update() {
		this.sprite.update();
		this.bossBulletSystem.update();
		switch(this.state){
			case 0:
				this.sprite.selectBoss1();
				this.start();
				break;
			case 1:
				this.phase1();
				break;
			case 2:
				this.sprite.selectBoss2();
				this.phase2();
				break;
			default:
				break;
		}
	}
	start() {
		if(this.transform.getY() < 100){
			this.transform.getLocation().add(0, this.moveSpeed);
		}
		else{
			this.state =1;
		}
	}
	phase1() {
		//if out of bounds switch direction
		if(this.transform.getX() > this.eastBuffer-this.sprite.frameWidth || this.transform.getX() < this.westBuffer+200){
			this.moveSpeed *=-1;
		}
		this.phase1Move++;
		this.transform.getLocation().add(this.moveSpeed, Math.sin(this.phase1Move*0.5*Math.PI/25));//move ship in wave style
		this.phase1Shoot --;
		if(this.phase1Shoot <0){
			this.bossBulletSystem.spawnBullet(this.getX(), this.getY(),180, 2, Colors.WHITE);
			this.phase1Shoot = 60;
			this.life--; //REMOVE THIS ONCE COLLISION WORKS JUST TESTING PHASES
		}
		if(this.life < 50){
			this.state = 2;
		}
	}
	phase2() {
		//this.transform.setRotation(this.phase2Move*Math.PI/180)
		//this.phase2Move *= -1;
		this.phase2Shoot --;
		if(this.phase2Shoot < 0){
			this.rotate(this.phase2Rotate);
			for(let i = this.phase2Rotate; i< 360; i+=30){
				this.bossBulletSystem.spawnBullet(this.getX(),this.getY(), i, 1,Colors.WHITE);
			}
			this.phase2Rotate +=10 * this.phase2Turner;
			if(this.phase2Rotate == 20) {
				this.phase2Turner = -1;
			}
			else if (this.phase2Rotate == -20){
				this.phase2Turner = 1;
			}
			this.phase2Shoot = 120;
		}
	}
	rotate(angle) {
		this.transform.setRotation(angle*Math.PI/180);
	}
	render() {
		CTX.save();
		this.bossBulletSystem.render();
		CTX.translate(this.transform.getX(), this.transform.getY());
		CTX.rotate(this.transform.getRotation());
		//CTX.drawImage(this.image.image, 0, 0);
		this.sprite.render();
		
		CTX.restore();
	}
}