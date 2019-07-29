function introSpeech() {
	engine.gameObjects = [];
	dialog.begin(new DialogLine("Game", null, "Welcome to Spelpaer. This is a first-person role-playing game. Click anywhere to advance the text."),
		"In this game, you will play as two adventurers.",
		"The first of these adventurers is You, the Player. As a spellcaster, you can do nearly anything, from launching balls of fire to repairing grievous wounds to hypnotizing your enemies - provided that you prepared the right spells.",
		"The second is your Companion. He or she is not nearly as clever or as magically adept as you, but is strong, tough, and will follow you to the ends of the earth. Your companion's physical prowess and array of useful skills complement your magic nicely.",
		"You have grown up in Pocutop, an idyllic utopia almost completely isolated from ferocious monstrosities, corrupt governments, and warring religions.",
		"Since you learned about the outside world, and you have been determined to see it, and to change it for the better.",
		"Your village values the wellbeing of its people, and strictly forbids anybody from leaving. However, there is an old custom called the Departure Trial, where people can prove their strength and earn the privilege to leave the safety of the protective bubble.",
		"Today, the two of you together will begin your trial. But first, I must ask you a few things about you and your companion.",
		"Remember that you can mouse-over almost anything in the game to get more information, except when this dialog box is open.",
		buildCharacterMenu1);
}

function departureBegin() {
	engine.gameObjects = [];
	currentLoc = Pocutop;
	dialog.begin("It looks like you're ready to begin.",
			//new DialogLine("Game", null, ),
			//new DialogLine("You", null, "You're up early."),
			//new DialogLine("Companion", null, "I'm just so excited! Today, we're going to go on a mini-adventure, "+((relationshipType)?"and then we're going to get properly married, ":"")+"and then we'll get to leave the village and go on a real adventure!"),
			//new DialogLine("You", null, "Well, try to keep it contained for now. What does the letter say?"),
			"Your game will be saved every currentTime you sleep. When you continue immediately or load your game, the first thing you will do is prepare your spells for the day.",
			"You get a limited number of points each day. Don't worry if you choose poorly today - you can choose better tomorrow.",
			longRest);
}

function departureBegin2() {
	engine.gameObjects = [];
	dialog.begin("You've just finished meditating and studying for your daily spells. You walk outside and find "+companion.name+" pacing back and forth on your lawn, wearing "+cg("his","her")+" armor.",
		new DialogLine("Companion", null, "Let's go talk to Doctor Clair."),
		function(){Pocutop.arrive()});
}

function departureCeremony() {
	Flags.departureFinished = true;
	dialog.begin(new DialogLine("Companion", null, "We finished the trial!"),
			new DialogLine("Poslo", null, "Hand me the tokens."),
			new DialogLine("Poslo", null, "Tell me, are you aware of the function of these tokens?"),
			new DialogLine("You", null, "They seem to be related to the abjurations, do they not?"),
			new DialogLine("Poslo", null, "That is correct. Allow me to explain the defenses of this village."),
			new DialogLine("Poslo", null, "The primary abjuration protecting this village is a nearly impenetrable space bubble. No thing can pass through it."),
			new DialogLine("Poslo", null, "But there is an intentional gap in that bubble, which is covered by different enchantments. That place is called Departure Gate, and it can be found if you continue on the trail past Departure Shrine."),
			new DialogLine("Poslo", null, "It is protected by both an Overlook enchantment that causes most viewers from the outside to somehow not notice it, and a forcefield that blocks physical passage both ways."),
			new DialogLine("Poslo", null, "Since both of you already know it exists, and you, "+companion.name+", have such good navigation skills, you will have no trouble finding it again."),
			new DialogLine("Poslo", null, "Now we get to the point. Those tokens you just retrieved allow the bearer to pass through that forcefield as though it doesn't exist."),
			//new DialogLine("Poslo", null, "However, simply holding it doesn't work. You must embed it into your sternum."),
			//new DialogLine("Companion", null, "That sounds painful."),
			//new DialogLine("Poslo", null, "Don't worry. The process is done magically as part of the ceremony."),
			new DialogLine("goldenPi Games", null, "I don't feel like writing this ceremony now."), //TODO actually do this
			new DialogLine("Poslo", null, "From here on out, you may come and go from this village as you please."),
			departurePath1);
}

function departurePath1() {
	/*
	pathScreen.begin(Pocutop, InceptiveTrailWest);
	pathScreen.encounterTimer = 15;
	*/
	Pocutop.arrive();
}