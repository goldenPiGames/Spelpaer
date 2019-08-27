var Implement = {
	slot : SLOT_INDICES.LeftHand,
	forPlayer : true,
	forCompanion : false,
	usableInBattle : true,
	delay : 90,
}
Object.setPrototypeOf(Implement, Equipment);

function PocutopWand() {
	
}
ITEMS.push(PocutopWand);
PocutopWand.prototype = Object.create(Implement);
PocutopWand.prototype.name = "Pocutop Wand";
PocutopWand.prototype.flavor = "Wizards's wand crafted traditionally in Pocutop.";
PocutopWand.prototype.statMods = statsToArray({
	//Implement : 10,
}, 0);