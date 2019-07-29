var HoblinsDen = {
	__proto__ : Locale,
    name : "Hoblins' Den",
	description : "The lair of the Hoblins.",
	//image : makeImage(),
	music : "Night Stalker",
	x : 62,
	y : 135,
	getPOIs : function() {
		var thisser = this;
		pois = [];
		pois.push(new intoDungeonPOI("Into the Cave", "Enter the cave, where the Hoblins make their lair.", HoblinsDenDungeon, 0, 0, 0, 1));
		return pois;
	},
	firstArriveEvent : function() {
		this.visited = false;
		
		dialog.begin(new DialogLine("Hoblin", null, "Someone there?"),
			new DialogSplit("Player", null, "(What should I do?)",
				new DialogSplitChoice("Ask nicely", HoblinsDen.askNicely),
				new DialogSplitChoice("Threaten", HoblinsDen.threaten),
				new DialogSplitChoice("Just attack")),
			HoblinsDen.beginEntryBattle);
	},
	beginEntryBattle() {
		battle.begin([new Hoblin(13), new HoblinCaptain(18), new Hoblin(12)], "Fantasy Forest Battle", function(){HoblinsDen.arrive();})
	},
	askNicely() {
		dialog.begin(new DialogLine("Player", null, "Could you please release Wilsid, the water wizard?"),
			new DialogLine("Hoblin", null, "Oh, most certainly, fine "+pg("gentleman","lady")+". I am deeply regretful of my hand in his unjust incarceration here in our humble abode. I shall go now and free him from his bonds posthaste, and return him to the charming settlement of Innsport along with my most profound apologies."),
			new DialogLine("Companion", null, "Really? That's be-", 8),
			new DialogLine("Hoblin", null, "Just kidding."),
			new DialogLine("Companion", null, "..."),
			new DialogLine("Hoblin", null, "We're just gonna hold him here until we get the message from the sahuagin."),
			new DialogLine("Player", null, "Sahuagin?"),
			new DialogLine("Hoblin", null, "Enough chitchat. I've told you more enough already. Of course, that doesn't really matter, because we're going to kill you anyway."),
			HoblinsDen.beginEntryBattle);
	},
	threaten() {
		dialog.begin(new DialogLine("Player", null, "Give us back the water wizard or we'll kill you."),
			new DialogLine("Hoblin", null, "Ahaha, good one! The little human thinks "+pg("he","she")+" can take on a camp full of Hoblins all by "+pg("himself","herself")+"!"),
			player.Intelligence > 10 ? new DialogLine("Player", null, "I could just blast you with magic.") : new DialogLine("Companion", null, "Don't forget me!"),
			new DialogLine("Hoblin", null, "Oh no, I'm shaking in my custom human leather boots. Come on!"),
			HoblinsDen.beginEntryBattle);
	}
}

filePrefix = "src/DungeonAssets/HoblinsDen/";
var HoblinsDenDungeon = {
	__proto__ : Dungeon,
	name : "Hoblins Den",
	description : "A cave that is home to the Hoblin tribe.",
	music : "Night Stalker",
	trap1 : false, //Have disabled the trap
	wallImages : [makeImage(filePrefix+"Wall0.png"), makeImage(filePrefix+"Wall1.png")],
	doorImage : makeImage(filePrefix+"Door.png"),
	doorOutImage : makeImage(filePrefix+"DoorOut.png"),
	pressurePlateImage : makeImage(filePrefix+"PressurePlate.png"),
	getPOIs : function(floor, x, y, facing) {
		var thisser = this;
		var pois = [];
		switch(floor+","+x+","+y+","+facing) {
		//Hall 1
			case "0,0,0,1":
				if (this.trap1) {
					pois.push(new BasicDoor(this.doorImage));
					pois.push(new DungeonPOI(300-this.pressurePlateImage.width/2, 400, this.pressurePlateImage, "There's a pressure plate in front of the doorway, connected to a trap. "+companion.name+" has already deactivated it."));
				} else {
					pois.push(new DungeonPOI(300-this.doorImage.width/2, 400-this.doorImage.height, this.doorImage, DOOR_HOVER,
						"As "+companion.name+" is about to head through the door, a blade swings out from the floor.",
						function(){companion.takeDamage(RaidersPath.encounterLevel * 2, false)},
						companion.name+" takes " + (RaidersPath.encounterLevel * 2) + " damage."));
					pois.push(new DungeonPOI(300-this.pressurePlateImage.width/2, 400, this.pressurePlateImage, "There's something strange about the floor here.",
						new DialogLine("Companion", null, "This is just a simple pressure plate. Let me disable it real quick."),
						function(){thisser.trap1 = true; dungeonScreen.doWall();}));
				}
				break;
			case "0,0,0,3": 
				pois.push(new DungeonPOI(300-this.doorOutImage.width/2, 414-this.doorOutImage.height, this.doorOutImage, "The doorway leading outside.", function(){dungeonActive = false; HoblinsDen.arrive();}));
				break;
		//Hall 2
			case "0,1,0,1":
				pois.push(new BasicDoor(this.doorImage));
			case "0,1,0,3":
				pois.push(new BasicDoor(this.doorImage));
		//End Room
			case "0,2,0,3":
				pois.push(new BasicDoor(this.doorImage));
		}
		return pois;
	},
	enterDungeonEvent : function() {
		this.trap1 = false;
		//this.pipePuzzle = new PipePath(PipeLevel1, 150, 100, 300, Flags.departureNE ? function(){dialog.begin("You completed the puzzle again, just for fun. Nothing happens.");}
		//: function(){Flags.departureNE = true; dialog.begin("You hear a definitive click as the last piece is rotated into place, completing the connection. It would seem that the northeastern trial is now complete.");});
	},
	enterRoomEvent : function(floor, x, y) {
		var thisser = this;
		if (floor == 0 && x == 1 && y == 0 && !Flags.hoblinAmbush1) {
			dialog.begin(new DialogLine("Hoblin Captain", null, "Crikey! They managed to disable that trap? They're smarter than they look!"),
				new DialogLine("Companion", null, '"Smart"? All I had to do was pry up a little bit with a crowbar.'),
				new DialogLine("Hoblin", null, "I told you we should've hired the Koblins on that one. They're so much better at traps than we are."),
				new DialogLine("Hoblin Captain", null, "Shut up. We're just gonna have to rearm that thing for the next currentTime they come back, and hope they forget..."),
				new DialogLine("Player", null, "We can hear you, you know."),
				new DialogLine("Hoblin Captain", null, "Well, that doesn't matter, 'cuz we're about to KILL YOU!"),
				function(){
					battle.begin([new HoblinCaptain(18), new Hoblin(16)],
						"Guitar Mayhem", //Boss battle
						function(){
							Flags.hoblinAmbush1 = true;
							engine.playMusic(thisser.music);
							dungeonScreen.doWall();
						})
				});
		}
		if (floor == 0 && x == 2 && y == 0 && !Flags.rescuedWilsid) {
			dialog.begin("As you enter the room, you see a man tied to an odd stake. Also in the room is a large, menacing Hoblin who appears to be the warchief of the den.",
				new DialogLine("Hoblin Warchief", null, "So you're the ones who have been looking for the hostage, eh?"),
				new DialogLine("Player", null, "Yes, and if you'd just give him back-"),
				new DialogLine("Hoblin Warchief", null, "Give him back? As if! Half my men died attacking that town. We're not just going to give back the only thing we have to show for it. No, we're going to go through with the plan."),
				new DialogLine("Player", null, "What plan are you talking about?"),
				new DialogLine("Hoblin Warchief", null, "On behalf of my clan, I made a pact with the Deep Ones to cooperate in pillaging the coastal towns, among... other things."),
				new DialogLine("Hoblin Warchief", null, "Well, that doesn't matter, 'cuz we're about to KILL YOU!"),
				function(){
					battle.begin([new Hoblin(16), new HoblinWarchief(19), new Hoblin(16)],
						"Under Siege",
						function(){
							Flags.rescuedWilsid = true;
							engine.playMusic(thisser.music);
							dungeonScreen.doWall();
							dialog.begin("You freed Wilsid. Now return to Innsport. TODO actually write this dialog"); //TODO dialog
						})
				});
		}
	}
}

