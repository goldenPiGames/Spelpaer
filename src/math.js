function randomTerm(ray) {
	return ray[Math.floor(Math.random() * ray.length)];
}

function randomN(max = 1) {
	return -max + 2 * max * Math.random();
}

function round(num, precision) {
	var mult = Math.pow(10, precision);
	return Math.round(num*mult)/mult;
}

function PRound(num, seed) {
	var whole = Math.floor(num);
	var partial = num-whole;
	if (seed == undefined)
		return whole + ((Math.random() < partial) ? 1 : 0);
	return whole + ((seed < partial) ? 1 : 0);
}

function raffle(weight, item) {
	var args = Array.prototype.slice.call(arguments);
	var weights = [];
	var totalWeight = 0;
	var items = [];
	while (args.length > 0) {
		let newWeight = args.shift();
		totalWeight += newWeight;
		weights.push(newWeight);
		items.push(args.shift());
	}
	var chosen = totalWeight * Math.random();
	var i = 0;
	var soFar = 0;
	while (i < weights.length) {
		soFar += weights[i];
		if (chosen < soFar)
			return items[i];
		i++;
	}
	return null;
}


function asPercent(num, precision) {
	return round(num*100, precision)+"%";
}

function fillLeft(str, length, filler="0") {
	str = "" + str;
	while(str.length < length) {
		str = filler+str;
	}
	return str;
}

//https://stackoverflow.com/questions/17428587/transposing-a-2d-array-in-javascript
function transposeArray(array) {
	var newArray = [];
	for(var i = 0; i < array[0].length; i++){
		newArray.push([]);
	}
	for(var i = 0; i < array.length; i++){
		for(var j = 0; j < array[0].length; j++){
			newArray[j].push(array[i][j]);
		}
	}
	return newArray;
}
