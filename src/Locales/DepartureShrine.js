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
		var wallImages = makeSprites(filePrefix+"walls.png", {
				wall0 : {x: 0, y:0, width:900, height:675},
				wall1 : {x: 900, y:0, width:900, height:675},
				door : {x: 1800, y:0, width:262, height:473},
			});
		mainDoorSprites : makeSprites(filePrefix+"MainDoor.png", {
			Closed : {x:0, y:0, width:300, height:315},
			Open : {x:300, y:0, width:300, height:315},
			Lock : {x:0, y:315, width:70, height:70},
			Unlock : {x:70, y:315, width:70, height:70},
		})
		return new SquareDungeonLayout([
			/*[//entry
				
			],*/
			[//main basement
				[//column 0
					null,
					[//Library
						new DungeonWall(wallImages.wall0, [new DungeonScenery(200, 100, makeImage(filePrefix+"Map.png"), "It's a map.")]),
						new DungeonWall(wallImages.wall1, [new BasicDoor(wallImages.door, wallWidth/2, 601)]),
						new DungeonWall(wallImages.wall0, []),
						new DungeonWall(wallImages.wall1, []),
					],
					null,
				],
				[//column 1
					[//Chest Room
						new DungeonWall(wallImages.wall0, []),
						new DungeonWall(wallImages.wall1, []),
						new DungeonWall(wallImages.wall0, [new BasicDoor(wallImages.door, wallWidth/2, 601)]),
						new DungeonWall(wallImages.wall1, []),
					],
					[//Entrance
						new DungeonWall(wallImages.wall1, [], {entrance:1}),
						new DungeonWall(wallImages.wall0, [new BasicDoor(wallImages.door, wallWidth/2, 601)]),
						new DungeonWall(wallImages.wall1, []),
						new DungeonWall(wallImages.wall0, [new BasicDoor(wallImages.door, wallWidth/2, 601)]),
					],
					null,
				],
				[//column 2
					[//Red Statue
						new DungeonWall(wallImages.wall1, []),
						new DungeonWall(wallImages.wall0, []),
						new DungeonWall(wallImages.wall1, [new BasicDoor(wallImages.door, wallWidth/2, 601)]),
						new DungeonWall(wallImages.wall0, []),
					],
					[//Hallway 1
						new DungeonWall(wallImages.wall0, [new BasicDoor(wallImages.door, wallWidth/2, 601)]),
						new DungeonWall(wallImages.wall1, [new BasicDoor(wallImages.door, wallWidth/2, 601)]),
						new DungeonWall(wallImages.wall0, [new BasicDoor(wallImages.door, wallWidth/2, 601)]),
						new DungeonWall(wallImages.wall1, [new BasicDoor(wallImages.door, wallWidth/2, 601)]),
					],
					[//Trivia room
						new DungeonWall(wallImages.wall1, [new BasicDoor(wallImages.door, wallWidth/2, 601)]),
						new DungeonWall(wallImages.wall0, []),
						new DungeonWall(wallImages.wall1, []),
						new DungeonWall(wallImages.wall0, []),
					],
				],
				[//column 3
					[//Undead Room
						new DungeonWall(wallImages.wall0, []),
						new DungeonWall(wallImages.wall1, []),
						new DungeonWall(wallImages.wall0, [new BasicDoor(wallImages.door, wallWidth/2, 601)]),
						new DungeonWall(wallImages.wall1, []),
					],
					[//Hallway 2
						new DungeonWall(wallImages.wall1, [new BasicDoor(wallImages.door, wallWidth/2, 601)]),
						new DungeonWall(wallImages.wall0, [new BasicDoor(wallImages.door, wallWidth/2, 601)]),
						new DungeonWall(wallImages.wall1, [new BasicDoor(wallImages.door, wallWidth/2, 601)]),
						new DungeonWall(wallImages.wall0, [new BasicDoor(wallImages.door, wallWidth/2, 601)]),
					],
					[//Todoroki room
						new DungeonWall(wallImages.wall0, [new BasicDoor(wallImages.door, wallWidth/2, 601)]),
						new DungeonWall(wallImages.wall1, []),
						new DungeonWall(wallImages.wall0, []),
						new DungeonWall(wallImages.wall1, []),
					],
				],
				[//column 4
					[//Pipe Room
						new DungeonWall(wallImages.wall1, []),
						new DungeonWall(wallImages.wall0, []),
						new DungeonWall(wallImages.wall1, [new BasicDoor(wallImages.door, wallWidth/2, 601)]),
						new DungeonWall(wallImages.wall0, []),
					],
					[//Hallway 3
						new DungeonWall(wallImages.wall0, [new BasicDoor(wallImages.door, wallWidth/2, 601)]),
						new DungeonWall(wallImages.wall1, []),
						new DungeonWall(wallImages.wall0, [new BasicDoor(wallImages.door, wallWidth/2, 601)]),
						new DungeonWall(wallImages.wall1, [new BasicDoor(wallImages.door, wallWidth/2, 601)]),
					],
					[//Green statue
						new DungeonWall(wallImages.wall1, [new BasicDoor(wallImages.door, wallWidth/2, 601)]),
						new DungeonWall(wallImages.wall0, []),
						new DungeonWall(wallImages.wall1, []),
						new DungeonWall(wallImages.wall0, []),
					],
				],
			]
		])
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
				if (Flags.departureNW && Flags.departureSW && Flags.departureNE && Flags.departureSE) {
					pois.push(new BasicDoor(this.mainDoorSprites.Open));
				} else {
					var dur = this.mainDoorSprites.Closed;
					pois.push(new DungeonPOI(DUNGEON_WIDTH/2-dur.width/2, DUNGEON_FLOOR_Y-dur.height, dur, "This large, vermillion door is tightly shut.",
						new DialogLine("You", null, "This is a vermillion double sliding door. Interesting choice of interior design for a dungeon."),
						new DialogLine("You", null, "It's sealed by a strong abjuration from those four magic circles. We'll need to deactivate them all somehow to enter here.")));
					pois.push(Flags.departureNW ?
						new DungeonPOI(295, 199, this.mainDoorSprites.Unlock, "One of four magic circles on the door. It's no longer glowing.",
							new DialogLine("You", null, "This lock circle is inactive. It was deactivated when we defeated the red statue in combat."))
						: new DungeonPOI(295, 199, this.mainDoorSprites.Lock, "One of four magic circles on the door. It's faintly glowing.",
							new DialogLine("You", null, "This type of magic circle is used to lock doors, and it's performing its task admirably. Considering that this is a trial site, I'm certain there's a way to deactivate it somewhere.")));
					pois.push(Flags.departureSW ?
						new DungeonPOI(285, 403, this.mainDoorSprites.Unlock, "One of four magic circles on the door. It's no longer glowing.",
							new DialogLine("You", null, "This lock circle is inactive. It was deactivated when I passed the quiz."))
						: new DungeonPOI(295, 403, this.mainDoorSprites.Lock, "One of four magic circles on the door. It's faintly glowing.",
							new DialogLine("You", null, "This type of magic circle is used to lock doors, and it's performing its task admirably. Considering that this is a trial site, I'm certain there's a way to deactivate it somewhere.")));
					pois.push(Flags.departureNE ?
						new DungeonPOI(499, 199, this.mainDoorSprites.Unlock, "One of four magic circles on the door. It's no longer glowing.",
							new DialogLine("You", null, "This lock circle is inactive. It was deactivated when I solved the Pipe Path puzzle."))
						: new DungeonPOI(499, 199, this.mainDoorSprites.Lock, "One of four magic circles on the door. It's faintly glowing.",
							new DialogLine("You", null, "This type of magic circle is used to lock doors, and it's performing its task admirably. Considering that this is a trial site, I'm certain there's a way to deactivate it somewhere.")));
					pois.push(Flags.departureSE ?
						new DungeonPOI(499, 403, this.mainDoorSprites.Unlock, "One of four magic circles on the door. It's no longer glowing.",
							new DialogLine("You", null, "This lock circle is inactive. It was deactivated when we defeated the green statue in combat."))
						: new DungeonPOI(499, 403, this.mainDoorSprites.Lock, "One of four magic circles on the door. It's faintly glowing.",
							new DialogLine("You", null, "This type of magic circle is used to lock doors, and it's performing its task admirably. Considering that this is a trial site, I'm certain there's a way to deactivate it somewhere.")));
				}
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
			case "-1,2,1,0": return [new BasicDoor(this.doorImage)]; break;
			case "-1,2,1,2": return [Flags.departureSE ? new DungeonPOI(275, 220, this.signImage, "A sign showed up after the statue was defeated.", 
					new DialogLine("Sign", null, "You've done well to defeat me, brave trialgoers. If you intend to stand against powerful foes, you must always look for hints to their weaknesses."))
					: new DungeonPOI(260, 130, this.priestStatueImage, "This priest statue awaits your challenge patiently.",
					new DialogLine("You", null, "We are ready to do battle."),
					new DialogLine("Statue", null, "Very well then. Let me see if you have what it takes."),
					function(){
						battle.begin([new PriestStatue(12)],
							"GuitarMayhem", //Boss battle
							function(){
								Flags.departureSE = true;
								engine.playMusic(thisser.music);
								dungeonScreen.doWall();
							})
					})]; break;
			case "-1,2,1,3": return [new DungeonPOI(500, 140, this.signImage, "This sign probably says something useful.",
					new DialogLine("Sign", null, "I have a particular weakness, but you probably don't yet possess any spell that uses it."),
					new DialogLine("Sign", null, "Fortunately for you, such a spell can be found back in the library of this very dungeon. On the southern wall is a book with a unique color."))]; break;
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
							new DialogLine("Green Statue", null, "This currentTime, however, we are each not quite as strong individually. Since you had the caution to look around when you entered the room, we give you the chance to leave and prepare if you wish.")));
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
	enterRoomEvent : function(floor, x, y) {
		//Beast
		var thisser = this;
		if (floor == -1 && x == 1 && y == -1 && !Flags.departureNW) {
			dialog.begin("As you enter the door, you immediately notice the statue of a ferocious wolf-like beast.",
					"Without any hesitation, it pounces at you in attack.",
					function(){
						battle.begin([new BeastStatue(11)],
							"Guitar Mayhem", //Boss battle
							function(){
								Flags.departureNW = true;
								engine.playMusic(thisser.music);
								dungeonScreen.doWall();
							})
					});
		}
		//Quiz
		/*
		if (floor == -1 && x == 1 && y == 1 && !Flags.departureSW) {
			dialog.begin(new DialogLine("Companion", null, "That's quite a comfortable-looking chair there."),
					new DialogLine("You", null, "Something tells me it might be dangerous to sit in that chair."));
		}
		*/
		//Priest
		if (floor == -1 && x == 2 && y == 1 && !Flags.departureSE) {
			dialog.begin("As you enter the door, you immediately notice the statue of a serene priest-like humanoid.",
					"However, it does not attack you.",
					new DialogLine("Statue", null, "Welcome, trialgoers. You have entered the room of the Southeastern Departure Trial, one of two combat trials you must complete in order to proceed."),
					Flags.departureNW ? new DialogLine("Statue", null, "I sense that you have already prevailed over my red, bestial brother. I should warn you, between the two of us, I am the higher leveled.")
					: new DialogLine("Statue", null, "I sense that you have yet to prevail over my red, bestial brother. I should warn you, he will pounce upon you with claws and fangs the moment you enter his room."),
					new DialogLine("Statue", null, "Unlike him, I offer to you the chance to prepare yourself for our showdown. Search this room and beyond for clues to my weakness."),
					new DialogLine("Statue", null, "When you are ready, speak to me again."));
		}
	}
}

