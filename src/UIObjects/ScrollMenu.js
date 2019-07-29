const SCROLL_ELEMENT_HEIGHT = 22;
const SCROLL_BUTTON_HEIGHT = 30;
const SCROLL_BAR_WIDTH = 20;

var ScrollMenu = function(x, y, width, height, returnFunction, items = [], secondProperty = null, infoProperty = "description", enableProperty = function(val){return true}, highlightProperty = function(val){return false}) {
	var thisser = this;
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
	this.currentScroll = 0;
	this.maxEntries = Math.floor((height - 4) / SCROLL_ELEMENT_HEIGHT);
    this.clicked = false;
    this.hovered = false;
	this.active = true;
	this.returnFunction = returnFunction;
	this.upButton = new Button(x + width - SCROLL_BAR_WIDTH, y, SCROLL_BAR_WIDTH, SCROLL_BUTTON_HEIGHT, "↑", "Scroll up", function(){thisser.scrollUp();});
	this.downButton = new Button(x + width - SCROLL_BAR_WIDTH, y + height - SCROLL_BUTTON_HEIGHT, SCROLL_BAR_WIDTH, SCROLL_BUTTON_HEIGHT, "↓", "Scroll down", function(){thisser.scrollDown();});
	
	this.secondProperty = secondProperty;
	this.infoProperty = infoProperty;
	this.enableProperty = enableProperty;
	this.highlightProperty = highlightProperty;
	this.setItems(items);
}

ScrollMenu.prototype = Object.create(UIObjectBase);

ScrollMenu.prototype.setItems = function(items) {
	this.currentScroll = 0;
	this.items = items;
	this.maxScroll = Math.max(items.length-this.maxEntries, 0);
	this.itemElements = [];
	var newElement = null;
	for (var i = 0; i < this.maxEntries; i++) {
		newElement = new ScrollMenuElement(this.x, this.y + (i * SCROLL_ELEMENT_HEIGHT), this.width - SCROLL_BAR_WIDTH, SCROLL_ELEMENT_HEIGHT, this, items[i]);
		this.itemElements.push(newElement);
	}
}

ScrollMenu.prototype.scrollUp = function() {
	//console.log("up");
	this.currentScroll--;
	if (this.currentScroll < 0)
		this.currentScroll = this.maxScroll;
	this.putItems();
}

ScrollMenu.prototype.scrollDown = function() {
	//console.log("down");
	this.currentScroll++;
	if (this.currentScroll > this.maxScroll)
		this.currentScroll = 0;
	this.putItems();
}


ScrollMenu.prototype.putItems = function() {
	for(var i = 0; i < this.maxEntries; i++) {
		this.itemElements[i].setItem(this.items[i + this.currentScroll]);
	}
}

ScrollMenu.prototype.update = function() {
	this.maxScroll = Math.max(this.items.length - this.maxEntries, 0);
	this.upButton.update();
	this.downButton.update();
	for (var i = 0; i < this.itemElements.length; i++) {
		this.itemElements[i].update();
	}
}

ScrollMenu.prototype.draw = function() {
	ctx.fillStyle = settings.background_color;
	ctx.fillRect(this.x, this.y, this.width, this.height);
	ctx.strokeStyle = settings.normal_color;
	ctx.strokeRect(this.x + 1, this.y + 1, this.width - 2, this.height - 2);
	ctx.strokeRect(this.x + this.width - SCROLL_BAR_WIDTH + 1, this.y + SCROLL_BUTTON_HEIGHT + (this.height - SCROLL_BUTTON_HEIGHT * 2) * this.currentScroll / (this.maxEntries + this.maxScroll), SCROLL_BAR_WIDTH - 2, (this.height - SCROLL_BUTTON_HEIGHT * 2) * this.maxEntries / (this.maxEntries + this.maxScroll));
	
	this.upButton.draw();
	this.downButton.draw();
	for (var i = 0; i < this.itemElements.length; i++) {
		this.itemElements[i].draw();
	}
}

