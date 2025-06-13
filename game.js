// This list contains patterns chosen by user
var userClickedPattern = [];

// This list contains randomly chosen patterns by computer
var gamePattern = [];

// This list contains available button colours 
var buttonColours = ["red", "blue", "green", "yellow"];

// Has game started
var started = false;

// Game level count
var level = 0;


// Detect keypress, play sound and animate randomy chosen button
$(document).keydown(function () { 
    if (!started) {
        
        $("h1").text(`Level ${level}`);
        newSequence();
        started = true;
    } 
});

// Detect button click 
$(".btn").click(function (e) { 
    var userChosenColor = this.getAttribute("id");
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(this);
    checkAnswer(userChosenColor.length - 1);
});

// adds new sequence
function newSequence() {
    userClickedPattern = [];
    level++;
    $("h1").text(`Level ${level}`)
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $(`#${randomChosenColour}`).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}

// Function that plays sound.
function playSound(key) {
    var audio = new Audio(`./sounds/${key}.mp3`);
    audio.play();
}

// Animation function
function animatePress(currentColor) {
    $(currentColor).addClass("pressed");
    setTimeout(function () {
        $(currentColor).removeClass("pressed");
    }, 100);
}

// check answer
function checkAnswer(currentLevel) { 
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log("success");
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function () {
                newSequence();
            }, 1000);
        }
    } else {
        console.log("wrong")
        playSound("wrong")
        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);
        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}
