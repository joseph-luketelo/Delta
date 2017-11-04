//This class is for Sound Effects
//Work in progress

class SoundSystem{

	constructor() {
		this.backgroundSong    = new Audio('AsteroidThemeSong.mp3');
		this.asteroidExplosion = new Audio('AsteroidExplosion.mp3');
		this.alienBossTheme    = new Audio('AlienBoss.mp3');
		this.bulletSound       = new Audio('LaserBlaster.mp3');
		this.thrusterSound     = new Audio('Thrusters.mp3');
	}

	playBackgroundSong(){
		this.backgroundSong.play();
	}

	playAsteroidExplosion(){
		this.asteroidExplosion.play();
	}

	playAlienBossTheme(){
		this.alienBossTheme.play()
	}

	playBulletSound(){
		this.bulletSound.play();
	}

	playThrusterSound(){
		this.thrusterSound.play();
	}

}
