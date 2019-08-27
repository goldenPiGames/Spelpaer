const ITEMS_BY_NAME = {};

ITEMS.forEach(function(tem) {
	ITEMS_BY_NAME[tem.name] = tem;
	tem.prototype.iname = tem.name;
});

function loadItem(str) {
	var itemName;
	var pipe = str.indexOf("|");
	if (pipe >= 0) {
		return new (ITEMS_BY_NAME[str.substring(0, pipe)])(str.substring(pipe+1));
	} else
		return new (ITEMS_BY_NAME[str])();
}

function saveItem(tem) {
	if (tem.spec)
		return tem.iname + "|" + tem.spec;
	else
		return tem.iname;
}