ScrollMenu.prototype.returnItem = function(value) {
	this.returnFunction(value, this);
}

/* ------------------------------------------------ Scroll Menu Elements -------------------------------------------*/
var ScrollMenuElement = function(x, y, width, height, parent, value) {
	this.parent = parent;
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
	this.selected = false;
    this.clicked = false;
    this.hovered = false;
	this.setItem(value);
	/*this.handler = function(){
		parent.returnItem(this.value);
	};*/
}
ScrollMenuElement.prototype = Object.create(UIObjectBase);

ScrollMenuElement.prototype.setItem = function(value) {
	this.value = value;
}

ScrollMenuElement.prototype.update = function() {
    this.updateStats();
	if (this.value != undefined) {
		if (this.hovered) {
			//console.log(this.value, this.parent.infoProperty, this.value[this.parent.infoProperty]);
			infoField.setText(typeof this.parent.infoProperty == "function" ? this.parent.infoProperty(this.value) : this.value[this.parent.infoProperty]);
		}
		if (this.clicked)
			this.parent.returnItem(this.value);
	}
}

ScrollMenuElement.prototype.draw = function() {
	if (this.value) {
		var color = this.parent.enableProperty(this.value) ? ((this.clicked || this.parent.highlightProperty(this.value)) ? settings.click_color : (this.hovered ? settings.hover_color : settings.normal_color)) : settings.disabled_color;
		//console.log(color)
		//text options
		var fontSize = this.height - 3;
		ctx.fillStyle = color;
		ctx.font = fontSize + "px "+settings.font;
		ctx.textBaseline = "top";
		ctx.textAlign = "left";
		//draw the text
		ctx.fillText(typeof this.value == "function" ? this.value.prototype.name : this.value.name, this.x+5, this.y+3);
		if (this.parent.secondProperty != null) {
			//var second = typeof this.parent.secondProperty == "function" ? this.parent.secondProperty(this.value) : this.value[this.parent.secondProperty];
			//ctx.fillText(second, this.x + this.width - ctx.measureText(second).width - 6, this.y+5);
			ctx.textAlign = "right";
			ctx.fillText(typeof this.parent.secondProperty == "function" ? this.parent.secondProperty(this.value) : this.value[this.parent.secondProperty], this.x + this.width-5, this.y+3);
		}
	}
}

/* --------------------------------------------------------- Scroll Bar ---------------------------------------------------- */

function ScrollBar(x, y, width, height, hoverText, size, max, handler, getter) {
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
	this.position = 0;
	this.text = text;
	this.hoverText = hoverText;
	this.min = min;
	this.max = max;
	this.handler = handler;
	this.getter = getter;
}
ScrollBar.prototype = Object.create(UIObjectBase);

ScrollBar.prototype.update = function() {
	this.updateStats();
	if (this.hovered && this.hoverText) {
		infoField.setText(this.hoverText);
	}
    if (this.held) {
		var portion;
		if (mouse.x < this.x)
			portion = 0;
		else if (mouse.x >= this.x+this.width)
			portion = 1;
		else
			portion = (mouse.x-this.x)/this.width;
		this.handler(this.min + portion*(this.max-this.min));
	}
}

ScrollBar.prototype.draw = function() {
	var portion = (this.getter()-this.min)/(this.max-this.min);
	
	ctx.globalAlpha = 1;
	ctx.fillStyle = settings.background_color;
	ctx.fillRect(this.x, this.y, this.width, this.height);
	
	var color = this.held ? settings.click_color : (this.hovered ? settings.hover_color : settings.normal_color);
	ctx.strokeStyle = color;
	ctx.strokeRect(this.x-BUTTON_BORDER_WIDTH/2, this.y+BUTTON_BORDER_WIDTH/2, this.width+BUTTON_BORDER_WIDTH, this.height-BUTTON_BORDER_WIDTH);
	ctx.fillStyle = color;
	ctx.fillRect(this.x, this.y, this.width*portion, this.height);
}