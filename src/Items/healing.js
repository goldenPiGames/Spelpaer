function HealingPotion(spec) {
	this.spec = spec;
	this.power = parseInt(spec);
	//this.description = "Restores "+this.power+" hp to the user.";
}
ITEMS.push(HealingPotion);
HealingPotion.prototype = Object.create(Consumable);
HealingPotion.prototype.name = "Healing Potion";
HealingPotion.prototype.execute = function(user, target) {
	user.heal(this.power);
}
HealingPotion.prototype.selfOnly = true;
HealingPotion.prototype.delay = 120;
HealingPotion.prototype.flavor = "Restores hp to the user.";

function HealingSyringe(spec) {
	this.spec = spec;
	this.power = parseInt(spec);
	this.description = "Restores "+this.power+" hp to the target."
}
ITEMS.push(HealingSyringe);
HealingSyringe.prototype = Object.create(Consumable);
HealingSyringe.prototype.name = "Healing Shot";
HealingSyringe.prototype.execute = function(user, target) {
	target.heal(this.power);
}
HealingSyringe.prototype.delay = 75;