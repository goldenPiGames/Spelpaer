//const SPELLS = [RayOfFrost, AcidSplash, MagicMissile, MagicMissile2, MagicMissile3, MagicMissile4, MagicMissile5, BurningHands, ShockingGrasp, AcidArrow, ScorchingRay, ScorchingRay2, CureMinor, CureLight, CureModerate, CureSerious, CureCritical, CureExtreme, Channel1, Channel2, Channel3, Channel4, Channel5, InflictLight, InflictModerate, InflictSerious, InflictCritical, InflictExtreme, Favor, Frighten, Distract, MindThrust1, MindThrust2, MindThrust3, MindThrust4, MindThrust5, MindThrust6, ReadStats, ReadEffectiveness, WaterBreathing];
const SPELLS_CHEAP = [RayOfFrost, AcidSplash, ReadStats];
var knownSpells;

SPELLS.forEach(function(sp, index) {
	sp.prototype.index = index;
	sp.prototype.description = sp.prototype.getDescription();
});

function refreshKnownSpells() {
	knownSpells = [];
	SPELLS.forEach(function(item) {
		//console.log(item);
		if (item.prototype.isPreparable())
			knownSpells.push(item);
	});
}

function filterKnown(spellList) {
	var known = [];
	spellList.forEach(function(item) {
		if (item.prototype.isPreparable())
			known.push(item);
	});
	return known;
}

function spellsByStat(stat) {
	if (stat == "All")
		return SPELLS.slice();
	var stuff = [];
	SPELLS.forEach(function(item, index, array) {
		if (item.prototype.getKeyStat() == stat)
			stuff.push(item);
	});
	return stuff;
}

function learnSpell(spel) {
	spel.prototype.known = true;
	if (!spel.prototype.known && spel.prototype.level <= player.level) {
		player.spells.push(new spel(player));
	}
}

function getSpellPoints() {
	var sp = player.Intelligence * 2;
	refreshKnownSpells();
	knownSpells.forEach(function(item, index, array) {
		sp += item.prototype.cost;
	});
	return sp;
}

/*function SpellInstance(spell, user) {
	this.base = spell;
	this.name = this.base.name;
	//this.level = level;
	this.user = user;
	this.cost = this.base.cost;
	this.power = this.base.power;
	this.execute = this.base.execute;
	this.description = this.getDescription();
}
SpellInstance.prototype = Object.create(BattleAction);

SpellInstance.prototype.getDescription = function() {
	var str = "";
	str += this.power;
	return str;
}
SpellInstance.prototype.expend = function() {
	this.cooldown = this.maxCooldown();
}
SpellInstance.prototype.tick = function() {
	
}*/