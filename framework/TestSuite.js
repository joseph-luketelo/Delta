const assert = function (test) {
	if (!test) { throw new Error("Assertion Error"); }
}


class TestSuite {
	static runTests() {
		this.test_globals();
		this.test_GameObject();
	}

	static test_globals() {
		assert(CANVAS != undefined);
		assert(CTX != undefined);
		assert(WIDTH != undefined);
		assert(HEIGHT != undefined);
		//TODO test enums and other globals
	}

	static test_GameObject() {
		let o = new GameObject();
		//test default values
		assert(0 == o.getPoints());
		assert(100 == o.getLife());

		assert(true == o.getIsActive()); //object starts active
		o.deactivate();
		assert(false == o.getIsActive()); //object deactivated

		//test constructor
		o = new GameObject(5, 10);
		assert(5 == o.getPoints());
		assert(10 == o.getLife());

		//run methods
		o.update();
		o.render();
		o = new GameObject();

		//test location
		assert(0 == o.getX());
		assert(0 == o.getY());

		// setLocationP(point) { this.transform.setLocation(point.getX(), point.getY()); }
		o.setLocationP(new Point(20, 30));
		assert(20 == o.getX());
		assert(30 == o.getY());

		o.setLocation(5, 10);
		assert(5 == o.getX());
		assert(10 == o.getY());
		let loc = o.getLocation();
		assert(5 == loc.getX());
		assert(10 == loc.getY());

		const BUFFER = 100;
		//test isOffscreen - default (0, 0)
		o.setLocation(0, 0);
		assert(false == o.isOffscreen());

		// test isOffscreen - center
		o.setLocation(WIDTH/2, HEIGHT/2);
		assert(false == o.isOffscreen());

		//test isOffscreen - north
		o.setLocation(0, -BUFFER);
		assert(false == o.isOffscreen());
		o.setLocation(0, -BUFFER -0.001);
		assert(true == o.isOffscreen());

		//test isOffscreen - south
		o.setLocation(0, HEIGHT + BUFFER);
		assert(false == o.isOffscreen());
		o.setLocation(0, HEIGHT + BUFFER + 0.001);
		assert(true == o.isOffscreen());

		//test isOffscreen - west
		o.setLocation(-BUFFER, 0);
		assert(false == o.isOffscreen());
		o.setLocation(-BUFFER - 0.001, 0);
		assert(true == o.isOffscreen());

		//test isOffscreen - east
		o.setLocation(WIDTH + BUFFER, 0);
		assert(false == o.isOffscreen());
		o.setLocation(WIDTH + BUFFER + 0.001, 0);
		assert(true == o.isOffscreen());

		//test isOffscreen - north east
		o.setLocation(WIDTH + BUFFER, -BUFFER);
		assert(false == o.isOffscreen());
		o.setLocation(WIDTH + BUFFER + 0.001, -BUFFER - 0.001);
		assert(true == o.isOffscreen());

		//test isOffscreen - south east
		o.setLocation(WIDTH + BUFFER, HEIGHT + BUFFER);
		assert(false == o.isOffscreen());
		o.setLocation(WIDTH + BUFFER + 0.001, HEIGHT + BUFFER + 0.001);
		assert(true == o.isOffscreen());

		//test isOffscreen - south west
		o.setLocation(-BUFFER, HEIGHT + BUFFER);
		assert(false == o.isOffscreen());
		o.setLocation(-BUFFER - 0.001, HEIGHT + BUFFER + 0.001);
		assert(true == o.isOffscreen());

		//test isOffscreen - north west
		o.setLocation(-BUFFER, -BUFFER);
		assert(false == o.isOffscreen());
		o.setLocation(-BUFFER - 0.001, -BUFFER - 0.001);
		assert(true == o.isOffscreen());

		//test event listeners
		o = new GameObject();
		assert(0 == o.getEventListeners().length);
		let count = 0;
		o.addEventListener(new EventListener(EventFilter.OTHER, function(e) {
			count++;
		}));
		assert(1 == o.getEventListeners().length);
		//NOTE: addEventListener does not check for duplicate listeners.
		// o.publishEvent(new Event()); //TODO dependent on engine.

		//test damage
		assert(100 == o.getLife()); //full hp
		o.damage(50); //damage -50 hp
		assert(50 == o.getLife()); //half hp (50)
		assert(true == o.getIsActive()); //still active
		o.damage(50); //damage remaining 50
		assert(0 == o.getLife()); //half hp (50)
		assert(false == o.getIsActive()); //object destroyed



	}
}

/*


	getVelocity() { return this.velocity; }
	setVelocity(x, y) { this.velocity.set(x, y); }
	setVelocityP(point) { this.velocity.setPoint(point); }

	//damage this object. will automatically destroy itself if life reaches 0.
	//@param dam: an int amount of damage to inflict.
	damage(dam);

	//set to inactive and create event
	//@param points an integer number of points to add to the score. Score is kept on the LevelManager.
	destroy()

*/
