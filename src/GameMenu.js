function openGameMenu(returnFunc) {
	let currentRunnee = runnee;
	switchScreen(new GameMenu(returnFunc || function(){switchScreen(currentRunnee)}));
}

function GameMenu(returnFunc) {
	this.returnFunc = returnFunc;
	this.returnButton = new Button(settings.width-95, 5, 90, 40, "Return", "Close the game menu and return to what you were doing before.", this.returnFunc); 
	this.tabs = GAME_MENU_TAB_LIST.map((oj, dex, liss) => new BarTab(settings.width-95, dex*50+80, 90, 40, oj.title, oj.desc, oj.cons, this));
	this.subscreen = new GameMenuStatus();
}
GameMenu.prototype = Object.create(ScreenBase);

GameMenu.prototype.update = function() {
	advanceTime(1, true);
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
	var mid = Math.floor(settings.width*2/3 - 50);
	player.setDisplay(0, 0, mid, mainHeight()/2, this, PC_DISPLAYMODE_DETAIL);
	companion.setDisplay(0, mainHeight()/2, mid, mainHeight()/2, this, PC_DISPLAYMODE_DETAIL);
	this.objects = [
		player,
		companion,
	]
}
GameMenuStatus.prototype.update = function() {
	this.objects.forEach(oj=>oj.update());
}
GameMenuStatus.prototype.draw = function() {
	this.objects.forEach(oj=>oj.draw());
}
GameMenuStatus.prototype.unitClicked = function() {
	
}

//------------------------------------------------------------------ Spells ---------------------------------------------------

function GameMenuSpells() {
	var mid = Math.floor(settings.width*2/3 - 50);
	this.spellMenu = new ScrollMenu(mid, 0, settings.width - 100 - mid, mainHeight() - 50, (val)=>this.selectedSpell=val, player.spells, sp=>sp.getCDDesc(player), "description", sp=>sp.isAvailable(), (sp)=>sp==this.selectedSpell);
	player.setDisplay(0, 0, mid, mainHeight()/2, this, PC_DISPLAYMODE_DETAIL);
	companion.setDisplay(0, mainHeight()/2, mid, mainHeight()/2, this, PC_DISPLAYMODE_DETAIL);
	this.objects = [
		this.spellMenu,
		player,
		companion,
	]
}
GameMenuSpells.prototype.update = function() {
	this.objects.forEach(oj=>oj.update());
	if (this.selectedSpell && this.selectedCharacter) {
		battle.executeAction(this.selectedCharacter, this.selectedSpell, this.selectedCharacter);
		//this.spellMenu.putItems();
		this.selectedSpell = null;
		this.selectedCharacter = null;
	}
}
GameMenuSpells.prototype.draw = function() {
	this.objects.forEach(oj=>oj.draw());
}
GameMenuSpells.prototype.unitClicked = function(unit) {
	if (this.selectedSpell)
		this.selectedCharacter = unit;
}

//------------------------------------------------------------------ Items ---------------------------------------------------

function GameMenuItems() {
	var mid = Math.floor(settings.width*2/3 - 50)
	this.itemMenu = new ScrollMenu(mid, 0, settings.width - 100 - mid, mainHeight() - 50, (val)=>this.selectedItem=val, inventory, "spec", "flavor", ()=>true, (val)=>val==this.selectedItem);
	player.setDisplay(0, 0, mid, mainHeight()/2, this, PC_DISPLAYMODE_EQUIP);
	companion.setDisplay(0, mainHeight()/2, mid, mainHeight()/2, this, PC_DISPLAYMODE_EQUIP);
	this.objects = [
		this.itemMenu,
		player,
		companion,
	]
}
GameMenuItems.prototype.update = function() {
	this.objects.forEach(oj=>oj.update(this.selectedItem));
	if (this.selectedItem && this.selectedCharacter) {
		battle.executeAction(this.selectedCharacter, this.selectedItem, this.selectedCharacter);
		this.itemMenu.putItems();
		this.selectedItem = null;
		this.selectedCharacter = null;
	}
}
GameMenuItems.prototype.draw = function() {
	let tem = this.itemMenu.hoveredValue || this.selectedItem;
	this.objects.forEach(oj=>oj.draw(tem))
}
GameMenuItems.prototype.unitClicked = function(unit) {
	if (this.selectedItem)
		this.selectedCharacter = unit;
}

const GAME_MENU_TAB_LIST = [
	{title:"Status", desc:"Change music and SFX volume, profanity, and a few other things.", cons:GameMenuStatus},
	//{title:"Tree", desc:"Level up <Companion>'s techniques.", cons:GameMenuTree}, //TODO
	//{title:"Palette", desc:"View and equip <Companion>'s techniques.", cons:GameMenuPalette}, //TODO
	{title:"Spells", desc:"View, use, and sort <Player>'s spells.", cons:GameMenuSpells},
	{title:"Items", desc:"View, use, sort, and equip your items.", cons:GameMenuItems},
	//{title:"Calendar", desc:"View the calendar.", cons:GameMenuCalendar},
]