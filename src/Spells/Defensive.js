class MageArmor extends Spell {
	constructor() {
		super();
	}
}; SPELLS.push(MageArmor);
MageArmor.prototype = Object.create(Spell);
MageArmor.prototype.name = "Mage Armor";
MageArmor.prototype.flavor = "An invisible field of force that boosts your defense.";
MageArmor.prototype.level = 10;
MageArmor.prototype.attack = false;
MageArmor.prototype.selfOnly = true;
MageArmor.prototype.attribute = ATTRIBUTE_INDICES.force;
MageArmor.prototype.hitrate = 1.00;
MageArmor.prototype.delay = 120;
MageArmor.prototype.cost = 4;

class MageArmorEffect extends Effect {
	constructor(source) {
		super(source);
	}
}
MageArmor.prototype.effect = MageArmorEffect;
MageArmorEffect.prototype.target = false;
MageArmorEffect.prototype.statChanges = statsToArray({
	Armor : +12,
}, 0);
MageArmorEffect.prototype.maxDuration = 4*HOURS;