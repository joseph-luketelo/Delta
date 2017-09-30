/*
	2D Point containing x and y coordinates.
*/
class Point {
	constructor(x = 0, y = 0) {
		this.x = x;
		this.y = y;
	}
	getX() {
		return this.x;
	}
	getY() {
		return this.y;
	}
	setX(x) {
		this.x = x;
	}
	setY() {
		this.y = y;
	}
	set(x, y) {
		this.x = x;
		this.y = y;
	}
	add(x, y) {
		this.x += x;
		this.y += y;
	}
	addPoint(point) {
		this.x += point.getX();
		this.y += point.getY();
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
		let lengthSquared = (this.x*this.x) + (this.y*this.y);
		if (lengthSquared > max*max && lengthSquared > 0) {
			let ratio = max / Math.sqrt(lengthSquared);
			this.mult(ratio);
		}
	}

	normalize() {
		let mag = this.magnitude();
		if (mag > 0) {
			this.x /= mag;
			this.y /= mag;
		} else if (mag == 0) {
		} else {
			//TODO throw error
		}
	}
	clear() {
		this.x = 0;
		this.y = 0;
	}

}
