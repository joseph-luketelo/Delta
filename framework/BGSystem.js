//Class for drawing background image(s).
//Will be added to the engine via PlayingGameState.js
class BGSystem extends System {
	constructor() {
		super();
		this.loc1 = new Point(0, 0); //bg image location
		this.velocity = new Point(0, 1);
		//TODO: set up images
		// Gifs should be loopable, and
		// gifs should also be tileable (for scroller mode, when
		// the background is moving vertically)
		//ex https://www.pinterest.ca/pin/261560690838597798/

		// this.image1 = new Image();
		// this.image2 = new Image();
		// this.image1.src = "assets/your_bg1.gif";
		// this.image2.src = "assets/your_bg2.gif";
	}

	//called every frame
	update() {
	}

	//called every frame
	render() {
		// TODO
		// CTX.drawImage(this.image1, this.loc1.getX(), this.loc1.getY());
		// CTX.drawImage(this.image2, this.loc2.getX(), this.loc2.getY());
	}

	// continuously move images vertically (top to bottom). called by another
	// class (LevelSystem.js) when the game is in scroller mode.
	// scroll() will stop being called when game is in asteroid mode.
	scroll() {
		// this.loc1.addPoint(this.velocity); //move images vertically
		// reset image locations when offscreen (move back to top, when past bottom)
	}

}
