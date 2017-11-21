//Class for drawing background image(s).
//Will be added to the engine via PlayingGameState.js
class BGSystem extends System {
	constructor() {
		super();
		this.loc1Scroller = new Point(0, 0); // bg image location for scroller mode
		this.loc2Scroller = new Point(900, 900); 
		// this.loc3Scroller = new Point(500, 500); 
		// this.loc4Scroller = new Point(200, 200); 

		this.loc1Asteroid = new Point(0, 0); // bg image location for Asteroid mode
		this.loc2Asteroid = new Point(900, 900); 
		// this.loc3Asteroid = new Point(0, 0); 
		// this.loc4Asteroid = new Point(0, 0); 

		this.velocity = new Point(0, 0.5);
		//TODO: set up images
		// Gifs should be loopable, and
		// gifs should also be tileable (for scroller mode, when
		// the background is moving vertically)
		//ex https://www.pinterest.ca/pin/261560690838597798/

		this.bgImageAsteroid = new Image();
		this.bgImageScroller = new Image();
		this.bgImageAsteroid.src = "assets/bgimage_asteroid.gif";
		this.bgImageScroller.src = "assets/bgimage_scroller.gif";
	}

	//called every frame
	update() {
	}

	//called every frame
	render() {
		if(LevelPresets.getPresets()[0].mode.type === "SCROLLER") {
			CTX.drawImage(this.bgImageScroller, this.loc1Scroller.getX(), this.loc1Scroller.getY(), this.loc2Scroller.getX(), this.loc2Scroller.getY());
		} else if(LevelPresets.getPresets()[0].mode.type === "ASTEROID") {
			CTX.drawImage(this.bgImageAsteroid, this.loc1Asteroid.getX(), this.loc1Asteroid.getY(), this.loc2Asteroid.getX(), this.loc2Asteroid.getY());
		}
	}

	// continuously move images vertically (top to bottom). called by another
	// class (LevelSystem.js) when the game is in scroller mode.
	// scroll() will stop being called when game is in asteroid mode.
	scroll() {
		// console.log(this.loc1Scroller.getX(), this.loc1Scroller.getY());
		if(this.loc1Scroller.getY() === 600) {
			this.loc1Scroller.set(0, 0);
		}
		this.loc1Scroller.addPoint(this.velocity); //move images vertically
		// reset image locations when offscreen (move back to top, when past bottom)
	}

}
