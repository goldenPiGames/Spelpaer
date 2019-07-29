var DeepTown = {
	__proto__ : Locale,
    name : "Deep Town",
	description : "The primary settlement of the Deep Ones.",
	//image : makeImage("src/Locales/PiemonteVillage.png"),
	music : "Still of Night",
	x : 13,
	y : 101,
	getPOIs : function() {
		var thisser = this;
		pois = [];
		
		return pois;
	},
	firstArriveEvent : function() {
		this.visited = false;
		
		dialog.begin(new DialogLine("Companion", null, "Oh look there are Deep Ones."), //TODO dialog
			new DialogLine("Deep One", null, "Die, landdwellers!"),
			function(){battle.begin([new DeepInvader(16), new DeepInvader(16)], "WickedDreams", function(){DeepTown.arrive();})});
	},
	population : 100,
	prepareWaterBreathing : true
}

DeepDefender = function(level) {
	this.name = "Deep Defender";
	this.description = "A Deep One that's defending its town underwater.";
	this.level = level;
	this.hp = Math.ceil(5*level);
	this.maxhp = Math.ceil(5*level);
	this.Strength = 13;
	this.Constitution = 16;
	this.Intelligence = 7;
	this.Wisdom = 9;
	this.Dexterity = 9;
	this.Agility = 10;
	this.Charisma = 6;
	this.effectiveness = {
		slashing : 1.0,
		piercing : 1.0,
		bludgeoning : 1.0,
		fire : 1.0,
		cold : .5,
		electricity : 1.5,
		sonic : 1.0,
		acid : 1.0,
		positive : -1.0,
		negative : 1.0
	};
	this.techniques = [BasicAttack, Cleave, QuickStab];
	this.spells = [];
	this.effects = [];
	this.initComponents();
}
DeepDefender.prototype = Object.create(Unit);
DeepDefender.prototype.image = makeImage("src/Enemies/SahuaginAxe.png"); //https://imgur.com/gallery/9HCTSd2