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
			()=>{difficulty = 0; preGameIntro()}),
		new Button(bwidth, 200, bwidth, 50, DIFFICULTY_NAMES[1], [
			"For people who like the authentic experience.",
			"Battles occur in real time.",
			//"Time advances in real time outside of battle.",
			"The apocalypse approaches steadily.",
			"Experience gain is normal.",
			"When you get a game over, you can reload your last save."],
			()=>{difficulty = 1; preGameIntro()}, false),
		new Button(bwidth, 300, bwidth, 50, DIFFICULTY_NAMES[2], [
			"For people who like to be in a constant state of panic. Not for first-timers.",
			"Battles occur in real time.",
			//"Time advances in real time outside of battle.",
			"The apocalypse approaches a little faster.",
			"Experience gain is increased.",
			"When you get a game over, your save is instantly deleted."],
			()=>{difficulty = 2; preGameIntro()}, false),
	]
}

function preGameIntro() {
	playMusic("Decisions");
	runnee = GeneralEngine;
	currentTime = 0;
	GeneralEngine.objects = [];
	dialog.begin(
		new DialogLine("Obaliiv", null, "So, you're finally here? I'll admit, I had almost given up."),
		new DialogLine("Obaliiv", null, "...I mean, of course not. I've been diligently performing my duty, of course. I mean, me, slacking off? Perish the thought."),
		new DialogLine("Obaliiv", null, "I've got some people ready, let me just connect you to Marcel and Manz. It'll be just a moment on your end."),
		new DialogLine("Obaliiv", null, "..."),
		new DialogLine("Obaliiv", null, "...You still there? Didn't go through?"),
		new DialogLine("Obaliiv", null, "Figures. Lousy little clump."),
		new DialogLine("Obaliiv", null, "Well, at least it didn't notice you. I mean, of course it didn't notice you, the metaface connection protocol didn't even get past the real-side phase, how would it have noticed you? Stupid council, always worrying about all the wrong things...."),
		new DialogLine("Obaliiv", null, "Welp, time for the backup plan. I'll just have to have some people custom-made for you instead."),
		new DialogLine("Obaliiv", null, "...I mean, I told them that establishing a metaface with preexisting humans wouldn't work, and we should've gone with the homosynthesizer as our Plan A, but did they listen?"),
		new DialogLine("Obaliiv", null, "Nooooooooooooooooo, of course they didn't."),
		new DialogLine("Obaliiv", null, "Yes, of course the memetics expert and the bog-standard administrator are more qualified to talk about theoretical metapsionics than the world's leading expert on theoretical metapsionics. That makes sense, of course, right?"),
		new DialogLine("Obaliiv", null, "... Anyway, yeah. Down to business."),
		new DialogLine("Obaliiv", null, "I was thinking two would be best, one caster and one fighter, cover your bases but not dilute the potential too much, you know?"),
		new DialogLine("Obaliiv", null, "Just tell me what you want, I'll have them ready in a decade or two."),
		new DialogLine("Obaliiv", null, "Let's get started. First up, the spellcaster, who'll also be your primary vessel."),
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
		//this.relationshipRadio = new RadioButtons(10, 275, 200, 25, ["Friends", "Siblings", "Spouses"], ["They're as close as friends can be.", "They have the same parents.", "They're already married. Use your imagination."]);
		//this.objects.push(this.relationshipRadio);
	}
	setTextInput(settings.width/4, 10, settings.width/2, 60, "Name");
	this.changeColor(defaultColor);
}
CharacterCreationScreen.prototype = Object.create(ScreenBase);
CharacterCreationScreen.prototype.update = function() {
	this.continueButton.active = !!textInput.value && this.genderRadio.index >= 0 && (!this.relationshipRadio || this.relationshipRadio.index >= 0)
	this.objects.forEach(oj=>oj.update());
}
CharacterCreationScreen.prototype.draw = function() {
	clearBack();
	this.objects.forEach(oj=>oj.draw());
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
				Implement : 0,
				Resistance : 0,
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
		/*if (!(this.relationshipRadio.index >= 0))
			return false;
		relationshipType = this.relationshipRadio.index;*/
		relationshipType = 0;
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
				Implement : 0,
				Resistance : 0,
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
	console.log(this.favColorPicker.color);
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
	inventory = [
		new HealingPotion(40),
		new HealingPotion(15),
		new HealingPotion(15),
	];
	currentTime = 1;
	dialog.begin(
		new DialogLine("Player", null, "I wake up with a start. I'm not sure why."),
		new DialogLine("Player", null, "I feel like I had some sort of weird dream that I just forgot completely."),
		new DialogLine("Front door", null, "*knocking*"),
		new DialogLine("Player", null, "I wonder who would be knocking at this time of night. I get up to answer it."),
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
		new DialogLine("Companion", null, "*asks why I'm shouting*"),
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
		function(){PocutopHome.arrive();},
		new DialogLine("Player", null, "I lead the way to the observatory."),
		()=>tutorialOverlay.begin(
			{text:"Click this button to exit your house.", textX:settings.width/2, textY:settings.height/3, textWidth:250, textHeight:200, opening:runnee.leaveButton, updateRunnee:UPDATE_RUNNEE_IN_OPENING, advance:(()=>currentLoc!=PocutopHome)},
			{text:"Now select the Observatory to go there.", opening:runnee.POImenu, advance:(()=>currentLoc==PocutopObservatory)},
		)
	)
}
