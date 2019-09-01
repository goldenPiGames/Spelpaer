class Bling extends Equipment {
	
}
Bling.prototype.slot = SLOT_INDICES.Bling;
Bling.prototype.forPlayer = true;
Bling.prototype.forCompanion = true;

class PocutopNecklace extends Bling {
	
}
ITEMS.push(PocutopNecklace);
PocutopNecklace.prototype.name = "Pocutop Necklace";
PocutopNecklace.prototype.flavor = "Simple piece of jewelry crafted traditionally in Pocutop.";
PocutopNecklace.prototype.statMods = statsToArray({
	Potential : +1,
}, 0);
PocutopNecklace.prototype.attributeResists = statsToArray({
	Fear : +20,
}, 0);

class TuskNecklace extends Bling {
	
}
ITEMS.push(TuskNecklace);
TuskNecklace.prototype.name = "Tusk Necklace";
TuskNecklace.prototype.flavor = "Simple necklace that's little more than an animal tusk with a string through it.";
TuskNecklace.prototype.statMods = statsToArray({
	Strength : +1,
	Intelligence : -1,
}, 0);

