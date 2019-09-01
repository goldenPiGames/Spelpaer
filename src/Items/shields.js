class Shield extends Equipment {
	
}
Shield.prototype.slot = SLOT_INDICES.LeftHand;
Shield.prototype.forPlayer = false;
Shield.prototype.forCompanion = true;
Shield.prototype.usableInBattle = true;
Shield.prototype.delay = 150;

class PocutopShield extends Shield {
	
}
ITEMS.push(PocutopShield);
PocutopShield.prototype = Object.create(Shield);
PocutopShield.prototype.name = "Pocutop Shield";
PocutopShield.prototype.flavor = "Knight's shield crafted traditionally in Pocutop.";
PocutopShield.prototype.statMods = statsToArray({
	Armor : 5,
}, 0);