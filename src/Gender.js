const GENDER_NONE = 0;
const GENDER_MALE = 1;
const GENDER_FEMALE = 2;
const GENDER_OTHER = 3;
const GENDER_PLURAL = 3;

Unit.getPronoun = function(tense) {
	switch ((this.gender || 0) + tense) {
		case GENDER_NONE+"Subject": return "It"; break;
		case GENDER_NONE+"subject": return "it"; break;
		case GENDER_NONE+"Object": return "It"; break;
		case GENDER_NONE+"object": return "it"; break;
		case GENDER_NONE+"Possessive": return "Its"; break;
		case GENDER_NONE+"possessive": return "its"; break;
		
		case GENDER_MALE+"Subject": return "He"; break;
		case GENDER_MALE+"subject": return "he"; break;
		case GENDER_MALE+"Object": return "Him"; break;
		case GENDER_MALE+"object": return "him"; break;
		case GENDER_MALE+"Possessive": return "His"; break;
		case GENDER_MALE+"possessive": return "his"; break;
		
		case GENDER_FEMALE+"Subject": return "She"; break;
		case GENDER_FEMALE+"subject": return "she"; break;
		case GENDER_FEMALE+"Object": return "Her"; break;
		case GENDER_FEMALE+"object": return "her"; break;
		case GENDER_FEMALE+"Possessive": return "Her"; break;
		case GENDER_FEMALE+"possessive": return "her"; break;
		
		case GENDER_OTHER+"Subject": return "They"; break;
		case GENDER_OTHER+"subject": return "they"; break;
		case GENDER_OTHER+"Object": return "Them"; break;
		case GENDER_OTHER+"object": return "them"; break;
		case GENDER_OTHER+"Possessive": return "Their"; break;
		case GENDER_OTHER+"possessive": return "their"; break;
		
		default: throw tense + "is not a valid tense."; break;
	}
}

function pgender(male, female, other) {
	if (!other)
		throw "Option for Other gender missing.";
	switch (player.gender) {
		case GENDER_MALE: return male; break;
		case GENDER_FEMALE: return female; break;
		case GENDER_OTHER: return other; break;
	}
}

function cgender(male, female, other) {
	if (!other)
		throw "Option for Other gender missing.";
	switch (companion.gender) {
		case GENDER_MALE: return male; break;
		case GENDER_FEMALE: return female; break;
		case GENDER_OTHER: return other; break;
	}
}