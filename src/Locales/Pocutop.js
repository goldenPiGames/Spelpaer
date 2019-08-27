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
				new DialogLine("Manz", this.ManzNormal, "First of all, you get a number of points equal to your level."),
				new DialogLine("Manz", this.ManzNormal, "Additionally, you get a number of points equal to the total number of spells you know."),
				new DialogLine("Manz", this.ManzNormal, "Therefore, you should always be seeking out new spells, even if you don't intend on using them."),
				new DialogLine("Manz", this.ManzNormal, "Lastly, that amount is multiplied by an amount based on how well you slept. For example, camping in a tent gives only 80% of your normal spell points, but sleeping in your house gives 100%."),
				new DialogLine("Manz", this.ManzNormal, "If you are not sure what to prepare on any given day, Magic Missile and Cure Light are always good, general purpose spells. Magic Missile never misses and deals force damage, to which nearly nothing is resistant. Cure Light is simple and efficient healing."),
				new DialogLine("Manz", this.ManzNormal, "Of course, if you know the weaknesses and resistances of an upcoming opponent, you should prepare the proper spells."),
				new DialogLine("Manz", this.ManzNormal, "I believe that both of the combat opponents in the shrine are immune to fear and resistant to fire. One is weak to cold, and the other is weak to something else, but I don't remember what.")));
			if (Flags.departureMain) {
				pois.push(new BasicPOI("Father Poslo", "Your divine instructor. Speak to him to complete the Departure Trial.", departureCeremony));
			} else {
				pois.push(new BasicPOI("Father Poslo", "Your divine instructor. A gentle soul who teaches the healing arts to any who will learn them.",
					new DialogLine("Poslo", null, "Tell me, do you know how healing spells work?"),
					new DialogLine("You", null, "I recall that healing spells use positive energy, which is the internal power of all life."),
					new DialogLine("Poslo", null, "That's correct. But it also has an opposite: Negative Energy."),
					new DialogLine("Poslo", null, "Negative energy damages living things the way that Positive energy heals them."),
					new DialogLine("Poslo", null, "Conventional thought in much of the outside world holds that using negative energy is an act of evil."),
					new DialogLine("Poslo", null, "However, here we judge actions based on their impact rather than their principles, so the decision on whether to use Negative energy spells is entirely up to you."),
					new DialogLine("Poslo", null, "In any case, I give you Inflict Light, a basic negative energy spell exactly opposite to Cure Light."),
					function(){learnSpell(InflictLight);},
					new DialogLine("Poslo", null, "If you do use it, remember that it generally works very well against humans, normally against animals, poorly against plants, and not at all against anything inorganic, such as constructs.")));
			}
			
			pois.push(new BasicPOI("Marcel", companion.name+"'s father. Being one of the only warriors in the village, he uses his voulge to fight off animals that get too close to the village.",
				new DialogLine("Marcel", CHAR_SPRITES.Marcel.DialogNormal, "Be careful out there. The trial an be difficult if you're not careful. A lesson I know all too well..."),
				new DialogLine("Companion", null, "I thought you said you never wanted to dwell on that."),
				new DialogLine("Marcel", CHAR_SPRITES.Marcel.DialogNormal, "I did. But you deserve the chance to learn from my mistakes."),
				new DialogLine("Marcel", CHAR_SPRITES.Marcel.DialogNormal, "Many years ago, shortly before I married M'treac, I attempted the Trial alongside my best friend, Manz. We had a physical and magic combo not unlike the two of you."),
				new DialogLine("Marcel", CHAR_SPRITES.Marcel.DialogNormal, "There were a few enemies in the shrine. Nothing we wouldn't have been able to deal with if we weren't so brash and foolish."),
				new DialogLine("Marcel", CHAR_SPRITES.Marcel.DialogNormal, "There was a statue that offered us the chance to find its weakness, but we refused and instead challenged it immediately."),
				new DialogLine("Marcel", CHAR_SPRITES.Marcel.DialogNormal, "Fighting that statue took a lot out of us. We won, but I was getting tired and Manz was running low on spells"),
				new DialogLine("Marcel", CHAR_SPRITES.Marcel.DialogNormal, "We decided to keep on going. But then we were ambushed by another statue as we entered a room."),
				new DialogLine("Marcel", CHAR_SPRITES.Marcel.DialogNormal, "I collapsed as the statue beat us up. I finally realized my mistake, but by then it was too late."),
				new DialogLine("Marcel", CHAR_SPRITES.Marcel.DialogNormal, "The next thing I knew, Manz and I were back in the village, and Poslo was tending to our wounds."),
				new DialogLine("Marcel", CHAR_SPRITES.Marcel.DialogNormal, "We had survived, but we had failed the trial. We were told that we would never get to see the outside world."),
				new DialogLine("Marcel", CHAR_SPRITES.Marcel.DialogNormal, "If you only remember one thing, remember this: Don't push it. It's better rto be cautious than reckless, even if you are on a time limit.")));
			pois.push(new BasicPOI("M'treac", companion.name+"'s mother. The only person who came from the outside world.",
				new DialogLine("M'treac", this.MtreacNormal, "I hope that you're ready for this."),
				new DialogLine("Companion", null, "Of course we are! This trial will be easy for us two, as long as we're careful."),
				new DialogLine("M'treac", this.MtreacNormal, "I'm not talking about the trial. I'm talking about the outside world. You may not know, having lived your whole lives here, but the world, and the people in it, can be more unfair than you know."),
				new DialogLine("M'treac", this.MtreacNormal, "Did you know that I wasn't born in this village?"),
				new DialogLine("Companion", null, "*expresses surprise*"),
				new DialogLine("M'treac", this.MtreacNormal, "I am originally from the nation of Dispir, the closest major civilization to the south of here."),
				new DialogLine("M'treac", this.MtreacNormal, "It's run partially by the corrupt government, and partially by the brutal mafia."),
				new DialogLine("M'treac", this.MtreacNormal, "My family was poor workers who didn't have connections to either... but we accidentally got on the bad side of the mafia by accepting a tiny loan."),
				new DialogLine("M'treac", this.MtreacNormal, "My family tried to keep on living and working as usual, hoping that the mafia would forget, but I knew wasn't going to let that happen. I wanted to be able to protect myself."),
				new DialogLine("M'treac", this.MtreacNormal, "I did escape, one day, as eventually, with the help of a concealed knife I had acquired. I will... never forget all the blood."),
				new DialogLine("M'treac", this.MtreacNormal, "I understand that you need to depart from this place and seek adventure out in the world, and I will not stop you. But you must understand that the world can be a terrible place sometimes."),));
		
		
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
				new DialogLine("Marcel", CHAR_SPRITES.Marcel.DialogNormal, "I want you to know, you make me prouder than I can express."),
				new DialogLine("Marcel", CHAR_SPRITES.Marcel.DialogNormal, "Now go and see the world. But do be sure to drop by from time to time You're always more than welcome here.")));
			pois.push(new BasicPOI("M'treac", companion.name+"'s mother. The only person who came from the outside world.",
				new DialogLine("M'treac", null, "hOI."),)); //TODO writet dialog
		}
		pois.push(Explainer);
		pois.push(new BasicPOI("Prexot goldenPi", "The game developer is here. Bask in his wondrous presence.",
			new DialogLine("Prexot", null, "I can give one of you 5000 experience points for free."),
			new DialogSplit("Player", null, "Who should get this experience?",
				new DialogSplitChoice(player.name, function(){player.experience += 5000;}),
				new DialogSplitChoice(companion.name, function(){companion.experience += 5000;}),
				new DialogSplitChoice("No, thanks.", doNothing)),
			new DialogLine("Prexot", null, "Okay.")));
		pois.push(new BasicPOI("Fight", "Fight some boars.", ()=>battle.begin([new Boar(10), new Boar(10)], "BattleField 2", ()=>Pocutop.arrive())));
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
	//MarcelNormal : null,//makeImage("src/CharacterImages/MarcelNormal.png"), //https://www.foundmyself.com/Matthew+Wiese/art/male-figure-template/41779
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
			pois.push(new RestPOI("Your Room", "Sleep in order to heal and recover spells, at the cost of time."));
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
			var daysLeft = daysToApocalypse();
			dialog.begin( //Player, Companion, Marcel, M'treac, Manz, Poslo, Claire, Vertace, Obaliiv
				new DialogLine("Player", null, "Voh Claire is in her armchair. Father Poslo is tending her."),
				new DialogLine("M'treac", CHAR_SPRITES.Mtreac.DialogNormal, "Claire! Are you-"),
				new DialogLine("Claire", CHAR_SPRITES.Claire.DialogNormal, "The world will end."),
				new DialogLine("Vertace", CHAR_SPRITES.Vertace.DialogNormal, "Um... what?"),
				new DialogLine("Claire", CHAR_SPRITES.Claire.DialogNormal, "The very fabric of spacetime will unravel."),
				new DialogLine("Claire", CHAR_SPRITES.Claire.DialogNormal, "But not all hope is lost. Because there is one, no, two who can stop the unravelling. and that one is... you."),
				new DialogLine("Player", null, "I ask for clarification, as there are nine people here."),
				new DialogLine("Claire", CHAR_SPRITES.Claire.Pointing, "You."),
				new DialogLine("Player", CHAR_SPRITES.Claire.Pointing, "She points directly at me. I move around a little bit. She's still pointing directly at me."),
				new DialogLine("Claire", CHAR_SPRITES.Claire.Pointing, "Oh, and you too, <Companion>."),
				new DialogLine("Claire", CHAR_SPRITES.Claire.Pointing, "You can avert this catastrophe."),
				new DialogLine("Manz", CHAR_SPRITES.Manz.DialogNormal, "This is all rather sudden."),
				new DialogLine("Poslo", CHAR_SPRITES.Poslo.DialogNormal, "Please, Claire, elaborate, if you will."),
				new DialogLine("Claire", CHAR_SPRITES.Claire.DialogNormal, "The Anqors. The Anqors that are holding together reality. The Anqors will fail. When they fail, all will be lost."),
				new DialogLine("Claire", CHAR_SPRITES.Claire.Pointing, "You must leave Pocutop. You must find the Anqors and repair them."),
				new DialogLine("Marcel", CHAR_SPRITES.Marcel.DialogNormal, "Leave Pocutop? But it's dangerous out there!"),
				new DialogLine("Claire", CHAR_SPRITES.Claire.DialogNormal, "But they are hardly helpless."),
				new DialogLine("Marcel", CHAR_SPRITES.Marcel.DialogNormal, "They're not ready! They haven't even been in real combat yet!"),
				new DialogLine("Manz", CHAR_SPRITES.Manz.DialogNormal, "That can be remedied. Now, Claire, when exactly do you expect this to happen?"),
				new DialogLine("Claire", CHAR_SPRITES.Claire.DialogNormal, (daysLeft == Infinity) ? "I don't know exactly... But it will be sooner than you'd like." : ("" + daysLeft + " days.")),
				new DialogLine("M'treac", CHAR_SPRITES.Mtreac.DialogNormal, (daysLeft == Infinity) ? "That doesn't sound good..." : ("What? Just " + daysLeft + " days?")),
				new DialogLine("Claire", CHAR_SPRITES.Claire.DialogNormal, "I know it's alarmingly soon, but I believe that <Player> and <Companion> can triumph."),
				new DialogLine("Claire", CHAR_SPRITES.Claire.DialogNormal, "Now the first step will be undergo the Departure Trial-"),
				new DialogLine("Marcel", CHAR_SPRITES.Marcel.DialogNormal, "The Departure Trial? They're not ready for that!"),
				new DialogLine("Claire", CHAR_SPRITES.Claire.DialogNormal, "They're about the same age and level of experience that you were when you tried it."),
				new DialogLine("Marcel", CHAR_SPRITES.Marcel.DialogNormal, "Yes, but we failed!"),
				new DialogLine("Claire", CHAR_SPRITES.Claire.DialogNormal, "Only narrowly. Your failure was because you were too stubborn and reckless!"),
				new DialogLine("Manz", CHAR_SPRITES.Manz.DialogNormal, "She's right, Marc. It was our fault. Besides, it looks like there's no other choice."),
				new DialogLine("Marcel", CHAR_SPRITES.Marcel.DialogNormal, "...Fine. But they'll need to experience combat first."),
				new DialogLine("Manz", CHAR_SPRITES.Manz.DialogNormal, "The two of them against the two of us?"),
				new DialogLine("Marcel", CHAR_SPRITES.Marcel.DialogNormal, "Alright. You got that, <Player>? <Companion>? We'll see you at the practice battlefield in the morning. Be ready for combat."),
				new DialogLine("Manz", CHAR_SPRITES.Manz.DialogNormal, "Don't forget to prepare your spells."),
				//new DialogLine("Companion", null, "...Yes."),
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
		new DialogLine("Companion", null, "*doesn't know much*"),
		new DialogLine("Manz", CHAR_SPRITES.Manz.DialogNormal, "A long time ago, the town of Pocutop, its satellite village Pocudou, a significant amount of forest, part of the ocean, and half of a lake were sealed off from the rest of the world by a dimensional bubble."),
		new DialogLine("Manz", CHAR_SPRITES.Manz.DialogNormal, "I have no idea who made this bubble, why they did it, or how the bubble works. But I do know that it prevents anything from entering or exiting its enclosed space."),
		new DialogLine("Marcel", CHAR_SPRITES.Marcel.DialogNormal, "But there is one way to leave."),
		new DialogLine("Marcel", CHAR_SPRITES.Marcel.DialogNormal, "At the very eastern edge of the bubble, there's a spot called the Departure Gate, where the barrier isn't quite so absolute."),
		new DialogLine("Marcel", CHAR_SPRITES.Marcel.DialogNormal, "It's possible to pass through it, but only if you're in possession of an object called the Departure Token."),
		new DialogLine("Manz", CHAR_SPRITES.Manz.DialogNormal, "And the Departure Tokens are found inside of the Departure Shrine, located exactly in the center of the bubble."),
		new DialogLine("Manz", CHAR_SPRITES.Manz.DialogNormal, "Right over there is the Inceptive Trail. It leads to the Departure Shrine and Departure Gate. Just follow along it until you come across a building of red wood and grey stone. You can't miss it."),
		new DialogLine("Manz", CHAR_SPRITES.Manz.DialogNormal, "And here, take this spell."),
		()=>learnSpell(BurningHands),
	);
}

