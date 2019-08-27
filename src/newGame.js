function newGame() {
	playMusic("Decisions");
	runnee = GeneralEngine;
	var bwidth = Math.round(settings.width/3);
	GeneralEngine.objects = [
		new Button(bwidth, 100, bwidth, 50, DIFFICULTY_NAMES[0], [
			"For people who like to take things at their own pace.",
			"Time freezes while you're up in battle.",
			//"Time does not advance outside of battle.",
			"The apocalypse approaches exactly at the speed of plot, not in-game time.",
			"Experience gain is reduced.",
			"When you get a game over, you can reload your last save.",],
			function(){difficulty = 0; preGameIntro()}),
		new Button(bwidth, 200, bwidth, 50, DIFFICULTY_NAMES[1], [
			"For people who like the authentic experience.",
			"Battles occur in real time.",
			//"Time advances in real time outside of battle.",
			"The apocalypse approaches steadily.",
			"Experience gain is normal.",
			"When you get a game over, you can reload your last save."],
			function(){difficulty = 1; preGameIntro()}),
		new Button(bwidth, 300, bwidth, 50, DIFFICULTY_NAMES[2], [
			"For people who like to be in a constant state of panic. Not for first-timers.",
			"Battles occur in real time.",
			//"Time advances in real time outside of battle.",
			"The apocalypse approaches a little faster.",
			"Experience gain is increased.",
			"When you get a game over, your save is instantly deleted."],
			function(){difficulty = 2; preGameIntro()}),
	]
}

function preGameIntro() {
	playMusic("Decisions");
	runnee = GeneralEngine;
	currentTime = 0;
	GeneralEngine.objects = [];
	dialog.begin(
		new DialogLine("Obaliiv", null, "So you're finally here?"),
		new DialogLine("Obaliiv", null, "I never thought that this would happen in my lifetime..."),
		new DialogLine("Obaliiv", null, "It's time to create a vessel for you."),
		new DialogLine("Obaliiv", null, "This person will be the window to your world, as well as a capable caster of spells."),
		buildPlayerCreation,
	);
}


function buildPlayerCreation() {
	switchScreen(new CharacterCreationScreen(0, function() {
		runnee = GeneralEngine;
		GeneralEngine.gameObjects = [];
		dialog.begin(
			new DialogLine("Obaliiv", null, "Now for the secondary vessel."),
			new DialogLine("Obaliiv", null, "This person will be a constant companion to <Player>."),
			buildCompanionCreation,
		)
	}));
	/*GeneralEngine.objects = [
		//new Label(400, 10, 400, 60, "Player", "This will be you, effectively."),
		new Label(10, 100, 200, 20, "Gender", ""),
		playerGenderRadio,
		favColorPicker,
		new Button(settings.width-130, mainHeight()-50, 120, 40, "Continue", "Continue on to the next step. Note: You CANNOT go back and change these things later.", 
			function() {
				var pgender;
				switch (playerGenderRadio.index) {
					case -1: return; break;
					case 0: pgender = GENDER_MALE; break;
					case 1: pgender = GENDER_FEMALE; break;
					case 2: pgender = GENDER_OTHER; break;
				}
				var pname = textInput.value;
				if (pname == 0)
					return;
				player = new Player();
				player.gender = pgender;
				player.name = pname;
				player.color = favColorPicker.color;
				player.level = 10;
				player.baseStats = statMultsToArray({
					Vitality : 1.0,
					Strength : .8,
					Constitution : .8,
					Dexterity : .9,
					Agility : .9,
					Intelligence : 1.2,
					Wisdom : 1.2,
					Charisma : 1.2,
					Potential : 1.0,
					Weapon : 0,
					Armor : 0,
				}, player.level);
				player.maxhp = player.Vitality * 10;
				player.hp = player.maxhp;
				AcidSplash.prototype.known = true;
				RayOfFrost.prototype.known = true;
				MagicMissile.prototype.known = true;
				CureLight.prototype.known = true;
				ReadStats.prototype.known = true;
				Frighten.prototype.known = true;
				player.spells = [
					new MagicMissile(player),
					new CureLight(player),
					new Frighten(player),
					new ReadStats(player),
				];
				)
			}),
	];*/
}

