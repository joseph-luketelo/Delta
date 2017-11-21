/*
	TODO update and display startmenu elements like UI, scoreboard, buttons/selections, etc
	StartMenu:
		-start new game
			-setup new game
			-enter Play mode
		-exit
	
*/
class StartMenuGameState extends GameState {
	constructor() {
		super();
		this.title = new Image();
		this.title.src = 'assets/title.png'
		this.titleFlash = 30;

		const startListener = new EventListener(EventFilter.KEYBOARD, function(event) {
			if (event.getEventEnum() == EventEnum.keydown_g) {
				ENGINE.setupNewGame();
			}
		});
		this.registerEventListener(startListener);
	}

	onEnter() {
	}

	update() {
		this.dequeueEvent();
		for (let sys of this.systems) {
			sys.update();
		}
	}

	render() {
		CTX.fillStyle = Colors.PURPLE; //bg overlay color
		CTX.fillRect(0, 0, WIDTH, HEIGHT);
		CTX.drawImage(this.title, WIDTH/2-(this.title.width/2), 100);

		CTX.fillStyle = Colors.WHITE; //text color
		fillText("Controls:", WIDTH/2, HEIGHT/2, Fonts.DEFAULT);
		fillText("Navigate - w,a,s,d", WIDTH/2, HEIGHT/2 + 30, Fonts.DEFAULT);
		fillText("Shoot - g", WIDTH/2, HEIGHT/2 + 60, Fonts.DEFAULT);
		CTX.fillStyle = 
		fillText("Press g to Start", WIDTH/2, HEIGHT/2 + 120, Fonts.DEFAULT);
	}

}
