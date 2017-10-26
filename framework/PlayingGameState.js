/*
	A GameState for when the game is in the playing mode.
	Also the main GameState used.
*/
class PlayingGameState extends GameState {
	constructor() {
		super();

		//Define Systems here.
		let playerSystem = new PlayerSystem(new Player(WIDTH/2, HEIGHT/2)); //updates and renders player
		let asteroidSystem = new GameObjectSystem(); //updates and renders asteriods
		let enemySystem = new GameObjectSystem(); //updates and renders enemies
		let collisionSystem = new CollisionSystem(playerSystem, asteroidSystem); //sample collision system
		let bossSystem = undefined;

		//Spawning & levelling TODO use preset levels array on the LevelSet
		let levelPresetsSupplier = LevelPresets.getPresets; //returns an array of Level presets
		let levelSystem = new LevelSystem(levelPresetsSupplier, playerSystem, asteroidSystem, enemySystem, bossSystem); // levels, playerSystem, asteroidSystem, enemySystem, bossSystem)

		//Add your System to the main playingState
		//eventlisteners belonging to each system will be automaticlaly registered with this state.
		this.addSystem(enemySystem);
		this.addSystem(asteroidSystem);
		this.addSystem(playerSystem);
		this.addSystem(levelSystem);
		this.addSystem(collisionSystem);

		let gameWonListener = new EventListener(EventFilter.GAME, function(event) {
			if (event.getEventEnum() == EventEnum.GAME_WON) {
				console.log('Game won');
				//TODO handle when the game is won.
				//transition to GameWon state
			}
		});
		this.registerEventListener(gameWonListener);
	}

	update() {
		this.dequeueEvent();
		for (let sys of this.systems) {
			sys.update();
		}
	}

	render() {
		CTX.fillStyle = Colors.WHITE; //background
		CTX.fillRect(0, 0, WIDTH, HEIGHT);

		//TODO determine render order if necessary. reorder the addSystem statements in constructor.
		for (let sys of this.systems) {
			sys.render();
		}
	}
}