function buildCompanionCreation() {
	switchScreen(new CharacterCreationScreen(1, function() {
		runnee = GeneralEngine;
		GeneralEngine.gameObjects = [];
		beginNewGame();
	}));
}

function CharacterCreationScreen(comp, after) {
	this.comp = comp;
	var defaultColor = comp ? "#FFFF00" : "#3434FF";
	this.genderLabel = new Label(10, 100, 200, 20, "Gender", "This does not have any mechanical effect.");
	this.genderRadio = new RadioButtons(10, 125, 200, 25, ["Male", "Female", "Other"], ["He|Him|His", "She|Her|Her", "They|Them|Their"]);
	this.favColorPicker = new ColorPicker(settings.width-280, 125, "Color", "The color that generally represents this character.", (color)=>this.changeColor(color), defaultColor);
	this.continueButton = new Button(settings.width-130, mainHeight()-50, 120, 40, "Continue", "Continue on to the next step. Note: You CANNOT go back and change these things later.", ()=>{if (this.generate()) after()});
	this.objects = [this.genderLabel, this.genderRadio, this.favColorPicker, this.continueButton];
	if (!comp) {
		
	} else {
		this.relationshipRadio = new RadioButtons(10, 275, 200, 25, ["Friends", "Siblings", "Spouses"], ["They're as close as friends can be.", "They have the same parents.", "They're already married. Use your imagination."]);
		this.objects.push(this.relationshipRadio);
	}
	setTextInput(settings.width/4, 10, settings.width/2, 60, "Name");
	this.changeColor(defaultColor);
}
CharacterCreationScreen.prototype = Object.create(ScreenBase);
CharacterCreationScreen.prototype.update = function() {
	this.continueButton.active = !!textInput.value && this.genderRadio.index >= 0 && (!this.relationshipRadio || this.relationshipRadio.index >= 0)
	this.objects.forEach((oj)=>oj.update());
}
CharacterCreationScreen.prototype.draw = function() {
	clearBack();
	this.objects.forEach((oj)=>oj.draw());
}
CharacterCreationScreen.prototype.generate = function() {
	if (!textInput.value)
		return false;
	if (!(this.genderRadio.index >= 0))
		return false;
	var character;
	if (!this.comp) {
		character = new Player();
		character.level = 10;
		character.baseStats = statsToArray({
				Vitality : 10,
				Strength : 8,
				Constitution : 8,
				Dexterity : 9,
				Agility : 9,
				Intelligence : 12,
				Wisdom : 12,
				Charisma : 12,
				Potential : 10,
				Weapon : 0,
				Armor : 0,
				HReduce : 10,
			}, character.level);
		character.equipped = [
			new NoWeapon(),
			new PocutopWand(),
			new PocutopRobe(),
			new PocutopNecklace(),
		]
		player = character;
		MagicMissile1.prototype.known = true;
		CureLight.prototype.known = true;
		Frighten.prototype.known = true;
		ReadStats.prototype.known = true;
		RayOfFrost.prototype.known = true;
		AcidSplash.prototype.known = true;
		//BurningHands.prototype.known = true;
	} else {
		if (!(this.relationshipRadio.index >= 0))
			return false;
		relationshipType = this.relationshipRadio.index;
		character = new Companion();
		character.level = 10;
		character.baseStats = statsToArray({
				Vitality : 10,
				Strength : 12,
				Constitution : 12,
				Dexterity : 11,
				Agility : 11,
				Intelligence : 8,
				Wisdom : 8,
				Charisma : 8,
				Potential : 10,
				Weapon : 0,
				Armor : 0,
				HReduce : 10,
			});
		character.equipped = [
			new PocutopSword(),
			new PocutopShield(),
			new PocutopArmor(),
			new PocutopNecklace(),
		];
		companion = character;
		BasicAttack.prototype.known = 10;
		PowerChop.prototype.known = 10;
		Cleave.prototype.known = 10;
		QuickStab.prototype.known = 10;
		ArmorPierce.prototype.known = 10;
		StunningKick.prototype.known = 10;
		Smite.prototype.known = 10;
		Guard.prototype.known = 10;
		refreshKnownTechniques();
	}
	character.experience = 0;
	character.recalculateStats();
	character.name = textInput.value;
	character.color = this.favColorPicker.color;
	switch (this.genderRadio.index) {
		case -1: return; break;
		case 0: character.gender = GENDER_MALE; break;
		case 1: character.gender = GENDER_FEMALE; break;
		case 2: character.gender = GENDER_OTHER; break;
	}
	hideTextInput();
	return true;
}
CharacterCreationScreen.prototype.changeColor = function(color) {
	textInput.style.color = color;
}

