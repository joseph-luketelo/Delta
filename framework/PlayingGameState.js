/*
	A GameState for when the game is in the playing mode.
	Also the main GameState used.
*/


// var imgBg;
// var imgDrops = new Image();
// imgDrops.onload = function(){
// };
// imgDrops.src = 'assets/alien.png';
// var player_idle = new Image();
// player_idle.onload = function() {
// };
// player_idle.src = 'assets/ship_idle.png';

// var shift = 0;
// var frameWidth = 50;
// var frameHeight = 90;
// var totalFrames = 60;
// var currentFrame = 0;
//
// var interval;
//
// var x = 0;
// var y = 0;
// var noOfDrops = 50;
// var fallingDrops = [];

class PlayingGameState extends GameState {
	constructor() {
		super();

		//Define Systems here.
		let playerSystem = new PlayerSystem(new Player(WIDTH/2, HEIGHT/2)); //updates and renders player
		let bulletSystem = new BulletSystem(new Bullet(WIDTH/2, HEIGHT/2, playerSystem));//updates and renders player bullets
		let asteroidSystem = new GameObjectSystem(); //updates and renders asteriods
		let enemySystem = new GameObjectSystem(); //updates and renders enemies
		let bossSystem = undefined;
		let levelSystem = new LevelSystem(LevelPresets.getPresets, playerSystem, asteroidSystem, enemySystem, bossSystem); // levels, playerSystem, asteroidSystem, enemySystem, bossSystem)
		let soundSystem = new SoundSystem(); //sound object
		//transitionSystem = new System();
		// let collisionSystem = new CollisionSystem(playerSystem, asteroidSystem); //sample collision system
			//checks and handles collisions
			//call damage() on game objects if they have been hit
			//call destroy() on game objects if they have been destroyed

		//Add your System to the main playingState
		//eventlisteners belonging to each system will be automaticlaly registered with this state.
		this.addSystem(enemySystem);
		this.addSystem(asteroidSystem);
		this.addSystem(playerSystem);
		this.addSystem(bulletSystem);
		this.addSystem(levelSystem);
		this.addSystem(soundSystem);
		// this.addSystem(collisionSystem);

		let gameWonListener = new EventListener(EventFilter.GAME, function(event) {
			if (event.getEventEnum() == EventEnum.GAME_WON) {
				console.log('Game won');
				//TODO handle when the game is won, transition to GameWon state
			}
		});

		let pauseListener = new EventListener(EventFilter.GAME, function(event) {
			if (event.getEventFilter() == EventEnum.GAME_PAUSE) {
				ENGINE.pauseGame();
			}
		});

		let gKeyListener = new EventListener(EventFilter.KEYBOARD, function(event) {
			if (event.getEventEnum() == EventEnum.keydown_g) {
				console.log("pew");
			}
		});

		this.registerEventListener(gameWonListener);
		this.registerEventListener(pauseListener);
		this.registerEventListener(gKeyListener);
	}

	update() {
		this.dequeueEvent();
		for (let sys of this.systems) {
			sys.update();
		}
	}

	render() {
		CTX.fillStyle = Colors.PURPLE; //background
		CTX.fillRect(0, 0, WIDTH, HEIGHT);

		//background();
		//CTX.drawImage(imgDrops, 100, 100, imgDrops.width, imgDrops.height);
		//TODO determine render order if necessary. reorder the addSystem statements in constructor.
		for (let sys of this.systems) {
			sys.render();
		}
	}

}
// function background(){
// 	CTX.drawImage(imgDrops, Math.random()*100 ,300, imgDrops.width, imgDrops.height);
// }