var DepartureQuiz = GeneralQuiz.concat(new QuizQuestion("How many mini-trials in total must be completed in this dungeon before the main door is unlocked?", ["Zero", "One", "Two", "Three", "Four", "Five", "Six"], 4),
new QuizQuestion("Both statues in this dungeon are resistant to which of the following attributes?", ["Fire", "Cold", "Electricity", "Acid"], 0),
new QuizQuestion("On which floor is this quiz room?", ["1F", "0F", "-1F"], 2),
new QuizQuestion("What is the X coordinate of this quiz room?", ["-2", "-1", "0", "1", "2"], 3),
new QuizQuestion("What is the Y coordinate of this quiz room?", ["-2", "-1", "0", "1", "2"], 3),
new QuizQuestion("How many total rooms are in this dungeon, including hallways?", ["Six", "Seven", "Eight", "Nine"], 3));


var BeastStatue = function(level) {
	this.name = "Beast Statue";
	this.description = "A ferocious, bestial statue magically animated from red stone. It aggressively flays all intruders within an inch of their lives."
	this.level = level;
	this.hp =  Math.ceil(10*level);
	this.maxhp = Math.ceil(10*level);
	this.Strength = 16;
	this.Constitution = 14;
	this.Intelligence = 5;
	this.Wisdom = 4;
	this.Dexterity = 8;
	this.Agility = 8;
	this.Charisma = 5;
	this.effectiveness = {
		slashing : 1.0,
		piercing : 1.0,
		bash : 1.0,
		fire : 0.5,
		cold : 2.0,
		electricity : 0.5,
		sonic : 1.0,
		acid : 1.0,
		positive : -0.0,
		negative : 0.0,
		fear : 0
	};
	this.techniques = [
		new BasicAttack(this.level, this),
		new WildGore(this.level, this)
	];
	this.spells = [];
	this.init();
}
BeastStatue.prototype = Object.create(Unit);
BeastStatue.prototype.image = makeImage("src/DungeonAssets/DepartureShrine/BeastStatue.png"); https://www.houzz.com/product/91073327-howling-wolf-rustic-garden-statues-and-yard-art

