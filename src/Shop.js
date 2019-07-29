var Shop = {
	type : "Shop",
	activate : function() {
		this.buildScreen();
	},
	buildScreen : function() {
		var thisser = this;
		this.hovered = false;
		this.clicked = false;
		var bgimg = new ImageHolder(250, 0, this.image);
		var shopMenu = new ScrollMenu(0, 0, 300, 450, tryToBuy, this.getItems(), "price");
		var leaveButton = new Button(605, 405, 190, 40, "Return", "Exit to "+this.Locale.name, function(){thisser.Locale.buildScreen();});
		var moneyDisplay = new MoneyDisplay(400, 3, 395, 24);
		engine.gameObjects = [bgimg, leaveButton, shopMenu, moneyDisplay];
	},
}

//---------------------------------------- Shop Spell --------------------------------
/*
var ShopSpell = function(spel) {
	this.spell = spel;
	this.name = this.spell.name;
	this.price = this.spell.price;
	this.description = this.spell.description;
}
ShopSpell.prototype.isSpell = true;

ShopSpell.prototype.purchase = function() {
	this.spell.known = true;
}

ShopSpell.prototype.canBeBought = function() {
	return !this.spell.known;
}
*/

function tryToBuy(item) {
	if (money < item.price)
		return;
	if (!item.canBeBought())
		return;
	item.purchase();
	money -= item.price;
}

var BasicInn = function(name, price) {
	type : "Inn"
	this.name = name;
	this.price = price;
}
BasicInn.prototype.type = "Inn";
BasicInn.prototype.activate = function() {
	var price = this.price;
	dialog.begin(new DialogSplit("Inkeep", null, "It would cost "+this.price+" to stay at this inn. Would you like to stay?",
		new DialogSplitChoice("Yes (costs "+price+", have "+money+")", function(){money -= price; longRest();}),
		new DialogSplitChoice("No")));
}