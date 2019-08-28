var relationshipType = 0;

var companion = {name:"Companion"};

class Companion extends PC {
	constructor() {
		super(10);
	}
}
Companion.prototype = Object.create(PC);
Companion.prototype.description = "Your strong and loyal companion. Will follow you to the ends of the earth.";
Companion.prototype.weaponAttribute = ATTRIBUTE_INDICES.cutting;
Companion.prototype.baseEffectiveness = attributesToArray({
	positive : -1.0
});
Companion.prototype.techniquePoints = 0;
Companion.prototype.techniqueTable = [
	{technique:BasicAttack},
]

function shipswitch(friend, sibling, lover) {
	switch (relationshipType) {
		case 0: return friend; break;
		case 1: return sibling; break;
		case 2: return lover; break;
	}
}