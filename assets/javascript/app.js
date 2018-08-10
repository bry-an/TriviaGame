var questionIdx = 0;
var correct = 0;
var timeRemaining;
var counter;

var questions = [
    {
        q: "The sun is comprised mainly of what element?",
        a: ["Helium", "Hydrogen", "Sulfur", "Carbon"],
        correctAns: "Helium",
        correctAnsIdx: 0,
    },
    {
        q: "If a substance is more acidic than water, its pH will be...",
        a: ["Lower than water's pH", "Higher than water's pH"],
        correctAns: "Lower than water's pH",
        correctAnsIdx: 0,

    },
    {
        q: "What is the key component of noble gases?",
        a: ["Their outer electron shell is incomplete", "They are named after British chemists", "They do not react with other stubstances"],
        correctAns: "They do not react with other substances",
        correctAnsIdx: 2,
    },
    {
        q: "What is another name for water?",
        a: ["Hydrogen Peroxide", "Monohydrogenated Oxygen", "Dihydrogen Monoxide", "Aqueous Hydroxide"],
        correctAns: "Dihydrogen Monoxide",
        correctAnsIdx: 2,
    },
    {
        q: "Which is heavier, Helium or Oxygen?",
        a: ["Oxygen", "Helium"],
        correctAns: "Oxygen",
        correctAnsIdx: 0,
    },
    {
        q: "What is Albert Einstein most known for?",
        a: ["Successfully splitting the atom", "Equating Mass and Energy", "Discovering electricity", "Discovering the structure of DNA"],
        correctAns: "Equating Mass and Energy",
        correctAnsIdx: 1,
    },
    {
        q: "Who invented the modern periodic table?",
        a: ["Alfred Nobel", "Dmitri Mendeleev", "James Watson", "Sir Arthur Reynolds"],
        correctAns: "Dmitri Mendeleev",
        correctAnsIdx: 1,
    },
    {
        q: "What is silver's chemical symbol?",
        a: ["Si", "Sv", "Ag", "K"],
        correctAns: "Ag",
        correctAnsIdx: 2,
    },
    {
        q: "According to Boyle's law, if you decrease a gas's volume, its pressure will...",
        a: ["increase", "decrease", "stay constant"],
        correctAns: "increase",
        correctAnsIdx: 0,
    },
    {
        q: "Within a chemistry context, what is a mole?",
        a: ["A charged molecule", "An uncharged molecule", "A specific number of molecules", "The mathematical inverse of quantity"],
        correctAns: "A specific number of molecules",
        correctAnsIdx: 2,
    },
]

var startCountdown = function () {
    timeRemaining = 20;
    counter = setInterval(runCountdown, 1000);

}

var runCountdown = function () {
    timeRemaining--;
    $("#timerDiv").text("You have " + timeRemaining + " seconds remaining.");
    if (timeRemaining == 0) {
        verify();
    }
}
var stopCountdown = function () {
    clearInterval(counter);
}

var verify = function () {
    stopCountdown()
    var statusDiv = $("<p>").addClass("statusDiv");
    if ($("#" + questions[questionIdx].correctAnsIdx).prop("checked")) {
        correct++;
        $("#main").empty();
        $("#main").append(statusDiv);
        statusDiv.text("Correct!");
    }
    else {
        $("#main").empty();
        $("#main").append(statusDiv);
        statusDiv.text("Sorry, the correct answer is: " + questions[questionIdx].correctAns);
    }
    questionIdx++;
    setTimeout(showQuestion, 5 * 1000)
}

var finalStats = function () {
    var grade = $("<p>").addClass("grade");
    var stats = $("<p>").addClass("statsDiv");
    var startBtn = $("<button>").attr("id", "start").text("Play again");
    $("#main").empty();
    $("#main").append(stats);
    statsPercent = Math.round(correct / questions.length * 100);
    stats.html("<p><strong>Finished! You answered " + statsPercent + "% of questions correctly. Play again!</strong></p>");
    stats.append(startBtn);
    correct = 0;
    questionIdx = 0;
    startBtn.on("click", showQuestion);
}

var showQuestion = function () {
    if (questionIdx < questions.length) {
        $("#main").empty();
        var timerDiv = $("<div>").attr("id", "timerDiv");
        var questionDiv = $("<div>").attr("id", "question");
        var answerDiv = $("<div>").attr("id", "answer");
        var submitDiv = $("<div>");
        var newQuestion = questions[questionIdx].q;
        var newAnswerOpts = questions[questionIdx].a;


        var submitBtn = $("<button>")
            .attr("id", "submitBtn")
            .text("Submit!");

        $("#main").append(timerDiv, questionDiv, answerDiv, submitDiv); //append divs

        questionDiv.append(newQuestion); //append question to questiondiv

        //add answer options
        newAnswerOpts.forEach(function (answer, index) {
            var radioDiv = $("<div>").attr("id", "radioDiv");
            var newRadioBtn = $("<input type = 'radio' name = 'option'>" + answer + "</input>").attr("id", index)
                .addClass("radioQuestion");
            $(answerDiv).append(radioDiv);
            $(radioDiv).append(newRadioBtn);

        })
        submitDiv.append(submitBtn);
        startCountdown(); //start timer

        submitBtn.on("click", verify);
    }
    else finalStats();
}


$(document).ready(function () {

    $("#start").on("click", showQuestion)



})