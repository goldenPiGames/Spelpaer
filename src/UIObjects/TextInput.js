var textInput;

function initTextInput() {
	textInput = document.getElementById("TextInput");
}

function setTextInput(x, y, width, height, text) {
	showTextInput();
	textInput.style.left = x;
	textInput.style.top = y;
	textInput.style.width = width;
	textInput.style.height = height;
	textInput.style.fontSize = (height-8)+"px";
	textInput.placeholder = text;
	textInput.value = "";
}

function showTextInput() {
	textInput.hidden = false;
}

function hideTextInput() {
	textInput.hidden = true;
}