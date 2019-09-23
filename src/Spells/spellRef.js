const SPELLS_BY_NAME = {};

var knownSpells;

SPELLS.forEach(function(sp, index) {
	SPELLS_BY_NAME[sp.name] = sp;
	sp.prototype.iname = sp.name;
	sp.prototype.index = index;
	if (typeof sp.prototype.attack != "boolean")
		sp.prototype.attack = sp.prototype.power > 0 && sp.prototype.attribute != ATTRIBUTE_INDICES.positive && sp.prototype.attribute != ATTRIBUTE_INDICES.repair;
	if (typeof sp.prototype.attribute != "number")
		throw sp.name+"'s attribute is not valid.";
});

function refreshSpellDescriptions(user) {
	SPELLS.forEach(function(sp, index) {
		sp.prototype.description = sp.prototype.getDescription(user);
	});
}

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
	if (!spel.prototype.known) {
		//TODO
	}
	if (spel.level > player.level) {
		//TODO
	}
	spel.prototype.known = true;
}

function getSpellPoints() {
	refreshKnownSpells();
	var sp = player.level + knownSpells.length;
	/*knownSpells.forEach(function(item, index, array) {
		sp += item.prototype.cost;
	});*/
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