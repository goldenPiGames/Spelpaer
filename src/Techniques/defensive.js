function Guard(level, user) {
	this.level = level;
	this.user = user;
}; TECHNIQUES.push(Guard);
Guard.prototype = Object.create(Technique);
Guard.prototype.name = "Guard";
Guard.prototype.flavor = "The most basic defensive technique.";
Guard.prototype.attack = false;
Guard.prototype.hitrate = 1.00;
Guard.prototype.accuracyStat = STAT_INDICES.Dexterity;
Guard.prototype.evasionStat = STAT_INDICES.Agility;
Guard.prototype.delay = 120;
//Guard.prototype.cooldownMult = 0;
//Guard.prototype.cooldownStat = STAT_INDICES.Dexterity;
Guard.prototype.isAvailable = function() {
	return true;
},
Guard.prototype.cooldownPortion = function() {
	return 1.0;
},
Guard.prototype.prerequisites = [];

Guard.prototype.effect = function(source) {
	this.source = source;
}
Guard.prototype.effect.prototype = Object.create(BasicEffectPhysic);
Guard.prototype.effect.prototype.target = true;
Guard.prototype.effect.prototype.statChangeMults = statsToArray({
	Armor : +2.0,
}, 0);
Guard.prototype.effect.prototype.duration = Guard.prototype.delay;
Guard.prototype.effect.prototype.rate = 1.0;