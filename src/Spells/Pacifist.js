class Frighten extends Spell {
	constructor() {
		super();
	}
}; SPELLS.push(Frighten);
Frighten.prototype = Object.create(Spell);
Frighten.prototype.name = "Frighten";
Frighten.prototype.flavor = "The target is frightened and forced to flee from battle, but only if it has low enough hit points.";
Frighten.prototype.attack = true;
Frighten.prototype.level = 10;
Frighten.prototype.power = 15;
Frighten.prototype.attribute = ATTRIBUTE_INDICES.fear;
Frighten.prototype.hitrate = 1.0;
Frighten.prototype.damageInflection = 0.5;
Frighten.prototype.attackStat = STAT_INDICES.Charisma;
Frighten.prototype.defenseStat = STAT_INDICES.Charisma;
Frighten.prototype.delay = 80;
Frighten.prototype.maxCooldown = 4500;
Frighten.prototype.cooldownStat = STAT_INDICES.Wisdom;
Frighten.prototype.cost = 3;
Frighten.prototype.execute = function(user, target) {
	var dmg = this.getDamage(user, target);
	if (target.hp <= dmg) {
		target.flee();
	} else {
		target.dodge(0);
	}
}