// TODO fix bug.
// see TODO's in LevelSYstem and LevelPresets.
// Simple container class for using strings as objects.
class Str {
	constructor(str = "") { this.str = str; }
	getStr() { return this.str; }
	setStr(s) { this.str = s; }
}

// A Container object for predefined levels.
// Uses level_resets.tsv
const LevelPresets2 = {
	//return an array of functions
	getLevels: function() {
		let levels = new Array();
		let input = LevelPresets2.levelStr;
		let lines = getLines(input); //get array of lines

		let container = new Str();
		let result = "";
		for (let line of lines) {
			let i = 0;
			// 	read level
			i = getNextColumn2(i, line, container) +1;
			let levelNum = Number(container.getStr());

			// 	read mode
			i = getNextColumn2(i, line, container) +1;
			let modeKey = container.getStr();
			// let mode = Mode.get(modeStr);
			let mode = Mode[modeKey];

			// 	read dxRange and or dyRange
			i = getNextColumn2(i, line, container) +1;
			let dx_dy = container.getStr();

			// 	read target score
			i = getNextColumn2(i, line, container) +1;
			let targetScore = Number(container.getStr());

			// 	read maxAsteroids
			i = getNextColumn2(i, line, container) +1;
			let a_maxNum = Number(container.getStr());

			// 	read asteroid spawn freq and # per spawn range
			i = getNextColumn2(i, line, container) +1;
			let a_spawnFreq_numPer = container.getStr();
			let a_spawnFreq_numPer_pts = getPoints(a_spawnFreq_numPer);
			let a_spawnFreqRange = a_spawnFreq_numPer_pts[0];
			let a_numPerSpawnRange = a_spawnFreq_numPer_pts[1];

			// 	read max enemies
			i = getNextColumn2(i, line, container) +1;
			let e_maxNum = Number(container.getStr());

			// 	read enemy spawn freq and # per spawn range
			i = getNextColumn2(i, line, container) +1;
			let e_spawnFreq_numPer = container.getStr();
			let e_spawnFreq_numPer_pts = getPoints(e_spawnFreq_numPer);
			let e_spawnFreqRange = e_spawnFreq_numPer_pts[0];
			let e_numPerSpawnRange = e_spawnFreq_numPer_pts[1];

			let a_supplier = undefined;
			const e_supplier = function() { return new TestEnemy(); };
			let bossSpawner = undefined;
			if (mode == Mode.SCROLLER) {
				a_supplier = function() {
					let pts = getPoints(dx_dy);
					dxRange = pts[0];
					dyRange = pts[1];
					return make_scroll_ast(dxRange, dyRange);
				};
			} else if (mode == Mode.ASTEROID) {
				spd = getPoints(dx_dy)[0];
				a_supplier = function() {
					return make_asteroids_ast(spd);
				}
			} else if (mode == Mode.BOSS || mode == Mode.BOSS_A || mode == Mode.BOSS_S ) {
				//TODO
				let b_supplier = function() {
					let boss = new Boss();
					//let rect = LevelPresets.asteroid_spawnAreas[randInt(0, 4)];
					let x = WIDTH/2;
					let y = -30;
					let loc = new Point(x, y);

					const halfWidth = WIDTH/2;
					const halfHeight = HEIGHT/2;

					return boss;
				}
				bossSpawner = new ObjectSpawner(b_supplier, new Point(1, 1), new Point(1, 1), 1);
			} else {
				throw new Error("invalid mode: " + mode);
			}

			const asteroidSpawner = new ObjectSpawner(a_supplier, a_spawnFreqRange, a_numPerSpawnRange, a_maxNum);
			const enemySpawner = new ObjectSpawner(e_supplier, e_spawnFreqRange, e_numPerSpawnRange, e_maxNum);

			let level = new Level(mode, levelNum, targetScore, asteroidSpawner, enemySpawner, bossSpawner);
			levels.push(level);
		}
		return levels;
	},

	// (see level_presets.tsv)
	//TODO update
	levelStr: "" +
	// "1	SCROLLER	(-0.5, 0.5), (2, 5)	100	-1	(20, 50), (1, 1)	0	n/a\n" +
	// "2	SCROLLER	(-0.5, 0.5), (2, 5)	200	-1	(20, 45), (1, 1)	0	n/a\n" +
	// "3	SCROLLER	(-0.6, 0.6), (2, 6)	400	-1	(18, 45), (1, 1)	0	n/a\n" +
	// "4	SCROLLER	(-0.6, 0.6), (2, 6)	600	-1	(15, 40), (1, 1)	0	n/a\n" +
	// "5	SCROLLER	(-0.65, 0.65), (2, 7)	800	-1	(13, 35), (1, 1)	0	n/a\n" +
	// "6	ASTEROID	spd(1, 3)	1000	-1	(20, 50), (1, 1)	0	n/a\n" +
	// "7	SCROLLER	(-0.5, 0.5), (2, 5)	100	-1	(20, 50), (1, 1)	3	(1, 1), (3, 3)\n" +
	// "8	SCROLLER	(-0.5, 0.5), (2, 5)	200	-1	(20, 45), (1, 1)	5	(1, 1), (5, 5)\n" +
	// "9	SCROLLER	(-0.6, 0.6), (2, 6)	400	-1	(18, 45), (1, 1)	5	(1, 1), (5, 5)\n" +
	// "10	SCROLLER	(-0.6, 0.6), (2, 6)	600	-1	(15, 40), (1, 1)	7	(1, 1), (7, 7)\n" +
	// "11	SCROLLER	(-0.65, 0.65), (2, 7)	800	-1	(13, 35), (1, 1)	7	(1, 1), (7, 7)\n" +
	// "12	ASTEROID	spd(1, 3)	1000	-1	(20, 50), (1, 1)	9	(1, 1), (9, 9)\n" +
	"13	BOSS	spd(1, 3)	2500	0	(20, 50), (1, 1)	0	(1, 1), (1, 1)\n",

	asteroid_spawnAreas: [
		new Rectangle(-80, -80, WIDTH + 40, 50), //north
		new Rectangle(-80, HEIGHT + 40, WIDTH + 40, 50), //south
		new Rectangle(-80, -80, 50, HEIGHT + 40), //east
		new Rectangle(WIDTH + 40, -80, 50, HEIGHT + 40), //east
	],
}


