class HealingItem extends Consumable {
	constructor(spec) {
		super();
		this.spec = spec;
		this.power = parseInt(spec);
	}
	execute(user, target) {
		target.heal(this.power, this);
	}
	getDescription() {
		var desc = this.name + " | " + this.spec;
		desc += " <br> Delay: " + this.delay;
		desc += " <br> Restores "+this.power+" hp.";
		desc += " <br>  "+this.flavor;
		return desc;
	}
}

class HealingPotion extends HealingItem {
	constructor(spec) {
		super(spec);
	}
}
ITEMS.push(HealingPotion);
HealingPotion.prototype = Object.create(Consumable);
HealingPotion.prototype.name = "Healing Potion";
HealingPotion.prototype.flavor = "100% generic liquid hit points.";
HealingPotion.prototype.selfOnly = true;
HealingPotion.prototype.delay = 90;

class HealingSyringe extends HealingItem {
	constructor(spec) {
		super(spec);
	}
}
ITEMS.push(HealingSyringe);
HealingSyringe.prototype = Object.create(Consumable);
HealingSyringe.prototype.name = "Healing Syringe";
HealingSyringe.prototype.flavor = "Different liquid hit points in a syringe. Faster and can be used on someone else.";
HealingSyringe.prototype.delay = 75;