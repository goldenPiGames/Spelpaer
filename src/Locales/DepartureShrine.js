var DepartureShrine = {
	__proto__ : Locale,
    name : "Departure Shrine",
	description : "An old shrine in the middle of the woods. It stands as the focal point of one of the enchantments protecting Pocutop. Anybody who wishes to complete the Departure Trial from the village must brave the dungeon underneath it, earning this shrine its name.",
	image : makeImage("src/Locales/DepartureShrine.png"), //Blender
	music : "Fuji",
	x : 86,
	y : 369,
	getPOIs : function() {
		var pois = [];
		pois.push(new intoDungeonPOI("Into the Dungeon", "The shrine itself is just one open room, but there's a dungeon that acts as the actual trial grounds underground. Enter the dungeon using the ladder.", DepartureShrineDungeon, 1));
		return pois;
	}
}; LOCALES.push(DepartureShrine);

var DepartureShrineDungeon = {
	__proto__ : Dungeon,
	name : "Departure Shrine",
	description : "A dungeon filled with statues, and the only place one may gain permission to pass through the Departure Gate.",
	music : "Hong Kong Midnight",
	/*ladderImage : makeImage(filePrefix+"LadderOut.png"),
	mapImage : makeImage(filePrefix+"Map.png"),
	tableImage : makeImage(filePrefix+"Table.png"),
	redBookImage : makeImage(filePrefix+"RedBook.png"),
	signImage : makeImage(filePrefix+"DesuSign.png"),
	bookshelfImage : makeImage(filePrefix+"Bookshelf.png"),
	yellowBookImage : makeImage(filePrefix+"YellowBook.png"),
	beastStatueImage : makeImage(filePrefix+"BeastStatue.png"),
	chairImage : makeImage(filePrefix+"Chair.png"),
	priestStatueImage : makeImage(filePrefix+"PriestStatue.png"),
	boxLockedImage : makeImage(filePrefix+"BoxLocked.png"),
	boxOpenImage : makeImage(filePrefix+"BoxOpen.png"),*/
	loadLayout : function() {
		var filePrefix = "src/DungeonAssets/DepartureShrine/";
		var wallWidth = 900;
		var wallSprites = makeSprites(filePrefix+"Walls.png", {
				wall0 : {x:0, y:0, width:900, height:675},
				wall1 : {x:900, y:0, width:900, height:675},
				door : {x:1800, y:0, width:262, height:473},
				ladder : {x:2062, y:8, width:120, height:610},
				sign : {x:1800, y:555, width:50, height:120},
			});
		var mainDoorSprites = makeSprites(filePrefix+"MainDoor.png", {
				closed : {x:0, y:0, width:450, height:472},
				open : {x:450, y:0, width:450, height:472},
				seal : {x:1, y:474, width:105, height:105},
				unseal : {x:107, y:474, width:105, height:105},
			});
		var wallSpritesSE = makeSprites(filePrefix+"SE.png", {
				wallN : {x:0, y:0, width:900, height:675},
				wallE : {x:900, y:0, width:900, height:675},
				wallS : {x:1800, y:0, width:900, height:675},
				wallW : {x:2700, y:0, width:900, height:675},
				maskWhite : {x:3600, y:0, width:45, height:67},
				maskBlack : {x:3600, y:67, width:45, height:67},
			});
		loadEnemies(BeastStatue, PriestStatue);
		return new SquareDungeonLayout([
			/*[//entry
				
			],*/
			[//main basement
				[//column 0
					null,
					[//Library
						new DungeonWall(wallSprites.wall0, [new DungeonScenery(200, 100, makeImage(filePrefix+"Map.png"), "It's a map."),
							new Bookcase(630, 240, 133, 133, [
								[
									new Book(11, 42, "#000D90", "'Entering Dungeons' by Akiti",
										"Dungeons are dangerous and important places, and you should always be careful and well-prepared whenentering them.",
										"And note that in the field of dungeonology, \"dungeon\" doesn't just refer to actual underground areas like the famous Todiro dungeon.",
										"It can also refer to such places as the Purasu palace and the Helide caves.",),
									BOOKCASE_RIGHT,
									new Book(11, 42, "#000D90", "'Maps and Navigation' by Akiti",
										"It's always important to know the layout of a dungeon so you don't get lost.",
										"Most dungeons hould have a map somewhere within them.",),
									new Book(11, 36, "#9D668E", "'Classical Dungeon Layouts' by Akiti",
										"Most classical architectural styles for dungeons across the world have perfectly square rooms, aligned perfectly with the cardinal directions. Isn't that convenient?",
										"Even monsters like Hoblins tend to build square dungeons.",
										"However, some dungeons may have different layouts. Some may be hexagonal, irregular, or even inconsistent.",),
								],
								[
									new Book(11, 42, "#000D90", "'Effective Endurance' by Prexot",
										"Keep in mind that your endurance is essentially on a limit. You cannot operate indefinitely without resting, and resting for 8 hours is a significant time sink.",
										"So the question is, what is your effective endurance? How many, and how powerful, hits can you take before you need to rest or use items? And how can you improve your endurance?",
										"I'm not completely sure, because I still keep changing my mind on how things work.", //TODO update this
										/*"The most obvious thing that impacts your endurance is Vitality. Each point of Vitality increases your maximum hit points by 10.",
										"However, it's not clear-cut whether it's worth investing in Vitality over Constitution or Wisdom.",
										"For this example, let us express endurance in percentages. And let uss also ignore Weapon and Armor.",
										"Suppose you're level 10 and all your stats are 10. You have 100 max HP.",
										"An enemy with 10 Strength hits you with a basic Attack (level 10, power 10). It will deal on average 10 damage (10 power * 10 Strength / 10 Constitution), or 10% of your HP.",
										"Now consider that you can increase either your Vitality or Constitution by 2.",
										"If you intend on healing much, Vitality may not be the best choice.",
										"Also, remember about damage inflection - defenses are more important against attacks with high damage inflection and less important against attacks with low damage inflection.",
										"But don't forget the importance of your offensive stats and actions. Defeating enemies more quickly or inflicting nerfs and status means you get hit less and you take less damage.",*/),
									new Book(11, 43, "#B3B2C9", "'Effective Endurance 2: Healing' by Prexot",
										"All healing spells are ticket spells, so you cannot use them to extend your endurance indefinitely.",
										"So the question is, are healing spells worth it?",
										"But to answer that, we need to talk about HReduce.",
										"HReduce (short for Heal Reduce, abbreviated further as HRE) is a stat that balances out healing.",
										"Unlike other stats, you have very little control over it. Its base value for the you and nearly all enemies is equal to level.",
										"HReduce is used whenever an attack would be absorbed by the defender because of its attribute effectiveness, such as positive on a living creature, negative on an undead, or fire on a fire elemental.",
										"In these instances, the stat that would normally be used for defense is ignored, and HReduce is used instead.",
										"However, damage inflection still applies as normal. Cure spells have a DI of "+CureBase.prototype.damageInflection+".",
										"This means that healing is still fairly effective even if you don't invest heavily in Wisdom, and investing heavinly in Wisdom won't make your healing too overpowered.",
										"Now back to the topic of endurance.",
										"Since cure spells are trivial to use outside of battle, you can think of cure spells to be extentions to your endurance.",
										"Using cure spells makes investing in defenses more important than investing in Vitality.",),
									BOOKCASE_RIGHT,
									difficulty <= 0 ? 
										new Book(11, 42, "#000D90", "'Finding Perfection' by Prexot",
											"Remember that you can do everything.") :
										new Book(11, 42, "#000D90", "'Accepting Imperfection' by Prexot",
											"You cannot do everything, and you can't save everybody. You'll need to accept this.",),
									new Book(39, 11, "#9F9DB2", "'Losing Battles' by Prexot",
										"Losing a battle doesn't always result in a game over.",
										"Don't just refresh or ragequitas soon as you lose, because you never know what'll happen.",),
								]
							])]),
						new DungeonWall(wallSprites.wall1, [new BasicDoor(wallSprites.door, wallWidth/2, 601)]),
						new DungeonWall(wallSprites.wall0, []),
						new DungeonWall(wallSprites.wall1, [new Bookcase(630, 240, 133, 133, [
								[
									
								],
								[
									
								]
							])]),
					],
					null,
				],
				[//column 1
					[//Chest Room
						new DungeonWall(wallSprites.wall0, []),
						new DungeonWall(wallSprites.wall1, []),
						new DungeonWall(wallSprites.wall0, [new BasicDoor(wallSprites.door, wallWidth/2, 601)]),
						new DungeonWall(wallSprites.wall1, []),
					],
					[//Entrance
						new DungeonWall(wallSprites.wall1, [new SealedDoor(mainDoorSprites, wallWidth/2, 600, [
									{widthMult:1/4, heightMult:1/4, cond:()=>getFlag("departureNW")},
									{widthMult:2/4, heightMult:1/4, cond:()=>getFlag("departureN")},
									{widthMult:3/4, heightMult:1/4, cond:()=>getFlag("departureNE")},
									{widthMult:1/4, heightMult:2/4, cond:()=>getFlag("departureSW")},
									{widthMult:2/4, heightMult:2/4, cond:()=>getFlag("departureS")},
									{widthMult:3/4, heightMult:2/4, cond:()=>getFlag("departureSE")},
								]),
							new DungeonScenery(wallWidth-180, 300, wallSprites.sign, "This sign looks informative. Should I check it out?",
								new DialogLine("Sign", null, "This is a sign. Signs contain information. You should read them. Trust me, it'll help you."),
								new DialogLine("Sign", null, "Of course, not everywhere will have as much free information as I'm giving you here, so appreciate it while you can."),
								new DialogLine("Sign", null, "And in the future, be sure to know as much as you can find out."),
								new DialogLine("Sign", null, "For example: this door here has six sigils, and each one will unlock when you complete the appropriate trial in one of the rooms to the right."),
								new DialogLine("Sign", null, "You probably wouldn't have known that if you hadn't read this sign first, right?"))], {entrance:1}),
						new DungeonWall(wallSprites.wall0, [new BasicDoor(wallSprites.door, wallWidth/2, 601)]),
						new DungeonWall(wallSprites.wall1, [new DungeonScenery(wallWidth/2-wallSprites.ladder.width, 0, wallSprites.ladder, "This ladder leads up and out of the dungeon.", ()=>DepartureShrine.arrive())]),
						new DungeonWall(wallSprites.wall0, [new BasicDoor(wallSprites.door, wallWidth/2, 601)]),
					],
					null,
				],
				[//column 2
					[//Beast Statue
						new DungeonWall(wallSprites.wall1, [new CustomDungeonObject(405, 443, BeastStatue.prototype.sprites.normal.width, BeastStatue.prototype.sprites.normal.height, function(cam) {
								if (!getFlag("departureNW")) {
									dialog.begin(new DialogLine("Player", null, "The moment that I enter the room, a red beast-like statue jumps on me."),
										()=>battle.begin(
											[new BeastStatue(13)],
											"Raid",
											()=>{setFlag("departureNW"); cam.returnFromBattle();}
										)
									);
								}
							},
							function(cam) {
								if (!getFlag("departureNW"))
									cam.drawSprite(BeastStatue.prototype.sprites.normal, this.x, this.y);
							})]),
						new DungeonWall(wallSprites.wall0, []),
						new DungeonWall(wallSprites.wall1, [new BasicDoor(wallSprites.door, wallWidth/2, 601)]),
						new DungeonWall(wallSprites.wall0, []),
					],
					[//Hallway 1
						new DungeonWall(wallSprites.wall0, [new BasicDoor(wallSprites.door, wallWidth/2, 601)]),
						new DungeonWall(wallSprites.wall1, [new BasicDoor(wallSprites.door, wallWidth/2, 601)]),
						new DungeonWall(wallSprites.wall0, [new BasicDoor(wallSprites.door, wallWidth/2, 601)]),
						new DungeonWall(wallSprites.wall1, [new BasicDoor(wallSprites.door, wallWidth/2, 601)]),
					],
					[//Trivia room
						new DungeonWall(wallSprites.wall1, [new BasicDoor(wallSprites.door, wallWidth/2, 601)]),
						new DungeonWall(wallSprites.wall0, []),
						new DungeonWall(wallSprites.wall1, []),
						new DungeonWall(wallSprites.wall0, []),
					],
				],
				[//column 3
					[//Undead Room
						new DungeonWall(wallSprites.wall0, []),
						new DungeonWall(wallSprites.wall1, []),
						new DungeonWall(wallSprites.wall0, [new BasicDoor(wallSprites.door, wallWidth/2, 601)]),
						new DungeonWall(wallSprites.wall1, []),
					],
					[//Hallway 2
						new DungeonWall(wallSprites.wall1, [new BasicDoor(wallSprites.door, wallWidth/2, 601)]),
						new DungeonWall(wallSprites.wall0, [new BasicDoor(wallSprites.door, wallWidth/2, 601)]),
						new DungeonWall(wallSprites.wall1, [new BasicDoor(wallSprites.door, wallWidth/2, 601)]),
						new DungeonWall(wallSprites.wall0, [new BasicDoor(wallSprites.door, wallWidth/2, 601)]),
					],
					[//Todoroki room
						new DungeonWall(wallSprites.wall0, [new BasicDoor(wallSprites.door, wallWidth/2, 601)]),
						new DungeonWall(wallSprites.wall1, []),
						new DungeonWall(wallSprites.wall0, []),
						new DungeonWall(wallSprites.wall1, []),
					],
				],
				[//column 4
					[//Pipe Room
						new DungeonWall(wallSprites.wall1, [new PipePath({
								pipeData : [
								[1,0,1,0,1],
								[0,1,1,1,0],
								[1,1,1,0,1],
								[0,1,0,1,0],
								[1,0,0,1,0],
								[1,1,0,1,1],
								],
								entranceSide : 3,
								entrancePosition : 2,
								exitSide : 1,
								exitPosition : 1
							}, wallWidth/4, 150, wallWidth/2, ()=>setFlag("departureNE"))]),
						new DungeonWall(wallSprites.wall0, []),
						new DungeonWall(wallSprites.wall1, [new BasicDoor(wallSprites.door, wallWidth/2, 601)]),
						new DungeonWall(wallSprites.wall0, []),
					],
					[//Hallway 3
						new DungeonWall(wallSprites.wall0, [new BasicDoor(wallSprites.door, wallWidth/2, 601)]),
						new DungeonWall(wallSprites.wall1, []),
						new DungeonWall(wallSprites.wall0, [new BasicDoor(wallSprites.door, wallWidth/2, 601)]),
						new DungeonWall(wallSprites.wall1, [new BasicDoor(wallSprites.door, wallWidth/2, 601)]),
					],
					[//Green statue
						new DungeonWall(wallSpritesSE.wallN, [new BasicDoor(wallSprites.door, wallWidth/2, 601)]),
						new DungeonWall(wallSpritesSE.wallE, [new DungeonScenery(200, 300, wallSpritesSE.maskBlack, "A black mask is hanging on the wall.",
							new DialogLine("Mask", null, "We attack with magic."))]),
						new DungeonWall(wallSpritesSE.wallS, [new CustomDungeonObject(405, 321, PriestStatue.prototype.sprites.normal.width, PriestStatue.prototype.sprites.normal.height, function(cam) {
								if (getFlag("departureSE")) {
									return;
								} else if (!getFlag("departureStatueSpoken")) {
									setFlag("departureStatueSpoken");
									dialog.begin(new DialogLine("Statue", null, "Greetings, aspiring adventurers."),
									new DialogLine("Statue", null, "I am the Priest Statue, and I am to be one of your combat opponents."),
									new DialogLine("Statue", null, getFlag("departureNW") ? "I should warn you, I am much stronger than the Beast Statue you faced earlier." : "I should warn you, I am likely the strongest of the combat opponents you will face in this trial."),
									new DialogLine("Statue", null, "However, I will give you the chance to prepare yourselves to face me."),
									new DialogLine("Statue", null, "Consult the signs in this room and discover my traits and weaknesses."),
									new DialogLine("Statue", null, "Speak to me again when you wish to do battle. I am patient."));
								} else if (this.clicked) {
									dialog.begin(new DialogSplit("Statue", null, "You have returned. Are you ready to do battle?",
										new DialogSplitChoice("Affirm", ()=>battle.begin(
											[new PriestStatue(17)],
											"Seiiki Kessen", //Boss battle
											()=>{setFlag("departureSE"); cam.returnFromBattle();}
										)),
										new DialogSplitChoice("Deny", new DialogLine("Statue", null, "Speak to me again when you wish to do battle. I am patient."))))
								}
							},
							function(cam) {
								if (!getFlag("departureSE"))
									cam.drawSprite(PriestStatue.prototype.sprites.normal, this.x, this.y);
							})]),
						new DungeonWall(wallSpritesSE.wallW, [new DungeonScenery(200, 300, wallSpritesSE.maskWhite, "A white mask is hanging on the wall.",
							new DialogLine("Mask", null, "I fear change. Or, maybe... movement, if you will."))]),
					],
				],
			],
		], -1, -1, -1);
	},
	/*getPOIs : function(floor, x, y, facing) {
		var thisser = this;
		var pois = [];
		switch(floor+","+x+","+y+","+facing) {
		//Entrance Room
			case "-1,0,0,0": pois.push(new DungeonPOI(750, 210, this.signImage, "This sign might say something useful.",
					new DialogLine("Sign", null, "This is a sign. Signs like these contain useful information, usually pertaining to the dungeon in which they are found. Be sure to read them. There's no reason not to; it's not like there are explosive runes... at least not in this dungeon."),
					new DialogLine("Sign", null, "This dungeon contains a quantity of signs much higher than the average."),
					new DialogLine("Sign", null, "Here, you should probably go to the room to the left first, and familiarize yourself with the map.")));
				break;
			case "-1,0,0,1": return [new BasicDoor(this.doorImage)]; break;
			case "-1,0,0,2": return [new DungeonExit(DepartureShrine, this.ladderImage)]; break;
			case "-1,0,0,3": return [new BasicDoor(this.doorImage)]; break;
		//Library
			case "-1,-1,0,0": return [new DungeonPOI(200, 100, this.mapImage, "A map is attached to the wall.",
					new DialogLine("You", null, "This map is rather convenient. Also simple. I should consider memorizing this."),
					new DialogLine("Companion", null, "I'm sure that other du1ngeons in the future won't all be this nice. I'd offer to memorize floor layouts for you, but I'm no good with navigation indoors..."),
					new DialogLine("You", null, "Don't worry about it. Indoors are square and even, so I can easily record them myself on graph paper or similar."),
					new DialogLine("Companion", null, "At least I can keep track of what room we're in and which way we're facing."))]; break;
			case "-1,-1,0,1": return [new BasicDoor(this.doorImage)]; break;
			case "-1,-1,0,2": 
				var bsimg = this.bookshelfImage; var bsx = 250; var bsy = DUNGEON_FLOOR_Y-bsimg.height+25;
				return [new DungeonPOI(bsx, bsy, bsimg, "A large bookshelf stands against the wall.", 
						new DialogLine("Companion", null, "This is quite the collection of books here."),
						new DialogLine("You", null, "Let's check this one out."),
						new DialogLine("You", null, "...Huh. The entire book is completely blank.")),
					new DungeonPOI(bsx+84, bsy+110, this.yellowBookImage, "A large bookshelf stands against the wall...", ShockingGrasp.prototype.known ?
						[new DialogLine("You", null, "This book contains the Shocking Grasp spell, which I've already learned.")]
						: [new DialogLine("You", null, "This is the only yellow book on the entire wall. Now let's see..."),
						new DialogLine("You", null, "It's also the only one that's not blank. It has the details for a spell that I don't know yet."),
						function(){learnSpell(ShockingGrasp); dungeonScreen.doWall()},
						new DialogLine("You", null, "Shocking Grasp has normal accuracy and no special effects of any kind, but it does more damage than Magic Missile" + (BurningHands.prototype.known ? " or Burning Hands." : ".") + " Its damage is electricity, which some enemies might be weak to."),
						player.level >= ShockingGrasp.prototype.level
							? new DialogLine("Companion", null, "That'll be sure to come in handy.")
							: new DialogLine("You", null, "Unfortunately, I'm not yet experienced to actually use it. I should prepare it once I reach Level "+ShockingGrasp.prototype.level+".")]
						)]; break;
			case "-1,-1,0,3": return [new DungeonPOI(216, 417, this.tableImage, "It's a table.", 
					new DialogLine("Companion", null, "This is a nice table."),
					new DialogLine("You", null, "I muse over how it's in such good condition if almost nobody has ever been in here."),),
				new DungeonPOI(345, 424, this.redBookImage, "A red book sits open on the table.",
					new DialogLine("You", null, 'This book is titled "Ability Scores and What They Mean.".'),
					new DialogLine("Book", null, 'There are nine "ability scores", also referred to as "stats": Vitality, Strength, Constitution, Dexterity, Agility, Intelligence, Wisdom, and Charisma.'),
					new DialogLine("Book", null, "Vitality represents life force. Its main use is for maximum hit points. It affects only a few other things, including resistance to poison-based statuses."),
					new DialogLine("Book", null, "Strength represents physical, muscular strength. It is used for most physical attacks (techniques)."),
					new DialogLine("Book", null, "Constitution represents endurance and toughness. It determines defense against most physical attacks. It's also used for the cooldowns of techniques involving physical exertion, such as Power Chop and Cleave."),
					new DialogLine("Book", null, "Dexterity represents hand-eye coordination, aim, and focusing on one thing. It determines the accuracy of most attacks."),
					new DialogLine("Book", null, "Agility represents reflexes, flexibility. and watching out for everything. It determines initial order in battle, and evasion against most attacks. It also cools down some techniques, such as Quick Stab."),
					new DialogLine("Book", null, "Intelligence represents the capacity for abstract thought and learning. It is used for most arcane spells."),
					new DialogLine("Book", null, "Wisdom represents willpower and awareness. It is used for most divine spells, and determines defense against many spells."),
					new DialogLine("Book", null, "Charisma represents force of personality. It is used for attack and defense of  most psionic spells. It's also often used as a secondary ability for divine spells"),
					new DialogLine("Companion", null, "That might be important to remember."))]; break;
		//Hallway 1
			case "-1,1,0,0": return [new BasicDoor(this.doorImage)]; break;
			case "-1,1,0,1": return [new BasicDoor(this.doorImage)]; break;
			case "-1,1,0,2": return [new BasicDoor(this.doorImage)]; break;
			case "-1,1,0,3": return [new BasicDoor(this.doorImage)]; break;
		//NW Trial (Beast)
			case "-1,1,-1,0": return [Flags.departureNW ? new DungeonPOI(412, 330, this.signImage, "A sign showed up after the statue was defeated.", 
					new DialogLine("Sign", null, "If you intend to venture out into unfamiliar places, you must always be prepared for an ambush. Nowhere is this more important than in a dungeon.")) : 
				new DungeonPOI(375, 378, this.beastStatueImage)]; break;
			case "-1,1,-1,2": return [new BasicDoor(this.doorImage)]; break;
		//SW Trial (Quiz)
			case "-1,1,1,0": return [new BasicDoor(this.doorImage)]; break;
			case "-1,1,1,2": return [new DungeonPOI(400, 150, this.signImage, "This sign might tell you more about the chair.",
						new DialogLine("Sign", null, "This is the room of the Southwestern Departure Trial. This is a fairly straightforward quiz. You pass if you get 7 correct, but you fail if you get 3 wrong."),
						new DialogLine("Sign", null, "To begin the trial, sit in the chair. However, you will probably want to study first. You should be able to find all of the information you need by reading the books on the western wall of the library and talking to the people at Pocutop.")),
					Flags.departureSW ? new DungeonPOI(80, 240, this.chairImage, "I've already completed the quiz trial in this chair.",
						new DialogLine("You", null, "It's just a chair now. No need to sit in it again."))
					: new DungeonPOI(80, 240, this.chairImage, "This comfy chair will do something if I sit in it.",
						new DialogLine("You", null, "Alright, I'll try sitting in the chair."),
						new DialogLine("You", this.darknessImage, "Whoa!"),
						new DialogLine("Quiz", this.darknessImage, "Welcome, brave trialgoer, to the Departure Quiz."),
						function(){Quiz.begin(DepartureQuiz, 7, 3, 
							function(){Flags.departureSW = true; dungeonScreen.doWall();
								dialog.begin(new DialogLine("Quiz", this.darknessImage, "You have passed the quiz. The Southwestern Departure Trial is now complete."))}, 
							function(){player.takeDamage(25); dungeonScreen.doWall();})})]; break;
		//Hallway 2
			case "-1,2,0,0": return [new BasicDoor(this.doorImage)]; break;
			case "-1,2,0,2": return [new BasicDoor(this.doorImage)]; break;
			case "-1,2,0,3": return [new BasicDoor(this.doorImage)]; break;
		//NE Trial (Puzzle)
			case "-1,2,-1,0": return [this.pipePuzzle,
							new DungeonPOI(500, 140, this.signImage, "This sign probably explains the puzzle",
								new DialogLine("Sign", null, "As you explore dungeons around the world, you're likely to find a variety of puzzles. Each type of puzzle has very different rules, but you may come across the same type in more than one place."),
								new DialogLine("Sign", null, 'This particular type of puzzle is called "Pipe Path". Click on the pieces to rotate them, and make a path from one terminal to the other.'))]; break;
			case "-1,2,-1,2": return [new BasicDoor(this.doorImage)]; break;
		//SE Trial (Priest)
			//Final Room
			case "-1,0,-1,0": return [Flags.departureMain ? 
				new DungeonPOI(200, 220, this.boxOpenImage, "This box is still here. You collected two tokens from it to complete the Departure Trial.",
					new DialogLine("Companion", null, "There are a bunch of tokens in here. No reason to take any more, though."))
				: new DungeonPOI(200, 270, this.boxLockedImage, "A box sits on the floor of the last room of the dungeon.",
					new DialogLine("You", null, "This looks like our objective. However, there's a lock circle on it just like the ones on the main door."),
					new DialogLine("Companion", null, "How come? We've already completed all four trials."),
					new DialogLine("Behind you", null, "That's because you have one last trial to complete here."),
					function(){dungeonScreen.facing = 2; dungeonScreen.doWall();},
					new DialogLine("Green Statue", null, "You must fight both of us statues at the same currentTime. I hope you're ready."),
					function(){battle.begin(
						[new BeastStatue(9), new PriestStatue(10)], 
						"GuitarMayhem", //Bossfight
						function() {
							Flags.departureMain = true;
							dungeonScreen.facing = 0; 
							dungeonScreen.doWall(); 
							engine.playMusic(thisser.music)
							dialog.begin(new DialogLine("Companion", null, "I think we're finally ready to finish this trial for good now."),
								new DialogLine("Companion", null, "Huh. These are some interesting tokens."),
								new DialogLine("You", null, "They appear to be magical keys of some sort. Let's get back to the village."))
						}
					);})]; break;
			case "-1,0,-1,2": pois.push(new BasicDoor(this.mainDoorImage));
					if (!Flags.departureMain) {
						pois.push(new DungeonPOI(459, 120, this.priestStatueImage, "A familiar, serene green statue stands by the door.",
							new DialogLine("Green Statue", null, "We meet again. As you can probably tell just by looking, you will fight both me and my brother together."),
							new DialogLine("Green Statue", null, "time, however, we are each not quite as strong individually. Since you had the caution to look around when you entered the room, we give you the chance to leave and prepare if you wish.")));
						pois.push(new DungeonPOI(145-this.beastStatueImage.width, 255, this.beastStatueImage, "A familiar, bestial red statue sits by the door.",
							new DialogLine("Red Statue", null, "What are you waiting for? Hurry up and open the box!")));
					}
					break;
		}
		return pois;
	},*/
	enterDungeonEvent : function() {
		/*this.pipePuzzle = new PipePath(PipeLevel1, 150, 100, 300, Flags.departureNE ? function(){dialog.begin("You completed the puzzle again, just for fun. Nothing happens.");}
		: function(){Flags.departureNE = true; dialog.begin("You hear a definitive click as the last piece is rotated into place, completing the connection. It would seem that the northeastern trial is now complete.");});*/
	},
}
DUNGEONS.push(DepartureShrineDungeon);

