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
			"When you get a game over, you can reload your last save (the last time you took a long rest)."],
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
	playMusic("Decisions");
	setTextInput(400, 10, 400, 60, "Name");
	runnee = GeneralEngine;
	var playerGenderRadio = new RadioButtons(10, 125, 200, 25, ["Male", "Female"], settings.playerColor);
	var favColorPicker = new ColorPicker(settings.width-280, 125, "Color", "The color that generally represents the player.");
	GeneralEngine.objects = [
		//new Label(400, 10, 400, 60, "Player", "This will be you, effectively."),
		new Label(10, 100, 200, 20, "Gender", ""),
		playerGenderRadio,
		favColorPicker,
		new Button(990, 610, 200, 40, "Continue", "Continue on to the next step. Note: You CANNOT go back and change these things later.", 
			function() {
				var pgender;
				switch (playerGenderRadio.index) {
					case -1: return; break;
					case 0: pgender = true; break;
					case 1: pgender = false; break;
				}
				var pname = textInput.value;
				if (pname == 0)
					return;
				player = new Player();
				player.gender = pgender;
				player.color = favColorPicker.color;
				player.name = pname;
				player.stats = statMultsToArray({
					Vitality : 1.0,
					Strength : .8,
					Constitution : .8,
					Dexterity : .9,
					Agility : .9,
					Intelligence : 1.2,
					Wisdom : 1.2,
					Charisma : 1.2,
					Potential : 1.0,
				});
				player.maxhp = player.Vitality * 10;
				player.hp = player.maxhp;
				player.Weapon = 0;
				player.Armor = 5;
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
				GeneralEngine.objects = [];
				hideTextInput();
				dialog.begin(
					new DialogLine("Obaliiv", null, "Now for the secondary vessel."),
					new DialogLine("Obaliiv", null, "This person will be a constant companion to <Player>."),
					buildCompanionCreation,
				)
			}),
	];
}

function buildCompanionCreation() {
	var companionGenderRadio = new RadioButtons(10, 125, 200, 25, ["Male", "Female"],);
	var relationshipRadio = new RadioButtons(410, 125, 200, 25, ["Friends", "Siblings", "Spouses"], ["They're as close as friends can be.", "They have the same parents.", "They're already married. Use your imagination."]);
	var favColorPicker = new ColorPicker(settings.width-280, 125, "Color", "The color that generally represents the player.");
	setTextInput(400, 10, 400, 60, "Name");
	GeneralEngine.objects = [
		new Label(10, 100, 200, 20, "Gender", "Mostly just affects appearance. This doesn't affect any stats or anything."),
		companionGenderRadio,
		new Label(410, 100, 200, 20, "Relationship", "What is this individual's relationship to <Player>? This doesn't affect any stats or anything. Alters some dialog."),
		relationshipRadio,
		favColorPicker,
		new Button(990, 610, 200, 40, "Continue", "Continue on to the next step. Note: You CANNOT go back and change these things later (unless you start a new file, of course).", 
			function() {
				if (relationshipRadio.index == -1)
					return;
				relationshipType = relationshipRadio.index;
				var cgender;
				switch (companionGenderRadio.index) {
					case -1: return; break;
					case 0: cgender = true; break;
					case 1: cgender = false; break;
				}
				var cname = textInput.value;
				if (cname == 0)
					return;
				companion = new Companion();
				companion.gender = cgender;
				companion.name = cname;
				companion.color = favColorPicker.color;
				companion.Vitality = 10;
				companion.Strength = 12;
				companion.Constitution = 12;
				companion.Dexterity = 11;
				companion.Agility = 11;
				companion.Intelligence = 8;
				companion.Wisdom = 8;
				companion.Charisma = 8;
				companion.Potential = 10;
				companion.maxhp = companion.Vitality * 10;
				companion.hp = companion.maxhp;
				companion.Weapon = 10;
				companion.Armor = 10;
				BasicAttack.prototype.known = 10;
				PowerChop.prototype.known = 10;
				Cleave.prototype.known = 10;
				QuickStab.prototype.known = 10;
				ArmorPierce.prototype.known = 10;
				StunningFist.prototype.known = 10;
				Guard.prototype.known = 10;
				refreshKnownTechniques();
				beginNewGame();
			}),
	];
}

function beginNewGame() {
	hideTextInput();
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
		new DialogLine("Vertace", CHAR_SPRITES.Vertace.DialogNormal, "I don't know, but it seems that you and <Companion> are involved - I don't think she's call for you otherwise."),
		new DialogLine("Player", CHAR_SPRITES.Vertace.DialogNormal, "I agree to bring the family to the observatory."),
		new DialogLine("Vertace", CHAR_SPRITES.Vertace.DialogNormal, "Right. See you there."),
		
		new DialogLine("Player", null, "I shout for <Companion>, Marcel, and M'treac."),
		new DialogLine("Companion", null, "What is it?"),
		new DialogLine("Player", null, shipswitch(
					"This is <Companion>, my best friend. We've known each other since we were little.",
					"This is <Companion>, my "+cgender("brother","sister")+".",
					"This is <Companion>, my "+cgender("husband","wife")+"."
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
