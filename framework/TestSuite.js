const assert = function (test) {
	if (!test || test == undefined) { throw new Error("Assertion Error"); }
}


class TestSuite {
	static runTests() {
		this.test_globals();
		this.test_GameObject();
		this.test_System();
		this.test_EventQueue();
		this.test_GameState();
		this.test_levelPresets();
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

		/*
			getVelocity() { return this.velocity; }
			setVelocity(x, y) { this.velocity.set(x, y); }
			setVelocityP(point) { this.velocity.setPoint(point); }

			//set to inactive and create event
			//@param points an integer number of points to add to the score. Score is kept on the LevelManager.
			destroy()
		*/
	}

	static test_System() {
		let system = new System();
		let l = new EventListener(EventFilter.OTHER, function(e) {
		});
		assert(system.getEventListeners() instanceof Array);
		assert(0 == system.getEventListeners().length);
		system.addEventListener(l);
		assert(1 == system.getEventListeners().length);
		// update() {}
		// onEnter() {}
		// onExit() {}
		// render() {}
		// publishEvent(e)
	}

	static test_EventQueue() {
		let q = new EventQueue();
		assert(true == q.isEmpty());
		let e1 = new Event();
		let e2 = new Event();
		q.enqueue(e1);
		q.enqueue(e2);
		assert(false == q.isEmpty());
		assert(e1 == q.dequeue());
		assert(false == q.isEmpty());
		assert(e2 == q.dequeue());
		assert(true == q.isEmpty());

		q.enqueue(e1);
		q.enqueue(e2);
		q.clear();
		assert(true == q.isEmpty());
	}

	static test_GameState() {
		let gs = new GameState();
		let s = new System();

		let count = 0;
		class System_A extends System {
			constructor() {
				super();
				let l = new EventListener(EventFilter.OTHER, function(e) {
					count = 3;
				});
				this.addEventListener(l);
			}
			onEnter() { count = 0; }
			update() { count++; }
			onExit() { count = -1; }
		}
		let system = new System_A();
		gs.addSystem(system);

		//call dequeueEvent and update systems
		gs.onEnter(); //call onEnter on all systems
		assert(0 == count);
		gs.update();
		assert(1 == count);
		gs.onExit(); //call onExit on all systems
		assert(-1 == count);
		gs.enqueueEvent(new Event());
		gs.dequeueEvent();
		assert(3 == count);

		count = 0;
		gs.enqueueEvent(new Event());
		gs.update(); //dequeues the event
		assert(4 == count); //count = 3, count++


		let count2 = 0;
		let l2 = new EventListener(EventFilter.OTHER, function(e) {
			count2 = 1;
		});	

		//add an event listener to the map
		//@param l: an EventListener
		gs.registerEventListener(l2);
		gs.enqueueEvent(new Event());
		gs.update();
		assert(1 == count2);

		let count3 = 0;
		let l3 = new EventListener(EventFilter.OTHER, function(e) {
			count3++;
		});
		let listeners = [l3, l3, l3]

		gs.registerEventListeners(listeners);
		gs.enqueueEvent(new Event());
		gs.update();
		assert(3 == count3);

		// clearEvents() //clear all events from the queue
	}
	
	static test_levelPresets() {
		
		// console.log(LevelPresets.getPresets());
		// console.log(LevelPresets2.getLevels());
		// test getPoints()
		let str = "(1, 2), (3, 4)";
		let pts = getPoints(str);
		assert(pts[0].getX() == 1);
		assert(pts[0].getY() == 2);
		assert(pts[1].getX() == 3);
		assert(pts[1].getY() == 4);
		
		
		// let m = Mode["SCROLLER"];
		// console.log(m);
		
		//read chars until tab, new line, or index > length. return
		/*
		array containing the index of the last read character, and the output string.
		function getNextColumn(index, input) {
			let output = "";
			while(input[index] != "\t" && input[index] != "\n" && index < input.length) {
				output += input[index++];
			}
			return [index, output];
		}
		*/
		// let i = 0;
		// let input = "a\tb\tc\nd\te\tf\t";
		// let letters = new Array();
		// let stop = false;
		
		// while(!stop) {
		// 	let result = getNextColumn(i, input);
		// 	i = result[0];
		// 	letters.push(result[1]);
			
		// 	let c = input[i];
		// 	if (i < input.length) {
		// 		if (c == "\t") { i++; } //same object, next column
		// 		else if (c == "\n") { i++; } //new level object
		// 	}
		// 	if (i >= input.length) {
		// 		stop = true;
		// 	}
		// }
		// assert(i == input.length);
		
	}
}