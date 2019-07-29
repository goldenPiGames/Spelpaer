var BasicPOI = function(name, description, stuff) {
	this.type = "";
	this.name = name;
	this.description = description;
	if (!Array.isArray(this.stuff));
		stuff = Array.prototype.slice.call(arguments, 2);
	this.stuff = stuff;
}
BasicPOI.prototype.activate = function() {
	dialog.begin(this.stuff);
}