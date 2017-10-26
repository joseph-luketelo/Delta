class Point {
	constructor(x = 0, y = 0) {
		this.x = x;
		this.y = y;
	}
	getX() { return this.x; }
	getY() { return this.y; }
	setX(x) { this.x = x; }
	setY(y) { this.y = y; }
	
	set(x, y) {
		this.x = x;
		this.y = y;
	}
	setPoint(p) {
		this.x = p.getX();
		this.y = p.getY();
	}
	add(x, y) {
		this.x += x;
		this.y += y;
	}
	addPoint(p) {
		this.x += p.getX();
		this.y += p.getY();
	}
	mult(factor) {
		this.x *= factor;
		this.y *= factor;
	}
	magnitude() {
		return Math.sqrt((this.x * this.x) + (this.y * this.y));
	}

	//cap max magnitude value
	capMax(max) {
		let lengthSquared = (x*x) + (y*y);
		if (lengthSquared > max*max && lengthSquared > 0) {
			let ratio = max / Math.sqrt(lengthSquared);
			this.mult(ratio);
		}
	}

	normalize() {
		let mag = magnitude();
		if (mag > 0) {
			x /= mag;
			y /= mag;
		} else if (mag == 0) {
		} else {
			//TODO throw error
		}
	}

	//use this point as a range, and return a random value within the range, x: min, y: max
	rand() {
		return Math.random() * (this.y - this.x) + this.x;
	}

	//akn: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
	randInt() {
		// [min, max)
		const min = Math.ceil(this.x);
		const max = Math.floor(this.y);
		return Math.floor(Math.random() * (max - min)) + min;
	}

	static randPoint() { //return a random point between 0 and 1
		const x = Math.random();
		const y = Math.random();
		return new Point(x, y);
	}
}
