class Guard extends Technique {
	constructor(level) {
		super(level);
	}
}; TECHNIQUES.push(Guard);
Guard.prototype = Object.create(Technique);
Guard.prototype.name = "Guard";
Guard.prototype.flavor = "The most basic defensive technique.";
Guard.prototype.attack = false;
Guard.prototype.attribute = ATTRIBUTE_INDICES.bludgeoning;
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

class GuardEffect extends Effect {
	constructor(source) {
		super(source);
	}
}
Guard.prototype.effect = GuardEffect;
GuardEffect.prototype.target = true;
GuardEffect.prototype.statChangeMults = statsToArray({
	Armor : +2.0,
}, 0);
GuardEffect.prototype.maxDuration = Guard.prototype.delay;