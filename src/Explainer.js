var Explainer = new BasicPOI("The Explainer", "An enigmatic wanderer who seems to know much about the inner workings of the world.",
	new DialogLine("Explainer", null, "So was there anything you wanted to have explained to you? Be warned, my explanations tend to be rather nuanced."),
	new DialogSplit("Player", null, "I'd like to know about...",
		new DialogSplitChoice("Damage", explainDamage),
		new DialogSplitChoice("Hit chance", explainHitChance),
		new DialogSplitChoice("Gaining experience", explainExperience),
		new DialogSplitChoice("Leveling up stats", explainLevelUpStats),
		new DialogSplitChoice("Never mind.", doNothing)),
	new DialogLine("Explainer", null, "Oh, well. See you again, perhaps.")
);

function explainDamage() {
	dialog.begin(new DialogLine("Explainer", null, "dmg = pow * lvl * eff * 2 * atk / (atk + def); where pow = base power, lvl = level, atk = attack stat, and def = defense stat."),
	new DialogLine("Explainer", null, "The most important factor is base power, which is inherent to the particular technique or spell. The basic attack has a power of 1.0. Power is directly proportional to damage, so Power Attack, with 1.5 power, does 1.5x as much damage as the basic attack."),
	new DialogLine("Explainer", null, "Also very important is level. For techniques, this is the level of the user, while for spells, it is the level of the spell. Level is also directly proportional to damage."),
	new DialogLine("Explainer", null, "Next is the attack stat. Each particular technique or skill determines which of the attacker's stats is used. Almost all techniques use Strength, and most damaging spells use Intelligence."),
	new DialogLine("Explainer", null, "Then there's the defense stat. Each particular technique or skill determines which of the defender's stats is used. Almost all techniques use Constitution, and most damaging spells use Wisdom."),
	new DialogLine("Explainer", null, "The damage is also modified by effectiveness: effectiveness is usually 100%, while a weakness is greater than 100% and a resistance is less than 100%. A negative effectiveness means that the unit absorbs (heals from) that type of damage."),
	ReadEffectiveness,
	new DialogLine("Explainer", null, "Here's a spell called Read Effectiveness. You can cast it on any unit to learn its effectiveness. If something isn't listed, it's 100%."),
	new DialogLine("Explainer", null, "By the way, the two of you by default have -150% effectiveness from Positive Energy and 100% effectiveness from everything else."),
	new DialogLine("Explainer", null, "After everything else, the damage is almost certain to be a decimal. It is converted to an integer using the PRound function (Probability Round), so, for example, 10.3 would have a 30% chance of being 11 and a 70% chance of being 10, thereby averaging 10.3"));
}

function explainHitChance() {
	dialog.begin(new DialogLine("Explainer", null, "truerate = rate * acc / (rate * acc + (1-rate) * eva); where rate = base hitrate, acc = accuracy stat, and eva = evasion stat."),
	new DialogLine("Explainer", null, "The most important factor is the base hitrate, which is inherent to the particular technique or spell. The basic attack has a base hitrate of 75%. Most direct-damage techniques and spells range from 60% (e.g. Power Attack) to 85% (e.g. Quick Slash)."),
	new DialogLine("Explainer", null, "Next is the accuracy stat. Each particular technique or skill determines which of the attacker's stats is used. Almost all techniques, and many damaging spells, use Dexterity."),
	new DialogLine("Explainer", null, "Lastly is the evasion stat. Each particular technique or skill determines which of the defender's stats is used. Almost all techniques, and many damaging spells, use Agility."),
	new DialogLine("Explainer", null, "There are a few things to note about this formula. Firstly, if the accuracy stat and the evasion stat are the same, then the hit chance will simply be the base hitrate."),
	new DialogLine("Explainer", null, "Let's say you're attacking an enemy using a technique with a base hitrate of 50% that uses Dexterity for accuracy and Agility for evasion. Imagine it like a raffle."),
	new DialogLine("Explainer", null, 'You add a quantity of tickets equal to your Dexterity, all marked "Hit". The enemy likewise adds a quantity of tickets equal to its Agility, all marked "Miss". One ticket is drawn at random to determine the outcome of the attack.'));
}

function explainExperience() {
	dialog.begin(new DialogLine("Explainer", null, "You gain experience by defeating enemies in battle. Experience is used to level up."),
	(companion ? new DialogLine("Companion", null, "You don't say.") : new DialogLine("Explainer", null, "...Okay, that was a bit obvious")),   
	new DialogLine("Explainer", null, "Unlike many other RPGs, you do not keep accumulating experience. When your experience exceeds the amount required for the next level, that amount is removed from your amount."),
	new DialogLine("Explainer", null, "The experience required for each level is your current level to the power of 2.2, times 5. You can see how much more you need by mousing over your character's level."),
	new DialogLine("Explainer", null, "Most enemy's experience yield is simply equal to its level times its maximum hit points. (There are some exceptions to this.) Since hit points scale directly with level, an enemy's experience yield is effectively quadratic to its level."),
	new DialogLine("Explainer", null, "If you keep fighting appropriately leveled enemies, your leveling rate will not slow very much at high levels."),
	new DialogLine("Explainer", null, "Also worth noting is that the experience reward is calculated at the end of the battle, based on all of the defeated enemies. So if an enemy is killed and then replaced with another summoned unit, only the last enemy gives experience."));
}

function explainLevelUpStats() {
	dialog.begin(new DialogLine("Explainer", null, "Each currentTime you level up, first of all your level increases by 1 and your HP increases by 10 points."),
	new DialogLine("Explainer", null, "You are presented with two different stats, and pick one of them to increase by 1 point."),
	new DialogLine("Explainer", null, "The process used to determine the available stats is deterministic, so you can't min-max by save-scumming."),
	new DialogLine("Explainer", null, "But I keep changing how those stats are determined."),
	/*
	new DialogLine("Explainer", null, "The first stat available is simple. Take your level (what you just increased to, not what you just were) modulo 7. 0=Strength, 1=Constitution, 2=Intelligence, 3=Wisdom, 4=Dexterity, 5=Agility, and 6=Charisma"),
	new DialogLine("Explainer", null, "The second stat available depends on the character."),
	new DialogLine("Explainer", null, "For " + (player ? player.name : "the player") + ", take your level modulo 4. 0=Intelligence, 1=Wisdom, 2=Charisma, 3=Dexterity."),
	new DialogLine("Explainer", null, "For " + (companion ? companion.name : "the companion") + ", take your level modulo 3. 0=Strength, 1=Constitution, 2=Dexterity."),
	new DialogLine("Explainer", null, "If both choices are the same, then the second choice is Agility instead.")*/
	);
}