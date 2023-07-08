var buttonColours = ['red','blue','green','yellow'];

var gamePattern =[];
var userClickedPattern = [];

var level = 0;
var started = false;

$(document).keydown(function () { 
    if (!started) {
        $("#title").text("Level "+level);
        nextSequence();
        started = true;
    }
});

$(".btn").click(function () {
    var userChosenColour = this.id;         // $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);

    // console.log(userClickedPattern);
    checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currentLevel) {
    
    if (gamePattern[currentLevel]===userClickedPattern[currentLevel]) {

        console.log("success");

        if (userClickedPattern.length===gamePattern.length) {
            setTimeout(() => {
                nextSequence();
            }, 1000);
        }

    } else {
        console.log("wrong");
        playSound("wrong");
        $("#title").text("Game Over, Press Any Key to Restart");

        $("body").addClass("game-over");
        setTimeout(() => {
            $("body").removeClass("game-over");
        }, 200);

        startOver();
    }
}

function nextSequence() {

    userClickedPattern = [];
    
    level++;
    $("#title").text("Level "+level);

    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}

function playSound(name) {
    var audio = new Audio("sounds/"+name+".mp3");
    audio.play();
}

function animatePress(currentColour) {
    $("#"+currentColour).addClass("pressed");
    setTimeout(function () {
        $("#" +currentColour).removeClass("pressed");
      }, 100);    
}