var PriestStatue = function(level) {
	this.name = "Priest Statue";
	this.description = "A serene, humanoid statue magically animated from green stone. Using spells, it wears down all who try to challenge it, unless they know its weaknesses."
	this.level = level;
	this.Vitality =     Math.floor(level*1.0);
	this.Strength =     Math.floor(level*0.7);
	this.Constitution = Math.floor(level*0.7);
	this.Dexterity =    Math.floor(level*0.8);
	this.Agility =      Math.floor(level*0.8);
	this.Intelligence = Math.floor(level*1.4);
	this.Wisdom =       Math.floor(level*1.4);
	this.Charisma =     Math.floor(level*1.4);
	this.Potential =    Math.floor(level*0.8);
	this.Weapon = 0;
	this.Armor =        Math.floor(level*1.0);
	this.maxhp = this.Vitality*10;
	this.hp = this.maxhp;
	this.effectiveness = {
		piercing : 0.5,
		fire : 0.5,
		electricity : 2.0,
		acid : 0.5,
		positive : 0.0,
		negative : 0.0,
		repair : -1.0,
		fear : 0,
	};
	this.techniques = [
		new BasicAttack(this.level, this),
		new StunningFist(this.level, this),
	];
	this.spells = [
		new AcidSplash(this), 
		new AcidSplash(this), 
		new AcidSplash(this), 
		new BurningHands(this), 
		new BurningHands(this), 
		new RepairLight(this), 
		new RepairLight(this), 
		new RepairLight(this), 
		new RepairLight(this), 
		new InflictLight(this), 
		new InflictLight(this)
	];
	this.init();
}
PriestStatue.prototype = Object.create(Unit);
PriestStatue.prototype.image = DepartureShrineDungeon.priestStatueImage;

PriestStatue.prototype.chooseAction = function(bat) {
	var skill = randomTerm(this.spells);
	if (skill == null)
		skill = randomTerm(this.techniques);
	var target = (Math.random() < .6) ? companion : player;
	if (skill.attribute == "positive") {
		if (this.hpPortion() > .75)
			skill = skill = randomTerm(this.techniques);
		else
			target = this;
	}
	return new Action(skill, target);
}