var Armor = {
	slot : SLOT_INDICES.Armor,	
}
Object.setPrototypeOf(Armor, Equipment);

function PocutopRobe() {
	
}
ITEMS.push(PocutopRobe);
PocutopRobe.prototype = Object.create(Armor);
PocutopRobe.prototype.name = "Pocutop Robe";
PocutopRobe.prototype.flavor = "Wizard's robe crafted traditionally in Pocutop.";
PocutopRobe.prototype.forPlayer = true;
PocutopRobe.prototype.statMods = statsToArray({
	Armor : 5,
}, 0);

function PocutopArmor() {
	
}
ITEMS.push(PocutopArmor);
PocutopArmor.prototype = Object.create(Armor);
PocutopArmor.prototype.name = "Pocutop Armor";
PocutopArmor.prototype.flavor = "Knight's armor crafted traditionally in Pocutop.";
PocutopArmor.prototype.forCompanion = true;
PocutopArmor.prototype.statMods = statsToArray({
	Armor : 10,
}, 0);
PocutopArmor.prototype.attributeResists = attributesToArray({
	fear : 10,
}, 0);

function HideShirt() {
	
}
ITEMS.push(HideShirt);
HideShirt.prototype = Object.create(Armor);
HideShirt.prototype.name = "Hide Shirt";
HideShirt.prototype.flavor = "A crude armor made from animal hide. Gives a rough and savage impression.";
HideShirt.prototype.forCompanion = true;
HideShirt.prototype.statMods = statsToArray({
	Strength : 2,
	Constitution : 1,
	Intelligence : -2,
	Armor : 6,
}, 0);

function MtreacDress() {
	
}
ITEMS.push(MtreacDress);
MtreacDress.prototype = Object.create(Armor);
MtreacDress.prototype.name = "M'treac's Dress";
MtreacDress.prototype.flavor = "M'treac's old thieves' clothes from back when whe was an adventurer.";
MtreacDress.prototype.forPlayer = true;
MtreacDress.prototype.forCompanion = true;
MtreacDress.prototype.statMods = statsToArray({
	Dexterity : 1,
	Agility : 2,
	Charisma : 1,
	Armor : 7,
}, 0);

function PocutopPlate() {
	
}
ITEMS.push(PocutopPlate);
PocutopPlate.prototype = Object.create(Armor);
PocutopPlate.prototype.name = "Pocutop Plate";
PocutopPlate.prototype.flavor = "Extremely tough, yet heavy, armor crafted in Pocutop.";
PocutopPlate.prototype.forCompanion = true;
PocutopPlate.prototype.statMods = statsToArray({
	Dexterity : -1,
	Agility : -2,
	Armor : 23,
}, 0);
ForgettableRobe.prototype.attributeResists = attributesToArray({
	cutting : .2,
	fire : -.2,
	electricity : -.2,
}, 0);

function ForgettableRobe() {
	
}
ITEMS.push(ForgettableRobe);
ForgettableRobe.prototype = Object.create(Armor);
ForgettableRobe.prototype.name = "Forgettable Robe";
ForgettableRobe.prototype.flavor = "For some reason, you can never remember the details of this robe's design after you look away from it.";
ForgettableRobe.prototype.forPlayer = true;
ForgettableRobe.prototype.statMods = statsToArray({
	Dexterity : 1,
	Intelligence : 1,
	Charisma : 1,
	Armor : 9,
}, 0);
ForgettableRobe.prototype.attributeResists = attributesToArray({
	thought : .2,
}, 0);