var Bling = {
	slot : SLOT_INDICES.Bling,
	forPlayer : true,
	forCompanion : true,
}
Object.setPrototypeOf(Bling, Equipment);

function PocutopNecklace() {
	
}
ITEMS.push(PocutopNecklace);
PocutopNecklace.prototype = Object.create(Weapon);
PocutopNecklace.prototype.name = "Pocutop Necklace";
PocutopNecklace.prototype.flavor = "Simple piece of jewelry crafted traditionally in Pocutop.";
PocutopNecklace.prototype.statMods = statsToArray({
	Potential : +1,
}, 0);

function TuskNecklace() {
	
}
ITEMS.push(TuskNecklace);
TuskNecklace.prototype = Object.create(Weapon);
TuskNecklace.prototype.name = "Tusk Necklace";
TuskNecklace.prototype.flavor = "Simple necklace that's little more than an animal tusk with a string through it.";
TuskNecklace.prototype.statMods = statsToArray({
	Strength : +1,
	Intelligence : -1,
}, 0);