class Manz extends Unit {
	constructor(level) {
		super(level);
	}
	chooseAction() {
		return {
			target: player,
			action: this.findSpell(BurningHands) || this.findSpell(MagicMissile1) || this.findSpell(RayOfFrost) || this.findSpell(AcidSplash) || this.findTechnique(BasicAttack)
		};
	}
}
Manz.prototype = Object.create(Unit);
Manz.prototype.name = "Manz";
Manz.prototype.description = "One of <Player>'s instructors. A user of arcane magic.";
Manz.prototype.sprites = CHAR_SPRITES.Manz;
Manz.prototype.hpMult = 10;
Manz.prototype.statMults = statsToArray({
	Vitality : 0.9,
	Strength : 0.7,
	Constitution : 0.7,
	Intelligence : 1.4,
	Wisdom : 1.1,
	Dexterity : 0.8,
	Agility : 0.7,
	Charisma : 1.1,
	Potential : 0.8,
	Weapon : 0.0,
	Armor : 0.4,
});
Manz.prototype.effectiveness = attributesToArray({
	cutting : 1.1,
	fire : 0.6,
	positive : -1.0,
	negative : 1.5
});
Manz.prototype.weaponAttribute = ATTRIBUTE_INDICES.bludgeoning;
Manz.prototype.techniqueTable = [
	{technique:BasicAttack, levelMult:0.5},
];
Manz.prototype.spellTable = [
	AcidSplash,
	RayOfFrost,
	MagicMissile1,
	MagicMissile1,
	//MagicMissile1,
	BurningHands,
	//MagicMissile2,
];
Manz.prototype.expYield = function() {
	return Math.ceil(forNextLevel(Math.min(player.level, this.level)) * (this.hpPortion <= .5 ? 1 : .5));
}

