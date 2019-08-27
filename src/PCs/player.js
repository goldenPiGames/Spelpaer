var player = {name:"Player"}

class Player extends PC {
	constructor() {
		super(10);
	}
	getAttack() {
		return this.equipped[SLOT_INDICES.RightHand].attack || this.techniques[0];
	}
}
Player.prototype.description = "Your avatar. Primary spellcaster.";
Player.prototype.weaponAttribute = ATTRIBUTE_INDICES.bludgeoning;
Player.prototype.baseEffectiveness = attributesToArray({
	positive : -1.0
});
Player.prototype.techniqueTable = [
	{technique:BasicAttack, levelMult:0.5},
]

/*Player.prototype.setDisplay = function(x, y, width = 150, height = 100) {
	this.selectionButton = new Button(x, y, width, height, "");
	this.nameLabel = new Label(x, y+2, width, 18, this.name, this.description, this.color);
	this.levelLabel = new Label(x, y+20, width, 14, "Lv "+this.level, this.toNextLevel() + " experience to the next level. This is the maximum level of spell you can prepare and cast.");
	this.hpLabel = new Label(x, y+33, width, 14, this.hp+"/"+this.maxhp, "If this reaches 0, you die, and that's a Game Over, obviously.");
	this.imageHolder = new ImageHolder(x+width/2, y);
	this.components = [this.selectionButton, this.nameLabel, this.levelLabel, this.hpLabel];
}*/
