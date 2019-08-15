
function MinuteHand(level, user) {
	this.level = level;
	this.power = this.powerMult * this.level;
	this.user = user;
	this.maxCooldown = this.cooldownMult * this.level;
}
MinuteHand.prototype = Object.create(Technique);
MinuteHand.prototype.name = "Minute Hand";
MinuteHand.prototype.flavor = "An extraordinarily fast attack.";
MinuteHand.prototype.attack = true;
MinuteHand.prototype.powerMult = 0.5;
MinuteHand.prototype.attribute = ATTRIBUTE_INDICES.bludgeoning;
MinuteHand.prototype.hitrate = 1.0;
MinuteHand.prototype.attackStat = STAT_INDICES.Strength;
MinuteHand.prototype.usesWeapon = true;
MinuteHand.prototype.defenseStat = STAT_INDICES.Constitution;
MinuteHand.prototype.usesArmor = true;
MinuteHand.prototype.accuracyStat = STAT_INDICES.Dexterity;
MinuteHand.prototype.evasionStat = STAT_INDICES.Agility;
MinuteHand.prototype.delay = 10;
MinuteHand.prototype.cooldownMult = 1800;
MinuteHand.prototype.cooldownStat = STAT_INDICES.Potential;