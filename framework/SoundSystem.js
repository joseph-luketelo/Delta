//This class is for Sound Effects 
//Work in progress

class SoundSystem{
    constructor(){
        
    }
    var backgroundSong    = new Audio('AsteroidThemeSong.mp3');
    var asteroidExplosion = new Audio('AsteroidExplosion.mp3');
    var alienBossTheme    = new Audio('AlienBoss.mp3');
    var bulletSound       = new Audio('LaserBlaster.mp3');
    var thrusterSound     = new Audio('Thrusters.mp3');

    function playBackgroundSong(){
        backgroundSong.play();
    }

    function playAsteroidExplosion(){
        asteroidExplosion.play();
    }

    function playAlienBossTheme(){
        alienBossTheme.play()
    }

    function playBulletSound(){
        bulletSound.play();
    }

    function playThrusterSound(){
        thrusterSound.play();
    }

}
