var player = {name:"Player"}

function Player() {
	this.team = true;
	this.description = "You, the Player. Primary spellcaster.";
	this.techniques = [
		new BasicAttack(5, this)
	];
	this.spells = [];
	this.init();
}
Player.prototype = Object.create(PC);
Player.prototype.weaponAttribute = "bludgeoning";
Player.prototype.baseEffectiveness = elementsToArray({
	positive : -1.0
});

Player.prototype.getAttack = function() {
	return this.techniques[0];
}

Player.prototype.makeComponents = function(x, y, width = 150, height = 100) {
	this.selectionButton = new Button(x, y, width, height, "");
	this.nameLabel = new Label(x, y+2, width, 18, this.name, this.description, PLAYER_COLOR);
	this.levelLabel = new Label(x, y+20, width, 14, "Lv "+this.level, this.toNextLevel() + " experience to the next level. This is the maximum level of spell you can prepare and cast, and also determines maximum hit points.");
	this.hpLabel = new Label(x, y+33, width, 14, this.hp+"/"+this.maxhp, "If this reaches 0, you die, and that's a Game Over, obviously.");
	this.imageHolder = new ImageHolder(x+width/2, y);
	this.components = [this.selectionButton, this.nameLabel, this.levelLabel, this.hpLabel];
}
