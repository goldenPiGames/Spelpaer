var Innsport = {
	__proto__ : Locale,
    name : "Innsport",
	description : "A seaside village protected by two wizards.",
	image : makeImage("src/Locales/PiemonteVillage.png"),
	music : "Still of Night",
	x : 31,
	y : 132,
	getPOIs : function() {
		var thisser = this;
		pois = [];
		pois.push(new BasicPOI("Stay", "Enjoy the hospitality of the village.",
			new DialogLine("Lizorn", null, "Feel free to stay here."),
			longRest));
		if (!Flags.rescuedWilsid) {
			pois.push(new BasicPOI("Lizorn", "A very worried earth sorceress.",
				new DialogLine("Lizorn", null, "Just under ten years ago, the frequency and severity of monster attacks drastically increased. We've been attacked by monsters from both the land and the sea."),
				new DialogLine("Lizorn", null, "Up until recently, this village was safeguarded by me and my husband. I warded the earth and Wilsid warded the sea."),
				new DialogLine("Lizorn", null, "Just a few days ago, we were attacked at once by Deep Ones and Hoblins. We drove them off, but the Hoblins captured Wilsid. They left through an unmarked path to the east."),
				RaidersPath,
				new DialogLine("Lizorn", null, "Please, rescue him. I'd go myself, but I can't leave the village unguarded."),));
		} else if (!WaterBreathing.known) {
			pois.push(new BasicPOI("Lizorn & Wilsid", "An earth sorceress and water wizard who guard Innsport from invasions and natural disasters.",
				new DialogLine("Wilsid", null, "Honey, I'm home!"),
				new DialogLine("Lizorn", null, "My husband is back, now I must finish writing this dialog TODO dialog"),
				new DialogLine("Wilsid", null, "Here, take this Water Breathing spell. You'll need it in order to visit the Deep Ones' lair."),
				WaterBreathing,
				OceanDescent));
		}
		pois.push({__proto__ : Shop,
			name : "Bookstore",
			description : "A small shop that sells books, although the only ones you care about are spells.",
			image : null,
			Locale : thisser,
			getItems : function() {
				var items = [];
				items.push(AcidArrow);
				items.push(MagicMissile2);
				return items;
			}});
		return pois;
	},
	firstArriveEvent : function() {
		this.visited = false;
		
		dialog.begin(new DialogLine("Companion", null, "Look at the wall. It looks like two things are trying to climb over it."),
			new DialogLine("Deep One", null, "Gurk"),
			function(){battle.begin([new DeepInvader(16), new DeepInvader(16)], "WickedDreams", function(){Innsport.arrive();})});
	},
	population : 150,
	prepareWaterBreathing : true
}

DeepInvader = function(level) {
	this.name = "Deep Invader";
	this.description = "A Deep One that's trying to invade Innsport.";
	this.level = level;
	this.hp = Math.ceil(5*level);
	this.maxhp = Math.ceil(5*level);
	this.Strength = 16;
	this.Constitution = 13;
	this.Intelligence = 7;
	this.Wisdom = 9;
	this.Dexterity = 9;
	this.Agility = 13;
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
DeepInvader.prototype = Object.create(Unit);
DeepInvader.prototype.image = makeImage("src/Enemies/SahuaginAxe.png"); //https://imgur.com/gallery/9HCTSd2*
0