//return a new Asteroid for the SCROLLER mode
function make_scroll_ast(dxRange, dyRange) {
	let ast = new TestAsteroid();
	const x = Mode.SCROLLER.ast_start_x_range.rand();
	const y = Mode.SCROLLER.ast_start_y_range.rand();
	ast.setLocation(x, y);
	const dx = dxRange.rand();
	const dy = dyRange.rand();
	ast.setVelocity(dx, dy);
	return ast;
}

//return a new Asteroid for the ASTEROID mode
function make_asteroids_ast(velRange) {
	let ast = new TestAsteroid();

	let rect = LevelPresets2.asteroid_spawnAreas[randInt(0, 4)];
	let x = randFloat(rect.getX(), rect.getX() + rect.getWidth());
	let y = randFloat(rect.getY(), rect.getY() + rect.getHeight());
	let loc = new Point(x, y);

	const halfWidth = WIDTH/2;
	const halfHeight = HEIGHT/2;
	let target = new Point(
		halfWidth + randFloat(-halfWidth, halfWidth),
		halfHeight + randFloat(-halfHeight, halfHeight));
	let vel = new Point(x, y);
	vel.subPoint(target);
	vel.normalize();
	let spd = velRange.rand();
	vel.mult(-spd);

	ast.setLocation(loc.getX(), loc.getY());
	ast.setVelocityP(vel);
	return ast;
}

//return an arra containing all lines of given text (separated by "\n").
function getLines(input) {
	let lines = new Array();
	let l = "";
	let flag = false;
	let i = 0;

	let count = 0;
	while (!flag && count++ < 1000) {
		if (i < input.length) {
			let c = input[i];
			l += c;
			if (c == "\n") {
				lines.push(l);
				l = "";
			}
			i++;
		} else {
			flag = true;
		}
	}
	if (count >= 1000) { throw new Error("exceeded max"); }
	return lines;
}

//return an array of all points (x, y) contained in a given string, separated by commas.
function getPoints(input) {
	let container = new Str();
	let points = new Array();
	let i = 0;
	while (i < input.length) {
		i = getNextUntil("(", i, input, container)+1;
		i = getNextUntil(",", i, input, container)+1;
		let x = Number(container.getStr());
		i = getNextUntil(")", i, input, container)+1;
		let y = Number(container.getStr());
		points.push(new Point(x, y));
	}
	return points;
}


//return a substring of input, from the given index to the next occurance of the delim.
function getNextUntil(delim, index, input, strObj) {
	let output = "";
	let count = 0;
	const MAX = 10000;
	while (input[index] != delim && index < input.length && count++ < MAX) {
		output += input[index++];
	}
	strObj.setStr(output);
	return index;
}

//return a substring of input, from the given index to the next occurance of \t, \n, or end of string.
function getNextColumn2(index, input, strObj) {
	let output = "";
	let count = 0;
	const MAX = 10000;
	while (input[index] != "\t" && input[index] != "\n" && index < input.length && count++ < MAX) {
		output += input[index++];
	}
	strObj.setStr(output);
	return index;
}





