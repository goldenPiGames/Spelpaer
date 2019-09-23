class Armor extends Equipment {
	
}
Armor.prototype.slot = SLOT_INDICES.Armor;

class PocutopRobe extends Armor {
	
}
ITEMS.push(PocutopRobe);
PocutopRobe.prototype.name = "Pocutop Robe";
PocutopRobe.prototype.flavor = "Wizard's robe crafted traditionally in Pocutop.";
PocutopRobe.prototype.forPlayer = true;
PocutopRobe.prototype.statMods = statsToArray({
	Armor : +6,
	Resistance : +8,
}, 0);

class PocutopArmor extends Armor {
	
}
ITEMS.push(PocutopArmor);
PocutopArmor.prototype.name = "Pocutop Armor";
PocutopArmor.prototype.flavor = "Knight's armor crafted traditionally in Pocutop.";
PocutopArmor.prototype.forCompanion = true;
PocutopArmor.prototype.statMods = statsToArray({
	Armor : +8,
	Resistance : +4,
}, 0);
PocutopArmor.prototype.attributeResists = attributesToArray({
	fear : +10,
}, 0);

class HideShirt extends Armor {
	
}
ITEMS.push(HideShirt);
HideShirt.prototype.name = "Hide Shirt";
HideShirt.prototype.flavor = "A crude armor made from animal hide. Gives a rough and savage impression.";
HideShirt.prototype.forCompanion = true;
HideShirt.prototype.statMods = statsToArray({
	Strength : +2,
	Constitution : +1,
	Intelligence : -2,
	Armor : +7,
	Resistance : +5,
}, 0);

class MtreacDress extends Armor {
	
}
ITEMS.push(MtreacDress);
MtreacDress.prototype.name = "M'treac's Dress";
MtreacDress.prototype.flavor = "M'treac's old thieves' clothes from back when whe was an adventurer.";
MtreacDress.prototype.forPlayer = true;
MtreacDress.prototype.forCompanion = true;
MtreacDress.prototype.statMods = statsToArray({
	Dexterity : 1,
	Agility : 2,
	Charisma : 1,
	Armor : 7,
	Resistance : 8,
}, 0);

class PocutopPlate extends Armor {
	
}
ITEMS.push(PocutopPlate);
PocutopPlate.prototype.name = "Pocutop Plate";
PocutopPlate.prototype.flavor = "Extremely tough, yet heavy, armor crafted in Pocutop.";
PocutopPlate.prototype.forCompanion = true;
PocutopPlate.prototype.statMods = statsToArray({
	Dexterity : -2,
	Agility : -3,
	Armor : 20,
	Resistance : 7,
}, 0);
PocutopPlate.prototype.attributeResists = attributesToArray({
	cutting : 4,
	fire : -4,
	electricity : -4,
}, 0);

class ForgettableRobe extends Armor {
	
}
ITEMS.push(ForgettableRobe);
ForgettableRobe.prototype.name = "Forgettable Robe";
ForgettableRobe.prototype.flavor = "For some reason, you can never remember the details of this robe's design after you look away from it.";
ForgettableRobe.prototype.forPlayer = true;
ForgettableRobe.prototype.statMods = statsToArray({
	Dexterity : 1,
	Agility : 1,
	Charisma : 1,
	Armor : 4,
	Resistance : 12,
}, 0);
ForgettableRobe.prototype.attributeResists = attributesToArray({
	thought : 5,
}, 0);
