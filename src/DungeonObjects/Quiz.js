var Quiz = {
	__proto__ : UIObjectBase,
	width : 800,
	submitButton : new Button(605, 405, 190, 40, "Submit", "Confirm your selection."),
	begin : function(questions, correctToWin, wrongToLose, winFunction, loseFunction) {
		this.questions = (questions.slice()).sort(function(){return .5-Math.random()});
		this.index = 0;
		this.correctToWin = correctToWin; this.wrongToLose = wrongToLose;
		this.correct = 0; this.wrong = 0;
		this.winFunction = winFunction;
		this.loseFunction = loseFunction;
		var thisser = this;
		this.submitButton.handler = function(){thisser.submit()}
		this.setQuestion(questions[0]);
	},
	setQuestion : function() {
		var thisser = this;
		var question = this.questions[this.index];
		this.text = question.text;
		this.answerButtons = new RadioButtons(10, 440 - 25 * question.answers.length, 590, 25, engine.context2D, question.answers);
		engine.gameObjects = [this, this.answerButtons, this.submitButton];
	},
	submit : function() {
		if (this.answerButtons.index < 0)
			return;
		if (this.answerButtons.index == this.questions[this.index].correctIndex) {
			this.correct++;
			if (this.correct >= this.correctToWin) {
				this.winFunction();
				return;
			}
		} else {
			this.wrong++;
			if (this.wrong >= this.wrongToLose) {
				this.loseFunction();
				return;
			}
		}
		this.index++;
		this.setQuestion();
	},
	update : function(ctx){},
	draw : function(ctx) {
		var width = 20;
		var total = this.correctToWin + this.wrongToLose - 1;
		for(var i = 0; i < total; i++) {
			ctx.fillStyle = "#FFFFFF"
			if (i < this.correct)
				ctx.fillStyle = "#00FF00";
			if (i >= total - this.wrong)
				ctx.fillStyle = "#FF0000";
			if (i == this.correctToWin - 1)
				ctx.fillStyle = "#FFFF00";
			ctx.fillRect(400 - total * width / 2 + i * width + 1, 10, width-2, 30);
		}
		
		var fontSize = 20;
		ctx.fillStyle = "#FFFFFF";
		ctx.font = fontSize + "px sans-serif";
		var lines = getLines(ctx, this.text, this.width - (SIDE_MARGINS * 2));
		for (i = 0; i < lines.length; i++) { 
			ctx.fillText(lines[i], SIDE_MARGINS, 50 + 1.1 * fontSize * i);
		}
	}
}

var QuizQuestion = function(text, answers, correctIndex) {
	this.text = text;
	this.answers = answers;
	this.correctIndex = correctIndex;
}
QuizQuestion.prototype =Object.create(UIObjectBase);

var GeneralQuiz = [new QuizQuestion("After you've taken a rest, you have a limited number of points to prepare your spells. All of the following factors determine your daily allotment of spell points, EXCEPT for which one?", ["Your experience level", "Your Intelligence score", "The total cost of all the spells you've discovered", "How restful your sleep was"], 1),
new QuizQuestion("You may notice that, immediately after a dialog ends, the Info Field at the bottom of the screen sometimes flashes up random text for a moment. What kind of things does it show?", ["Advice", "Memes", "Satanic illuminati subliminal mind-control messages", "Trivia about the development of the game"], 1),
new QuizQuestion("Which of these techniques can hit more than one enemy?", ["Basic Attack", "Cleave", "Power Attack", "Quick Slash"], 1),
new QuizQuestion("Which stat is used for the attack of most physical techniques?", ["Agility", "Charisma", "Constitution", "Dexterity", "Intelligence", "Strength", "Wisdom"], 5),
new QuizQuestion("Which stat is used for defense against most physical techniques?", ["Agility", "Charisma", "Constitution", "Dexterity", "Intelligence", "Strength", "Wisdom"], 2),
new QuizQuestion("Which stat is used for the attack of most damaging spells?", ["Agility", "Charisma", "Constitution", "Dexterity", "Intelligence", "Strength", "Wisdom"], 4),
new QuizQuestion("Which stat is used for defense against most damaging spells?", ["Agility", "Charisma", "Constitution", "Dexterity", "Intelligence", "Strength", "Wisdom"], 6),
new QuizQuestion("Which stat is used for accuracy of most attacks?", ["Agility", "Charisma", "Constitution", "Dexterity", "Intelligence", "Strength", "Wisdom"], 3,
new QuizQuestion("Which stat is used for evasion against most attacks?", ["Agility", "Charisma", "Constitution", "Dexterity", "Intelligence", "Strength", "Wisdom"], 0),
new QuizQuestion("Which stat is used for most mind-affecting spells?", ["Agility", "Charisma", "Constitution", "Dexterity", "Intelligence", "Strength", "Wisdom"], 1))]



