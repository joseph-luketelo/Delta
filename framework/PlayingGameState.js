/*
	A GameState for when the game is in the playing mode.
	Also the main GameState used.
*/

class PlayingGameState extends GameState {
	constructor() {
		super();

		//Define Systems here.
		let bgSystem = new BGSystem();
		let playerSystem = new PlayerSystem(new Player(WIDTH/2, HEIGHT/2)); //updates and renders player
		let playerBulletSystem = new PlayerBulletSystem(playerSystem);//updates and renders player bullets
		let asteroidSystem = new GameObjectSystem(); //updates and renders asteriods
		let enemySystem = new GameObjectSystem(); //updates and renders enemies
		let bossSystem = new GameObjectSystem();
		// let levelSystem = new LevelSystem(LevelPresets.getPresets, playerSystem, asteroidSystem, enemySystem, bossSystem, bgSystem); // levels, playerSystem, asteroidSystem, enemySystem, bossSystem)
		let levelSystem = new LevelSystem(LevelPresets2.getLevels, playerSystem, asteroidSystem, enemySystem, bossSystem, bgSystem); // levels, playerSystem, asteroidSystem, enemySystem, bossSystem)


		//transitionSystem = new System();
		// let collisionSystem = new CollisionSystem(playerSystem, asteroidSystem); //sample collision system
			//checks and handles collisions
			//call damage() on game objects if they have been hit
			//call destroy() on game objects if they have been destroyed

		//Add your System to the main playingState
		//eventlisteners belonging to each system will be automaticlaly registered with this state.
		//NOTE: add order will determing render order.
		this.addSystem(bgSystem); //bg system should be added first, so that it's drawn before other elements.
		this.addSystem(enemySystem);
		this.addSystem(asteroidSystem);
		this.addSystem(playerBulletSystem);
		this.addSystem(playerSystem);
		this.addSystem(bossSystem);
		this.addSystem(levelSystem);
		// this.addSystem(collisionSystem);

		let gameWonListener = new EventListener(EventFilter.GAME, function(event) {
			if (event.getEventEnum() == EventEnum.GAME_WON) {
				console.log('Game won');
				//TODO handle when the game is won, transition to GameWon state
			}
		});

		let pauseListener = new EventListener(EventFilter.KEYBOARD, function(event) {
			if (event.getEventEnum() == EventEnum.keyup_p) {
				ENGINE.pauseGame();
			}
		});


		this.registerEventListener(gameWonListener);
		this.registerEventListener(pauseListener);
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
		for (let sys of this.systems) {
			sys.render(); //NOTE determine render order of systems in constructor.
		}
	}
}
