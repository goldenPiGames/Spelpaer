const ITEMS = [];

var inventory = [];

var Item = {
	usableInBattle : false,
	key : false,
	weight : 0,
	value : 0,
	spec : "",
	expend : function() {
		var dex = inventory.indexOf(this);
		if (dex >= 0)
			inventory.splice(dex, 1);
	},
}