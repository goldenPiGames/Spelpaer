var Pocutop = {
	__proto__ : Locale,
    name : "Pocutop",
	description : "An idyllic, isolationist village. A dimensional barrier stands between it and the outside world.",
	//image : makeImage("src/Locales/Pocutop.png"), //Blender
	music : "Nostalgic 2",
	x : 64,
	y : 361,
	getPOIs : function() {
		pois = [];
		//pois.push(new intoDungeonPOI("Dungeon Entrance", "This is a magical and non-canon entrance to the dungeon of Departure Shrine because I don't want to go through the trouble of trekking through Inceptive Trail every currentTime I test the dungeon system.", DepartureShrineDungeon, -1, 0, 0, 0)); //DEBUG remove this
		if (!Flags.beginningTalkToClaire) {
			return [PocutopObservatory];
		}
		pois.push(PocutopHome),
		pois.push(PocutopObservatory);
		if (!Flags.beginningFightManzMarcel) {
			if (currentTime >= 8*HOURS) {
			pois.push(
				new BasicPOI("Battlefield", "Manz and Marcel don't want to let us leave until we've experienced combat with them.",
					new DialogLine("Manz", CHAR_SPRITES.Manz.DialogNormal, "So, you're ready to begin?"),
					new DialogLine("Player", null, "I confirm and ready myself. <Companion> does the same."),
					new DialogLine("Marcel", CHAR_SPRITES.Marcel.DialogNormal, "I don't want to hurt you, but... you need to know how what it's like to fight."),
					function(){battle.begin([new Manz(12), new Marcel(12)], "BattleField 2", afterFightManzMarcel, afterFightManzMarcel); battle.beginTutorial()}));
			}
		} else if (!Flags.departureFinished) { //Before completing the trial
			pois.push(new BasicPOI("Professor Manz", "My arcane instructor. A sharp and practical man. An old friend of Marcel.",
				new DialogLine("Manz", this.ManzNormal, "Be considerate of how you prepare your spells. You only get a limited number of points every day, which is determined mostly by three things."),
				new DialogLine("Manz", this.ManzNormal, "First of all, you get a number of points equal to the total cost of all the spells you know. This means that if you want to, you can always prepare every spell you know at least once, if you so desire."),
				new DialogLine("Manz", this.ManzNormal, "This also means that you should always try to get your hands on a new spell, even if you never intend on using it."),
				new DialogLine("Manz", this.ManzNormal, "Secondly, you get additional points directly proportional to your level."),
				new DialogLine("Manz", this.ManzNormal, "Lastly, that amount is multiplied by an amount based on how well you slept. For example, camping in a tent gives only 80% of your normal spell points, but sleeping in your house gives 100%."),
				new DialogLine("Manz", this.ManzNormal, "If you are not sure what to prepare on any given day, Magic Missile and Cure Light are always good, general purpose spells. Magic Missile never misses and deals force damage, to which nearly nothing is resistant. Cure Light is simple and efficient healing."),
				new DialogLine("Manz", this.ManzNormal, "Of course, if you know the weaknesses and resistances of an upcoming opponent, you should prepare the proper spells. I believe that both of the combat opponents in the shrine are immune to fear and resistant to fire. One is weak to cold, and the other is weak to something else, but I don't remember what.")));
			if (Flags.departureMain) {
				pois.push(new BasicPOI("Father Poslo", "Your divine instructor. Speak to him to complete the Departure Trial.", departureCeremony));
			} else {
				pois.push(new BasicPOI("Father Poslo", "Your divine instructor. A gentle soul who teaches the healing arts to any who will learn them.",
					new DialogLine("Poslo", null, "Tell me, do you know how healing spells work?"),
					new DialogLine("You", null, "Because they channel Positive energy, which is the internal power of all animal life."),
					new DialogLine("Poslo", null, "That's correct. But it also has an opposite: Negative Energy."),
					new DialogLine("Poslo", null, "Negative energy damages living things the way that Positive energy heals them."),
					new DialogLine("Poslo", null, "Conventional thought in most of the world holds that channeling negative energy is an act of evil. However, here we judge actions based on their impact rather than their principles, so the decision on whether to use Negative energy spells is entirely up to you."),
					new DialogLine("Poslo", null, "In any case, I give you Inflict Light, a basic negative energy spell exactly opposite to Cure Light."),
					function(){learnSpell(InflictLight);},
					new DialogLine("Poslo", null, "If you do use it, remember that it generally works particularly well against humans, normally against animals, poorly against plants, and not at all against anything inorganic, such as statues.")));
			}
			
			pois.push(new BasicPOI("Marcel", companion.name+"'s father. Being one of the only warriors in the village, he uses his voulge to fight off animals that get too close to the village.",
				new DialogLine("Marcel", this.MarcelNormal, "Be careful out there. The trial an be difficult if you're not careful. A lesson I know all too well..."),
				new DialogLine("Companion", null, "I thought you said you never wanted to dwell on that."),
				new DialogLine("Marcel", this.MarcelNormal, "I did. But you deserve the chance to learn from my mistakes."),
				new DialogLine("Marcel", this.MarcelNormal, "Many years ago, a few years before I met M'treac, I attempted the Trial alongside my best friend, Manz. We had a physical and magic combo not unlike the two of you."),
				new DialogLine("Marcel", this.MarcelNormal, "There were a few enemies in the shrine. Nothing we wouldn't have been able to deal with if we weren't so brash and foolish."),
				new DialogLine("Marcel", this.MarcelNormal, "There was a statue that offered us the chance to find its weakness, but we refused and challenged it immediately."),
				new DialogLine("Marcel", this.MarcelNormal, "Even though I was getting tired and Manz was running low on spells, we kept on going. But then we were ambushed by another statue as we entered a room."),
				new DialogLine("Marcel", this.MarcelNormal, "I collapsed as the statue beat us up. I finally realized my mistake, but by then it was too late."),
				new DialogLine("Marcel", this.MarcelNormal, "The next thing I knew, Manz and I were back in the village, and several doctors were tending to our wounds."),
				new DialogLine("Marcel", this.MarcelNormal, "We had survived, but we had failed the trial. We would never get to see the outside world."),
				new DialogLine("Marcel", this.MarcelNormal, "If you only remember one thing, remember this: You can return to the village and stay to recover your health and spells as many times as you need to. But if you fall, then you give up on your dreams of seeing the world.")));
			pois.push(new BasicPOI("M'treac", companion.name+"'s mother. The only person who came from the outside world.",
				new DialogLine("M'treac", this.MtreacNormal, "I hope that you're ready for this."),
				new DialogLine("Companion", null, "Of course we are! This trial will be easy for us two, as long as we're careful."),
				new DialogLine("M'treac", this.MtreacNormal, "I'm not talking about the trial. I'm talking about the outside world. You may not know, having lived your whole lives here, but the world, and the people in it, can be more cruel than you know."),
				new DialogLine("M'treac", this.MtreacNormal, "Did you know that I wasn't born in this village?"),
				new DialogLine("Companion", null, "I've heard, but it's true?"),
				new DialogLine("M'treac", this.MtreacNormal, "I am originally from the nation of Dispir, the closest civilization to the south of here. Well, I say they're civiliized, but sometimes it's hard to call them that."),
				new DialogLine("M'treac", this.MtreacNormal, "It was a place where some human beings were not considered to be human beings, just because of their gender and family. Being both female and lowborn, I was no more than property from the moment I was born.."),
				new DialogLine("M'treac", this.MtreacNormal, "But unlike my sisters, who accepted their lot in life, I wanted to escape by any means necessary."),
				new DialogLine("M'treac", this.MtreacNormal, "I did escape, one day, as eventually, with the help of a stolen knife. I will... never forget the blood."),
				new DialogLine("M'treac", this.MtreacNormal, "I understand it is your dream to depart from this place and seek adventure out in the world, and I will not stop you. But you must understand that the world can be a terrible, terrible place sometimes."),
				new DialogLine("Companion", null, "If the world is a terrible place, that's just all the more reason to go out there and change it.")));
		
		
		} else { //After completing the trial
			pois.push(new BasicPOI("Professor Manz", "Your arcane instructor. A sharp and practical man. An old friend of Marcel.",
				new DialogLine("Manz", this.ManzNormal, "I congratulate you on completing your trial. You have certainly earned the right to venture out into the world."),
				new DialogLine("Manz", this.ManzNormal, player.name+", if you want to be able to overcome the challenges that will face you in the future, you must focus on expanding your magical repertoire."),
				new DialogLine("Manz", this.ManzNormal, "Normal, common spells can often be purchased in shops."),
				new DialogLine("Manz", this.ManzNormal, "However, there are some rare and unusual spells in various places around the world. Some may even have such tremendous power to stand up to a god."),
				new DialogLine("Manz", this.ManzNormal, "They carry high costs, but that just serves to make them more valuable to your reserves, as you probably won't be using them every day."),
				new DialogLine("Manz", this.ManzNormal, "Some of those rare spells even have entire dungeons built around them.")));
			pois.push(new BasicPOI("Father Poslo", "Your divine instructor. A gentle soul who teaches the healing arts to any who will learn them.",
				new DialogLine("Poslo", null, "out in the world, you may discover... things known as undead. They are the antithesis of life, their ichor running with Negative energy instead of Positive."),
				new DialogLine("Poslo", null, "From an old corpse forced into mindless servitude by a priest, to a corrupted wizard seeking to avoid the grave by any means necessary, undead are beings of dark, evil magic."),
				new DialogLine("Poslo", null, "Because of their contrary nature, they are healed by Negative energy and harmed by Positive energy."),
				new DialogLine("Poslo", null, "You may find lesser undead in many places where darkness lurks, but no more so than in the north-center region, where a great lich reigns."),
				InflictLight));
			pois.push(new BasicPOI("Marcel", companion.name+"'s father. Being one of the only warriors in the village, he uses his voulge to fight off animals that get too close to the village.",
				new DialogLine("Marcel", this.MarcelNormal, "I want you to know, you make me prouder than I can express."),
				new DialogLine("Companion", null, "I think I understand."),
				new DialogLine("Marcel", this.MarcelNormal, "Now go and see the world. But do be sure to drop by from currentTime to currentTime You're always more than welcome here.")));
			pois.push(new BasicPOI("M'treac", companion.name+"'s mother. The only person who came from the outside world.",
				new DialogLine("M'treac", null, "hOI."),));
		}
		pois.push(Explainer);
		pois.push(new BasicPOI("Prexot goldenPi", "The game developer is here. Bask in his wondrous presence.",
			new DialogLine("Prexot", null, "I can give one of you 5000 experience points for free."),
			new DialogSplit("Player", null, "Who should get this experience?",
				new DialogSplitChoice(player.name, function(){player.experience += 5000;}),
				new DialogSplitChoice(companion.name, function(){companion.experience += 5000;}),
				new DialogSplitChoice("No, thanks.", doNothing)),
			new DialogLine("Prexot", null, "Okay.")));
		//console.log(pois);
		return pois;
	},
	/*returnFromRest : function() {
		if (!Flags.gameStarted)
			departureBegin2();
		else {
			engine.playMusic(this.music);
			this.buildScreen();
		}
		Flags.gameStarted = true;
	},*/
	population : 500,
	ManzNormal : null,//makeImage("src/CharacterImages/ManzNormal.png"),
	MarcelNormal : null,//makeImage("src/CharacterImages/MarcelNormal.png"), //https://www.foundmyself.com/Matthew+Wiese/art/male-figure-template/41779
	MtreacNormal : null,//makeImage("src/CharacterImages/MtreacNormal.png"), //https://www.pinterest.co.uk/pin/308215168225900910
}; LOCALES.push(Pocutop);
PocutopHome = {
	__proto__ : SubLocale,
	parent : Pocutop,
	music : Pocutop.music,
	name : "Home",
	description : "I live here.",
	enterEvent : function() {
		
	},
	getPOIs : function() {
		var pois = [];
		if (Flags.beginningTalkToClaire) {
			pois.push(new BasicPOI("Your Room", "Sleep in order to heal and recover spells, at the cost of time.", longRest));
		}
		return pois;
	}
}; SUBLOCALES.push(PocutopHome);
PocutopObservatory = {
	__proto__ : SubLocale,
	parent : Pocutop,
	music : Pocutop.music,
	name : "Observatory",
	description : "Voh Claire's workplace.",
	enterEvent : function() {
		if (!Flags.beginningTalkToClaire) {
			var daysLeft = Math.ceil(timeToApocalypse()+1);
			dialog.begin( //Player, Companion, Marcel, M'treac, Manz, Poslo, Claire, Vertace, Obaliiv
				new DialogLine("Player", null, "Voh Claire is in her armchair. Father Poslo is tending her."),
				new DialogLine("M'treac", CHAR_SPRITES.Mtreac.DialogNormal, "Claire! Are you-"),
				new DialogLine("Claire", CHAR_SPRITES.Claire.DialogNormal, "The world will end."),
				new DialogLine("Vertace", CHAR_SPRITES.Vertace.DialogNormal, "Um... what?"),
				new DialogLine("Claire", CHAR_SPRITES.Claire.DialogNormal, "The very fabric of spacetime will unravel."),
				new DialogLine("Claire", CHAR_SPRITES.Claire.DialogNormal, "But not all hope is lost. Because there is one, no, two who can stop the unravelling. and that one is... you."),
				new DialogLine("Companion", null, "There are eight people here other than you. Who are you talking to?"),
				new DialogLine("Claire", CHAR_SPRITES.Claire.Pointing, "You."),
				new DialogLine("Player", CHAR_SPRITES.Claire.Pointing, "She points directly at me. I move around a little bit. She's still pointing directly at me."),
				new DialogLine("Claire", CHAR_SPRITES.Claire.Pointing, "Oh, and you too, <Compnion>."),
				new DialogLine("Claire", CHAR_SPRITES.Claire.Pointing, "You can avert this apocalypse."),
				new DialogLine("Manz", CHAR_SPRITES.Manz.DialogNormal, "This is all rather sudden."),
				new DialogLine("Poslo", CHAR_SPRITES.Poslo.DialogNormal, "Please, Claire, elaborate, if you will."),
				new DialogLine("Claire", CHAR_SPRITES.Claire.DialogNormal, "The Anchors. The Anchors that bind together reality. The Anchors will fail. When they fail, all will be lost."),
				new DialogLine("Claire", CHAR_SPRITES.Claire.Pointing, "You must leave Pocutop. You must find the Anchors and restore them."),
				new DialogLine("Marcel", CHAR_SPRITES.Marcel.DialogNormal, "Leave Pocutop? But it's dangerous out there!"),
				new DialogLine("Claire", CHAR_SPRITES.Claire.DialogNormal, "But they are hardly helpless."),
				new DialogLine("Marcel", CHAR_SPRITES.Marcel.DialogNormal, "But they haven't even been in real combat yet!"),
				new DialogLine("Manz", CHAR_SPRITES.Manz.DialogNormal, "That can be remedied. Now, Claire, when exactly do you expect this to happen?"),
				new DialogLine("Claire", CHAR_SPRITES.Claire.DialogNormal, (daysLeft == Infinity) ? "I don't know exactly... But it will be sooner than you'd like." : ("" + daysLeft + " days.")),
				new DialogLine("M'treac", CHAR_SPRITES.Mtreac.DialogNormal, (daysLeft == Infinity) ? "That doesn't sound good..." : ("What? Just " + daysLeft + " days?")),
				new DialogLine("Claire", CHAR_SPRITES.Claire.DialogNormal, "I know it's alarmingly soon, but I believe that <Player> and <Companion> can triumph."),
				new DialogLine("Claire", CHAR_SPRITES.Claire.DialogNormal, "Now the first step will be undergo the Departure Trial-"),
				new DialogLine("Marcel", CHAR_SPRITES.Marcel.DialogNormal, "The Departure Trial? They're not ready for that!"),
				new DialogLine("Claire", CHAR_SPRITES.Claire.DialogNormal, "They're about the same age and level of experience that you were when you tried it."),
				new DialogLine("Marcel", CHAR_SPRITES.Marcel.DialogNormal, "Yes, but we failed!"),
				new DialogLine("Claire", CHAR_SPRITES.Claire.DialogNormal, "Only narrowly. Your failure was because you were too stubborn and reckless!"),
				new DialogLine("Manz", CHAR_SPRITES.Manz.DialogNormal, "She's right. Besides, it looks like there's no other choice."),
				new DialogLine("Marcel", CHAR_SPRITES.Marcel.DialogNormal, "...Fine. But they'll need to experience combat first."),
				new DialogLine("Manz", CHAR_SPRITES.Manz.DialogNormal, "The two of them against the two of us?"),
				new DialogLine("Marcel", CHAR_SPRITES.Marcel.DialogNormal, "Alright. You got that, <Player>? <Companion>? We'll see you at the practice battlefield in the morning. Be ready for combat."),
				new DialogLine("Companion", null, "...Yes."),
				//function() {InceptiveTrailWest.available = true},
			);
			setFlag("beginningTalkToClaire");
		}
	},
	getPOIs : function() {
		var pois = [];
		if (!Flags.departureFinished) {
			
		}
		return pois;
	}
}; SUBLOCALES.push(PocutopObservatory);