/* Old presets format
const LevelPresets = {
	asteroid_spawnAreas: [
		new Rectangle(-80, -80, WIDTH + 40, 50), //north
		new Rectangle(-80, HEIGHT + 40, WIDTH + 40, 50), //south
		new Rectangle(-80, -80, 50, HEIGHT + 40), //east
		new Rectangle(WIDTH + 40, -80, 50, HEIGHT + 40), //east
	],

	level_01: function() {
		// level
		const levelNum = 1;
		//asteroid
		const a_supplier = function() {
			return make_scroll_ast(new Point(-0.5, 0.5), new Point(2, 5));
		};
		const a_spawnFreqRange = new Point(10, 50); //frequency range to spawn asteroids (frames)
		const a_numPerSpawnRange = new Point(1, 1); //number of asteroids to spawn at each spawn interval
		a_maxNum = -1; //max # of asteroids to spawn for this level. -1 for infinite.
		const asteroidSpawner = new ObjectSpawner(a_supplier, a_spawnFreqRange, a_numPerSpawnRange, a_maxNum);

		//enemy
		const e_supplier = function() { return new TestEnemy(); };
		const e_spawnFreqRange = new Point(1, 1); //frequency range to spawn enemies (frames)
		const e_numPerSpawnRange = new Point(1, 1); //number of enemies to spawn at each spawn interval
		const e_maxNum = 0; //max number of enemies to spawn for this level
		const enemySpawner = new ObjectSpawner(e_supplier, e_spawnFreqRange, e_numPerSpawnRange, e_maxNum);

		const targetScore = 50;
		return new Level(Mode.SCROLLER, levelNum, targetScore, asteroidSpawner, enemySpawner, undefined);
	},

	level_02: function() {
		const levelNum = 2;
		const a_supplier = function() {
			return make_scroll_ast(new Point(-1, 1), new Point(2, 5.5));
		};
		const a_spawnFreqRange = new Point(10, 50); //frequency range to spawn asteroids (frames)
		const a_numPerSpawnRange = new Point(1, 1); //number of asteroids to spawn at each spawn interval
		const a_maxNum = -1; //max number of asteroids to spawn for this level
		const asteroidSpawner = new ObjectSpawner(a_supplier, a_spawnFreqRange, a_numPerSpawnRange, a_maxNum);

		const e_supplier = function() { return new TestEnemy(); };
		const e_spawnFreqRange = new Point(1, 1); //frequency range to spawn enemies (frames)
		const e_numPerSpawnRange = new Point(1, 1); //number of enemies to spawn at each spawn interval
		const e_maxNum = 0; //max number of enemies to spawn for this level
		const enemySpawner = new ObjectSpawner(e_supplier, e_spawnFreqRange, e_numPerSpawnRange, e_maxNum);

		const targetScore = 150;
		return new Level(Mode.SCROLLER, levelNum, targetScore, asteroidSpawner, enemySpawner, undefined);
	},

	level_a00: function() {
		const mode = Mode.ASTEROID;
		const levelNum = undefined;
		let a_supplier = function() {
			return make_asteroids_ast(new Point(1, 3));
		}

		const a_spawnFreqRange = new Point(80, 80); //frequency range to spawn asteroids (frames)
		const a_numPerSpawnRange = new Point(1, 1); //number of asteroids to spawn at each spawn interval
		const a_maxNum = -1; //max number of asteroids to spawn for this level
		const asteroidSpawner = new ObjectSpawner(a_supplier, a_spawnFreqRange, a_numPerSpawnRange, a_maxNum);

		// const e_supplier = function() { return new TestEnemy(); };
		// const e_spawnFreqRange = new Point(10, 20); //frequency range to spawn enemies (frames)
		// const e_numPerSpawnRange = new Point(1, 1); //number of enemies to spawn at each spawn interval
		// const e_maxNum = 0; //max number of enemies to spawn for this level
		// const enemySpawner = new ObjectSpawner(e_supplier, e_spawnFreqRange, e_numPerSpawnRange, e_maxNum);

		const targetScore = 100;
		return new Level(mode, levelNum, targetScore, asteroidSpawner, undefined, undefined);
	},


	// Return a new array of all level presets
	getPresets: function() {
		const CLASS = LevelPresets;
		// return [CLASS.level_01(), CLASS.level_02()];
		return [CLASS.level_01(), CLASS.level_a00(), CLASS.level_02()];
		// return [CLASS.level_a00()];
		// return [CLASS.level_02()];

	}
}
*/
