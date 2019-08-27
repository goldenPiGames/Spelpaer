class ArmorPierce extends Technique {
	constructor(level) {
		super(level);
	}
}; TECHNIQUES.push(ArmorPierce);
ArmorPierce.prototype = Object.create(Technique);
ArmorPierce.prototype.name = "Armor Pierce";
ArmorPierce.prototype.flavor = "Stabby stabby.";
ArmorPierce.prototype.attack = true;
ArmorPierce.prototype.powerMult = 0.8;
ArmorPierce.prototype.attribute = ATTRIBUTE_INDICES.piercing;
ArmorPierce.prototype.hitrate = 0.75;
ArmorPierce.prototype.attackStat = STAT_INDICES.Strength;
ArmorPierce.prototype.usesWeapon = true;
ArmorPierce.prototype.defenseStat = STAT_INDICES.Constitution;
ArmorPierce.prototype.usesArmor = 0.5;
ArmorPierce.prototype.accuracyStat = STAT_INDICES.Dexterity;
ArmorPierce.prototype.evasionStat = STAT_INDICES.Agility;
ArmorPierce.prototype.delay = 110;
ArmorPierce.prototype.cooldownMult = 500;
ArmorPierce.prototype.cooldownStat = STAT_INDICES.Intelligence;
ArmorPierce.prototype.prerequisites = [BasicAttack];

class ArmorPierceEffect extends Effect {
	constructor(source) {
		super(source);
	}
}
ArmorPierce.prototype.effect = ArmorPierceEffect;
ArmorPierceEffect.prototype.target = true;
ArmorPierceEffect.prototype.statChangeMults = statsToArray({
	Armor : -1.0,
}, 0);
ArmorPierceEffect.prototype.maxDuration = 300;