function afterFightManzMarcel() {
	setFlag("beginningFightManzMarcel");
	Pocutop.arrive();
	InceptiveTrailWest.available = true;
	InceptiveTrailEast.available = true;
	dialog.begin(
		new DialogLine("Marcel", CHAR_SPRITES.Marcel.DialogNormal, "I'd rather you stay and finish your training... but it doesn't seem like that's an option."),
		new DialogLine("Manz", CHAR_SPRITES.Manz.DialogNormal, "...Tell me, what do you know about the barrier surrounding Pocutop?"),
		new DialogLine("Companion", null, "Not much, really..."),
		new DialogLine("Manz", CHAR_SPRITES.Manz.DialogNormal, "A long time ago, the town of Pocutop, its satellite village Pocudou, a significant amount of forest, part of the ocean, and half of a lake were sealed off from the rest of the world by a dimensional bubble."),
		new DialogLine("Manz", CHAR_SPRITES.Manz.DialogNormal, "I have no idea who made this bubble, why they did it, or how the bubble works. But I do know that it prevents anything from entering or exiting its enclosed space."),
		new DialogLine("Marcel", CHAR_SPRITES.Marcel.DialogNormal, "But there is one way to leave."),
		new DialogLine("Marcel", CHAR_SPRITES.Marcel.DialogNormal, "At the very eastern edge of the bubble, there's a spot called the Departure Gate, where the barrier isn't quite so absolute."),
		new DialogLine("Marcel", CHAR_SPRITES.Marcel.DialogNormal, "It's possible to pass through it, but only if you're in possession of an object called the Departure Token."),
		new DialogLine("Manz", CHAR_SPRITES.Manz.DialogNormal, "And the Departure Tokens are found inside of the Departure Shrine, located exactly in the center of the bubble."),
		new DialogLine("Manz", CHAR_SPRITES.Manz.DialogNormal, "Right over there is the Inceptive Trail. It leads to the Departure Shrine and Departure Gate. Just follow along it until you come across a building of red wood and grey stone. You can't miss it."),
	);
}

