class Rectangle extends Point {
	constructor(x, y, w, h) {
		super(x, y);
		this.width = w;
		this.height = h;
	}

	fill(ctx = CTX) {
		ctx.fill(this.getX(), this.getY(), this.width, this.height);
	}

	getWidth() { return this.width; }
	getHeight() { return this.height; }
}