Hoblin = function(level) {
	this.name = "Hoblin";
	this.description = "One member of a tribe of brutal humanoids. They ambush travelers, and sometimes raid villages, for food and slaves.";
	this.level = level;
	this.hp = Math.ceil(3*level);
	this.maxhp = this.hp;
	this.Strength = 13;
	this.Constitution = 12;
	this.Intelligence = 7;
	this.Wisdom = 9;
	this.Dexterity = 12;
	this.Agility = 11;
	this.Charisma = 6;
	this.effectiveness = {
		slashing : 1.0,
		piercing : 1.0,
		bludgeoning : 1.0,
		fire : 1.0,
		cold : 1.0,
		electricity : 1.0,
		sonic : 1.0,
		acid : 1.0,
		positive : -1.0,
		negative : 1.0
	};
	this.weaponAttribute = "slashing";
	this.techniques = [BasicAttack, PowerChop];
	this.spells = [];
	this.effects = [];
	this.initComponents();
}
Hoblin.prototype = Object.create(Unit);

HoblinCaptain = function(level) {
	this.name = "Hoblin Captain";
	this.description = "A mid-level leader of a tribe of Hoblins.";
	this.level = level;
	this.hp = Math.ceil(5*level);
	this.maxhp = this.hp;
	this.Strength = 14;
	this.Constitution = 14;
	this.Intelligence = 9;
	this.Wisdom = 10;
	this.Dexterity = 13;
	this.Agility = 12;
	this.Charisma = 8;
	this.effectiveness = {
		slashing : 1.0,
		piercing : 1.0,
		bludgeoning : 1.0,
		fire : 1.0,
		cold : 1.0,
		electricity : 1.0,
		sonic : 1.0,
		acid : 1.0,
		positive : -1.0,
		negative : 1.0
	};
	this.weaponAttribute = "slashing";
	this.techniques = [BasicAttack, PowerChop, Cleave];
	this.spells = [];
	this.effects = [];
	this.initComponents();
}
HoblinCaptain.prototype = Object.create(Unit);

HoblinWarchief = function(level) {
	this.name = "Hoblin Warchief";
	this.description = "The leader of a tribe of Hoblins.";
	this.level = level;
	this.hp = Math.ceil(10*level);
	this.maxhp = this.hp;
	this.Strength = 15;
	this.Constitution = 16;
	this.Intelligence = 11;
	this.Wisdom = 11;
	this.Dexterity = 13;
	this.Agility = 11;
	this.Charisma = 12;
	this.effectiveness = {
		slashing : 1.0,
		piercing : 1.0,
		bludgeoning : 1.0,
		fire : 1.0,
		cold : 1.0,
		electricity : 1.0,
		sonic : 1.0,
		acid : 1.0,
		positive : -1.0,
		negative : 1.0
	};
	this.weaponAttribute = "slashing";
	this.techniques = [BasicAttack, PowerChop, Cleave, QuickStab];
	this.spells = [];
	this.effects = [];
	this.initComponents();
}
HoblinWarchief.prototype = Object.create(Unit);