function Manz(level) {
	this.name = "Manz";
	this.description = "One of <Player>'s instructors. A user of arcane magic.";
	this.level = level;
	this.Vitality =     Math.floor(level*1.0);
	this.Strength =     Math.floor(level*0.7);
	this.Constitution = Math.floor(level*0.7);
	this.Intelligence = Math.floor(level*1.3);
	this.Wisdom =       Math.floor(level*1.1);
	this.Dexterity =    Math.floor(level*0.8);
	this.Agility =      Math.floor(level*0.7);
	this.Charisma =     Math.floor(level*1.2);
	this.Potential =    Math.floor(level*0.8);
	this.Weapon = 0;
	this.Armor = 0;
	this.maxhp = this.Vitality*10;
	this.hp = this.maxhp;
	this.effectiveness = {
		slashing : 1.2,
		positive : -1.0,
		negative : 1.5
	};
	this.weaponAttribute = "bludgeoning";
	this.techniques = [
		new BasicAttack(Math.floor(level/2), this),
	];
	this.spells = [
		new AcidSplash(this),
		new AcidSplash(this),
		new RayOfFrost(this),
		new RayOfFrost(this),
		new MagicMissile(this),
		new MagicMissile(this),
		new MagicMissile(this),
		new MagicMissile(this),
	];
	this.init();
}
Manz.prototype = Object.create(Unit);
Manz.prototype.sprites = CHAR_SPRITES.Manz;
//Boar.prototype.image = makeImage("src/Enemies/Boar.png");

