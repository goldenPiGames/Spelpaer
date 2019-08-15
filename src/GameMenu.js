function openMenu(returnFunc) {
	let currentRunnee = runnee;
	switchScreen(new GameMenu(returnFunc || function(){runnee = currentRunnee}));
}

function GameMenu(returnFunc) {
	this.returnFunc = returnFunc;
	this.returnButton = new Button(settings.width-95, 5, 90, 40, "Return", "Close the game menu and return to what you were doing before.", this.returnFunc); 
	this.tabs = GAME_MENU_TAB_LIST.map((oj, dex, liss) => new BarTab(settings.width-95, dex*50+80, 90, 40, oj.title, oj.desc, oj.cons, this));
	this.subscreen = new GameMenuSatus();
}
GameMenu.prototype = Object.create(ScreenBase);

GameMenu.prototype.update = function() {
	this.tabs.forEach(function(oj) {
		oj.update();
	});
	this.subscreen.update();
	this.returnButton.update();
}
GameMenu.prototype.draw = function() {
	clearBack();
	this.tabs.forEach(function(oj) {
		oj.draw();
	});
	this.subscreen.draw();
	this.returnButton.draw();
}
GameMenu.prototype.setSubscreen = function(subconstruct) {
	this.subscreen = new subconstruct();
}

//------------------------------------------------------------------ Status ---------------------------------------------------

function GameMenuStatus() {
	
	this.objects = [
		player,
		companion,
	]
}
GameMenuStatus.prototype.update = function() {
	this.objects.forEach(function(oj) {
		oj.update();
	});
}
GameMenuStatus.prototype.draw = function() {
	this.objects.forEach(function(oj) {
		oj.draw();
	});
}

const GAME_MENU_TAB_LIST = [
	{title:"Status", desc:"Change music and SFX volume, profanity, and a few other things.", cons:GameMenuStatus},
	{title:"Spells", desc:"View, use, and sort <Player>'s spells.", cons:GameMenuSpells},
	{title:"Items", desc:"View, use, sort, and equip your items.", cons:GameMenuItems},
]