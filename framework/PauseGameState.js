class PauseGameState extends GameState {
	constructor() {
		super();
		this.screenshot = document.createElement("canvas");
		this.ctx = this.screenshot.getContext("2d");
		this.screenshot.width = WIDTH;
		this.screenshot.height = HEIGHT;

		let resumeListener = new EventListener(EventFilter.KEYBOARD, function(event) {
			if (event.getEventEnum() == EventEnum.keyup_p) {
				ENGINE.resume();
			}
		});
		this.registerEventListener(resumeListener);
	}

	onEnter() {
		this.saveScreenshot();
	}

	update() {
		this.dequeueEvent();
		for (let sys of this.systems) {
			sys.update();
		}
	}

	render() {
		CTX.drawImage(this.screenshot, 0, 0);
		CTX.fillStyle = "rgba(0, 0, 0, 0.5)"; //bg overlay color
		CTX.fillRect(0, 0, WIDTH, HEIGHT);
		CTX.fillStyle = Colors.WHITE; //text color
		fillText("PAUSED", WIDTH/2, HEIGHT/2, Fonts.DEFAULT);
		fillText("press P to resume", WIDTH/2, HEIGHT/2 + 30, Fonts.DEFAULT);
	}

	saveScreenshot() {
		this.ctx.drawImage(CANVAS, 0, 0);
	}
}
