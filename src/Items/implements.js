class Implement extends Equipment {
}
Implement.prototype.slot = SLOT_INDICES.LeftHand;
Implement.prototype.forPlayer = true;
Implement.prototype.forCompanion = false;
Implement.prototype.usableInBattle = true;
Implement.prototype.delay = 90;

class PocutopWand extends Implement {
	
}
ITEMS.push(PocutopWand);
PocutopWand.prototype.name = "Pocutop Wand";
PocutopWand.prototype.flavor = "Wizards's wand crafted traditionally in Pocutop.";
PocutopWand.prototype.statMods = statsToArray({
	Wisdom : +1,
	Strength : -1,
}, 0);