function beginNewGame() {
	GeneralEngine.objects = [];
	money = 0;
	currentTime = 1;
	dialog.begin(
		new DialogLine("Player", null, "Ugh... What time is it? Midnight?"),
		new DialogLine("Front door", null, "*knocking*"),
		new DialogLine("Player", null, "Who would that be at this time of night? I'll go answer it. I'm already up. No point in troubling anybody else."),
		new DialogLine("Player", null, "I open the door."),
		new DialogLine("Vertace", CHAR_SPRITES.Vertace.DialogNormal, "<Player>! Urgent!"),
		new DialogLine("Player", CHAR_SPRITES.Vertace.DialogNormal, "This is Vertace. He's the grandson and apprentice of Voh Claire, the town's seer."),
		new DialogLine("Vertace", CHAR_SPRITES.Vertace.DialogNormal, "I need you, <Companion>, Marcel, and M'treac to come to the observatory as soon as possible!"),
		new DialogLine("Player", CHAR_SPRITES.Vertace.DialogNormal, "I ask him why he's in such a hurry."),
		new DialogLine("Vertace", CHAR_SPRITES.Vertace.DialogNormal, "It's Voh Claire! She's had a vision, and it seems really bad! She told me to come get you four, Manz, and Poslo."),
		new DialogLine("Player", CHAR_SPRITES.Vertace.DialogNormal, "I ask what the vision was about."),
		new DialogLine("Vertace", CHAR_SPRITES.Vertace.DialogNormal, "I don't know, but it seems that you and <Companion> are involved - I don't think she'd call for you otherwise."),
		new DialogLine("Player", CHAR_SPRITES.Vertace.DialogNormal, "I agree to bring the family to the observatory."),
		new DialogLine("Vertace", CHAR_SPRITES.Vertace.DialogNormal, "Right. See you there."),
		
		new DialogLine("Player", null, "I shout for <Companion>, Marcel, and M'treac."),
		new DialogLine("Companion", null, "What is it?"),
		new DialogLine("Player", null, shipswitch(
					"This is <Companion>, my best friend. We've known each other since we were little.",
					"This is <Companion>, my "+cgender("brother","sister","sibling")+".",
					"This is <Companion>, my "+cgender("husband","wife","spouse")+"."
				)),
		new DialogLine("Player", null, "I briefly relay what Vertace told me."),
		new DialogLine("M'treac", CHAR_SPRITES.Mtreac.DialogNormal, "What? Claire's in trouble?"),
		new DialogLine("Player", CHAR_SPRITES.Mtreac.DialogNormal, shipswitch(
					"This is M'treac, <Companion>'s mother and my godmother.",
					"This is M'treac, my mother.",
					"This is M'treac, my mother-in-law."
				)),
		new DialogLine("Marcel", CHAR_SPRITES.Marcel.DialogNormal, "Let's go, then."),
		new DialogLine("Player", CHAR_SPRITES.Marcel.DialogNormal, shipswitch(
					"This is Marcel, <Companion>'s father and my godfather.",
					"This is Marcel, my father.",
					"This is Marcel, my father-in-law."
				)),
		function(){Pocutop.arrive();},
		new DialogLine("Player", null, "I lead the way to the observatory."),
	)
}
