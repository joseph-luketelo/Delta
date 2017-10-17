//updates and renders player
class PlayerSystem extends System {
	constructor(player) {
		super();
		this.player = player;
	}
	update() {
		this.player.update();
	}
	render() {
		this.player.render();
	}
	getPlayer() {
		return this.player();
	}
	setPlayer(p) {
		this.player = p;
	}
}