class Marcel extends Unit {
	constructor(level) {
		super(level);
	}
	chooseAction() {
		return {
			target: companion,
			action: this.findTechnique(QuickStab) || this.findTechnique(Cleave) || this.findTechnique(PowerChop) || this.findTechnique(BasicAttack)
		};
	}
}
Marcel.prototype = Object.create(Unit);
Marcel.prototype.name = "Marcel";
Marcel.prototype.description = "<Companion>'s father and tutor. Wields a voulge.";
Marcel.prototype.sprites = CHAR_SPRITES.Marcel;
Marcel.prototype.hpMult = 10;
Marcel.prototype.statMults = statsToArray({
	Vitality : 0.9,
	Strength : 1.2,
	Constitution : 1.4,
	Intelligence : 0.8,
	Wisdom : 0.7,
	Dexterity : 1.0,
	Agility : 0.7,
	Charisma : 0.8,
	Potential : 0.9,
	Weapon : 0.7,
	Armor : 1.1,
});
Marcel.prototype.effectiveness = attributesToArray({
	electricity : 1.3,
	positive : -1.0,
	negative : 1.5
});

Marcel.prototype.weaponAttribute = ATTRIBUTE_INDICES.cutting;
Marcel.prototype.techniqueTable = [
	BasicAttack,
	PowerChop,
	QuickStab,
	Cleave,
];
Marcel.prototype.expYield = function() {
	return Math.ceil(forNextLevel(Math.min(companion.level, this.level)) * (this.hpPortion <= .5 ? 1 : .5));
}