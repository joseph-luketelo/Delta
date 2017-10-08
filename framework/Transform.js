class Transform {
	constructor(x = 0, y = 0) {
		this.location = new Point(x, y);
		this.rotation = 0;
	}
	getLocation() {
		return this.location;
	}
	setLocation(x, y) {
		this.location.set(x, y);
	}
	setLocationPoint(point) {
		this.location.setPoint(point);
	}
	getX() {
		return this.location.getX();
	}
	getY() {
		return this.location.getY();
	}
	setX(x) {
		this.location.setX(x);
	}
	setY(y) {
		this.location.setX(y);
	}
	getRotation() {
		return this.rotation;
	}
	setRotation(r) {
		this.rotation = r;
	}
}
