//This class is for Sound Effects
//Work in progress

class SoundSystem {
	constructor() {
		this.backgroundSong    = new Audio('assets/AsteroidThemeSong.mp3');
		this.asteroidExplosion = new Audio('assets/AsteroidExplosion.mp3');
		this.alienBossTheme    = new Audio('assets/AlienBoss.mp3');
		this.bulletSound       = new Audio('assets/LaserBlaster.mp3');
		this.thrusterSound     = new Audio('assets/Thrusters.mp3');
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