var DepartureQuiz = GeneralQuiz.concat(
	//new QuizQuestion("How many mini-trials in total must be completed in this dungeon before the main door is unlocked?", ["Zero", "One", "Two", "Three", "Four", "Five", "Six"], 4),
	//new QuizQuestion("Both statues in this dungeon are resistant to which of the following attributes?", ["Fire", "Cold", "Electricity", "Acid"], 0),
	new QuizQuestion("On which floor is this quiz room?", ["1F", "0F", "-1F"], 2),
	new QuizQuestion("What is the X coordinate of this quiz room?", ["-2", "-1", "0", "1", "2"], 3),
	new QuizQuestion("What is the Y coordinate of this quiz room?", ["-2", "-1", "0", "1", "2"], 3),
	//new QuizQuestion("How many total rooms are in this dungeon, including hallways?", ["Six", "Seven", "Eight", "Nine"], 3)
);


class BeastStatue extends Unit {
	chooseAction() {
		var target = this.pickEnemy(oj=>1-oj.hpPortion()+Math.random()*.1);
		return {
			action: !target.findEffect(AnkleBiteEffect) && this.findTechnique(AnkleBite) ||
					//target.findEffect(AnkleBiteEffect) && this.findTechnique(Artery) ||
					battle.membersOfSide(this.team, true) >= 2 && this.findTechnique(PackAttack) ||
					this.findTechnique(BasicAttack),
			target: target
		}
	}
}
BeastStatue.prototype.name = "Beast Statue";
BeastStatue.prototype.description = "A ferocious, bestial statue magically animated from red stone. It aggressively flays all intruders within an inch of their lives.";
BeastStatue.prototype.sprites = makeSprites("src/DungeonAssets/DepartureShrine/BeastStatue.png", { //https://www.houzz.com/product/91073327-howling-wolf-rustic-garden-statues-and-yard-art
	normal : {x:0, y:0, width:103, height:170},
}, false);
BeastStatue.prototype.hpMult = 10.0;
BeastStatue.prototype.statMults = statsToArray({
	Vitality : 1.2,
	Strength : 1.9,
	Constitution : 1.4,
	Dexterity : 1.1,
	Agility : 1.3,
	Intelligence : 0.5,
	Wisdom : 0.8,
	Charisma : 0.9,
	Potential : 0.8,
	Weapon : 0.3,
	Armor : 1.0,
	Implement : 0,
	Resistance : 0.5,
});
BeastStatue.prototype.effectiveness = attributesToArray({
	piercing : 1.15,
	bludgeoning : 0.85,
	fire : 0.7,
	cold : 1.3,
	sonic : 1.3,
}, STANDARD_EFFECTIVENESS_CONSTRUCT);
BeastStatue.prototype.weaponAttribute = ATTRIBUTE_INDICES.bludgeoning;
BeastStatue.prototype.techniqueTable = [
	BasicAttack,
	WildGore,
	AnkleBite,
	PackAttack,
];
BeastStatue.prototype.spellTable = [
	
];