function Marcel(level) {
	this.name = "Marcel";
	this.description = "<Companion>'s father and tutor. Wields a voulge.";
	this.level = level;
	this.Vitality =     Math.floor(level*1.0);
	this.Strength =     Math.floor(level*1.1);
	this.Constitution = Math.floor(level*1.4);
	this.Intelligence = Math.floor(level*0.8);
	this.Wisdom =       Math.floor(level*0.7);
	this.Dexterity =    Math.floor(level*1.0);
	this.Agility =      Math.floor(level*0.7);
	this.Charisma =     Math.floor(level*0.8);
	this.Potential =    Math.floor(level*0.9);
	this.Weapon =       Math.floor(level*0.7);
	this.Armor =        Math.floor(level*1.0);
	this.maxhp = this.Vitality*10;
	this.hp = this.maxhp;
	this.effectiveness = {
		electricity : 1.5,
		positive : -1.0,
		negative : 1.5
	};
	this.weaponAttribute = "slashing";
	this.techniques = [
		new BasicAttack(level, this),
		new PowerChop(level, this),
		new QuickStab(level, this),
		new Cleave(level, this)];
	this.spells = [];
	this.init();
	//this.image = //makeImage("src/Enemies/Marcel.png");
}
Marcel.prototype = Object.create(Unit);
Marcel.prototype.sprites = CHAR_SPRITES.Marcel;