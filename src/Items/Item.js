const ITEMS = [];

var inventory = [];

class Item {
	constructor() {
		this.description = this.getDescription(); //TODO find some way to do this after
	}
	isAvailable() {
		return this.usableInBattle;
	}
	expend() {
		var dex = inventory.indexOf(this);
		if (dex >= 0)
			inventory.splice(dex, 1);
	}
}
Item.prototype.usableInBattle = false;
Item.prototype.key = false;
Item.prototype.weight = 0;
Item.prototype.worth = 0;
Item.prototype.weight = 0;
Item.prototype.spec = "";