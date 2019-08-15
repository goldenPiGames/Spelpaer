function getSpoils(xp, tech, cash, stuff, after) {
	player.experience += xp;
	companion.experience += xp;
	companion.techniquePoints += tech;
	money += cash;
	inventory.push(...stuff);
	switchScreen(new SpoilsScreen(xp, tech, cash, stuff, after));
}

function SpoilsScreen(xp, tech, cash, stuff, after) {
	/*var thisser = this;
	this.after = after;
	this.experience = xp;
	this.moneyBefore;
	this.money = cash;
	this.items = stuff;
	this.playerExperienceBefore = player.experience;
	this.companionExperienceBefore = companion.experience;
	this.moneyBefore = money;*/
	this.objects = [
		new Label(settings.width/3, 5, settings.width/3, 35, "Spoils", "What you gained from battle. Or whereever. This screen doesn't actually know where you got it from."),
		new Label(settings.width/3, 50, settings.width/3, 30, "Experience: "+xp, "This is how much experience you got just now. Both characters get full experience; it's not divided."),
		new SpoilsXPDisplay(100, 35, player, xp),
		new SpoilsXPDisplay(150, 35, companion, xp),
		new Label(settings.width/3, 195, settings.width/3, 25, "Technique Points: "+tech, "This is how many Technique Points <Companion> gained. "+cgender("He", "She", "They")+" can use them to learn and upgrade "+cgender("his", "her", "their")+" Techniques."),
		new Label(0, mainHeight()-100, 200, 40, "+"+cash, "How much money you just got."),
		new MoneyDisplay(0, mainHeight()-50, 200, 40),
		new Button(settings.width - 200, mainHeight()-50, 195, 40, "Continue", "Go on. Level yourself up or whatever.", function() {checkLevelUps(after)}),
	];
	stuff.forEach((oj, dex) => this.objects.push(new Label(settings.width/2-100, 250+dex*35, 200, 25, oj.name, oj.description || oj.description)));
	
}
SpoilsScreen.prototype.update = function() {
	this.objects.forEach((oj)=>oj.update());
}
SpoilsScreen.prototype.draw = function() {
	clearBack();
	this.objects.forEach((oj)=>oj.draw());
}

function SpoilsXPDisplay(y, height, character, justGained) {
	this.y = y;
	this.height = height;
	this.character = character;
	this.description = "exp TODO details";
	this.barX = 150;
	this.barWidth = settings.width - this.barX - 5;
	this.justGained = justGained;
}
SpoilsXPDisplay.prototype = Object.create(UIObjectBase);
SpoilsXPDisplay.prototype.update = function() {
	this.updateMouse();
	if (this.hovered)
		infoField.setText(this.description);
}
SpoilsXPDisplay.prototype.draw = function() {
	ctx.fillStyle = this.character.color;
	ctx.font = this.height + "px " + settings.font;
	ctx.textAlign = "right";
	ctx.fillText(this.character.name, this.barX-5, this.y);
	ctx.lineWidth = 2;
	ctx.strokeStyle = settings.normal_color;
	ctx.strokeRect(this.barX, this.y, this.barWidth, this.height);
	ctx.fillStyle = settings.click_color;
	ctx.fillRect(this.barX, this.y, this.barWidth * Math.min(this.character.experience/forNextLevel(this.character.level), 1.0), this.height);
	ctx.fillStyle = settings.normal_color;
	ctx.fillRect(this.barX, this.y, this.barWidth * (this.character.experience-this.justGained)/forNextLevel(this.character.level), this.height);
	
}