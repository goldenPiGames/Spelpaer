var currentTime = 0;
const SECONDS = 30;
const MINUTES = 60*SECONDS;
const HOURS = 60*MINUTES;
const DAYS = 24*HOURS;

const APOCALYPSE_INITIAL_1 = 60*DAYS;
const APOCALYPSE_EXTEND_1 = 30*DAYS;

const APOCALYPSE_INITIAL_2 = 40*DAYS;
const APOCALYPSE_EXTEND_2 = 20*DAYS;

function advanceTime(amount, tick) {
	currentTime += amount;
	if (tick) {
		player.fieldTick(amount);
		companion.fieldTick(amount);
	}
}

function getDisplayTime(hora = "current") {
	if (hora == "current")
		hora = currentTime;
	return "Day " + Math.floor(hora/DAYS) + ", " + fillLeft(Math.floor((hora%DAYS)/HOURS), 2, "0") + ":" + fillLeft(Math.floor((hora%HOURS)/MINUTES), 2, "0") + ":" + fillLeft(Math.floor((hora%MINUTES)/SECONDS), 2, "0");
}

function getShortDuration(toki) {
	return (toki >= DAYS ? Math.floor(toki/DAYS) + ", " : "") + ((toki%DAYS) >= HOURS ? Math.floor((toki%DAYS)/HOURS) + ":" : "") + fillLeft(Math.floor((toki%HOURS)/MINUTES), (toki%DAYS) >= HOURS ? 2 : 1, "0") + ":" + fillLeft(Math.floor((toki%MINUTES) / SECONDS), 2, "0");
}

function getLongDuration(toki) {
	return (toki >= DAYS ? Math.floor(toki/DAYS) + " days, " : "") + fillLeft(Math.floor((toki%DAYS)/HOURS), 2, "0") + " hours, " + fillLeft(Math.floor((toki%HOURS)/MINUTES), 2, "0") + " minutes";
}

function getApocalypseTime() {
	switch (difficulty) {
		case 0 : return Infinity; break;
		case 1 : return APOCALYPSE_INITIAL_1 + APOCALYPSE_EXTEND_1 * numberOfAnqorsPurified();
		case 2 : return APOCALYPSE_INITIAL_2 + APOCALYPSE_EXTEND_2 * numberOfAnqorsPurified();
	}
}

function timeToApocalypse() {
	return getApocalypseTime()-currentTime;
}

function daysToApocalypse() {
	return Math.ceil((getApocalypseTime()-currentTime)/DAYS);
}

function timeOfDayBetween(start, end, hora = "current") {
	if (hora == "current")
		hora = currentTime;
	if (start > end)
		return !timeOfDayBetween(end, start, hora)
	dora = hora % DAYS;
	return dora >= start && dora < end;
}

function timeSince(timb) {
	return currentTime - timb;
}