class PriestStatue extends Unit {
	constructor(level) {
		super(level);
	}
	chooseAction() {
		if (!this.chosenArmor && this.firstHitWith) {
			//console.log(this.firstHitBy);
			this.chosenArmor = true;
			if (this.firstHitWith.usesArmor && this.findSpell(MageArmor)) {
				return {action : this.foundAction, target : this};
			}
		}
		if (this.hpPortion() <= .5 && this.findSpell(RepairBase)) {
			return {
				action : this.foundAction,
				target : this
			};
		} else if (!this.readStats && this.findSpell(ReadStats) || !this.readEffectiveness && this.findSpell(ReadEffectiveness)) {
			return {action : this.foundAction, target : player};
		} else {
			let act = this.pickRandomSpell(sp => sp.attack && Math.pow(sp.level, 2));
			return {
				action : act,
				target : this.pickEnemy(nem => (this.readEffectiveness ? nem.getEffectiveness(act.defenseStat) : 1) / (this.readStats ? nem.getStat(act.defenseStat) : 1) * (1 + Math.random()*.1))
			};
		}
	}
}
PriestStatue.prototype.name = "Priest Statue";
PriestStatue.prototype.description = "A serene, humanoid statue magically animated from green stone. Using spells, it wears down all who try to challenge it, unless they know its weaknesses.";
PriestStatue.prototype.sprites = makeSprites("src/DungeonAssets/DepartureShrine/PriestStatue.png", {
	normal : {x:0, y:0, width:81, height:290},
}, false);//DepartureShrineDungeon.priestStatueImage;
PriestStatue.prototype.hpMult = 10.0;
PriestStatue.prototype.statMults = statsToArray({
	Vitality : 0.9,
	Strength : 0.3,
	Constitution : 0.8,
	Dexterity : 0.8,
	Agility : 0.8,
	Intelligence : 1.3,
	Wisdom : 1.4,
	Charisma : 1.2,
	Potential : 0.8,
	Weapon : 0,
	Armor : .7,
	Implement : 0.8,
	Resistance : 1.3,
});
PriestStatue.prototype.effectiveness = attributesToArray({
	piercing : 0.85,
	bludgeoning : 1.15,
	electricity : 1.5,
	acid : 0.5,
}, STANDARD_EFFECTIVENESS_CONSTRUCT);
PriestStatue.prototype.weaponAttribute = ATTRIBUTE_INDICES.bludgeoning;
PriestStatue.prototype.techniqueTable = [
	CastersResort,
];
PriestStatue.prototype.spellTable = [
	MageArmor,
	ReadStats,
	ReadEffectiveness,
	Repair2,
	Repair2,
	Repair1,
	Repair1,
	AcidSplash,
	RayOfFrost,
	MagicMissile2,
	MagicMissile2,
	MagicMissile1,
	MagicMissile1,
	AcidArrow,
	InflictLight,
	InflictLight,
	InflictModerate,
	InflictModerate,
	MindThrust1,
	MindThrust2,
];