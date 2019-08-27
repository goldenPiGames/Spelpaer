class Desperation extends Technique {
	constructor(level) {
		super(level);
	}
}; TECHNIQUES.push(Desperation);
Desperation.prototype = Object.create(Technique);
Desperation.prototype.name = "Desperation";
Desperation.prototype.flavor = "Stat changes increase at lower HP.";
Desperation.prototype.selfOnly = true;
Desperation.prototype.attack = false;
Desperation.prototype.attribute = ATTRIBUTE_INDICES.fear;
Desperation.prototype.hitrate = true;
//Desperation.prototype.accuracyStat = STAT_INDICES.Dexterity;
//Desperation.prototype.evasionStat = STAT_INDICES.Agility;
Desperation.prototype.delay = 75;
Desperation.prototype.cooldownMult = 2600;
Desperation.prototype.cooldownStat = STAT_INDICES.Wisdom;
Desperation.prototype.prerequisites = [];

class DesperationEffect extends Effect {
	constructor(source) {
		super(source);
	}
	effectOnStat(stat, holder) {
		return super.effectOnStat(stat) * (1-holder.hpPortion());
	}
}
Desperation.prototype.effect = DesperationEffect;
DesperationEffect.prototype.target = false;
DesperationEffect.prototype.maxDuration = 900;
DesperationEffect.prototype.statChangeMults = statsToArray({
	Strength : +1.5,
	Agility : +1.0,
	Wisdom : -1.0,
}, 0);