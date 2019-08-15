function MageArmor(user) {
	
}; SPELLS.push(MageArmor);
MageArmor.prototype = Object.create(Spell);
MageArmor.prototype.name = "Mage Armor";
MageArmor.prototype.flavor = "An invisible field of force that boosts your defense.";
MageArmor.prototype.level = 10;
MageArmor.prototype.attack = false;
MageArmor.prototype.selfOnly = true;
MageArmor.prototype.attribute = ATTRIBUTE_INDICES.Force;
MageArmor.prototype.hitrate = 1.00;
MageArmor.prototype.delay = 120;
MageArmor.prototype.cost = 4;

MageArmor.prototype.effect = function(source) {
	this.source = source;
}
MageArmor.prototype.effect.prototype = Object.create(BasicEffectMagic);
MageArmor.prototype.effect.prototype.target = false;
MageArmor.prototype.effect.prototype.statChanges = statsToArray({
	Armor : +12,
}, 0);
MageArmor.prototype.effect.prototype.duration = 4*HOURS;
MageArmor.prototype.effect.prototype.rate = 1.0;