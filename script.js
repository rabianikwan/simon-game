const buttonColors = ["red", "blue", "green", "yellow"]
let gamePattern = [];
let userClickedPattern = [];
let h1 = $('#level-title')
let level = 0;

function delay(time) {
    return new Promise(r => setTimeout(r, time))
}

const playSound = (name) => {
    let audio = new Audio(name + '.mp3')
    return audio.play()
}
const animatePress = (currentColor) => {
    let button = $('.' + currentColor)[0]
    button.classList.add('pressed')
    delay(90).then(() => {
        button.classList.remove('pressed')
    })

}
function checkAnswer(currentLevel) {
    for (let i = 0 ; i < userClickedPattern.length; i++) {
        if (gamePattern[i] === userClickedPattern[i]) {
            console.log("sukses")
            playSound(userClickedPattern[userClickedPattern.length-1])
            if ( i + 1 === currentLevel) {
                nextSequence()
            }
        } else {
            console.log('salah')
            gamePattern = []
            h1.text("Game Over, Press Any Key to Restart")
            $("body").addClass("game-over")
            let audio = new Audio('wrong.mp3')
            audio.play()
            delay(200).then(()=> {
                $("body").removeClass("game-over")
            })
        }
    }
}
$('.btn').click(clickHandler)

function nextSequence() {
    userClickedPattern = []
    const randomNumber = Math.trunc(Math.random() * 4)
    let randomChosenColour = buttonColors[randomNumber];
    let currentRandomButton = $('.' + randomChosenColour)
    gamePattern.push(randomChosenColour)
    delay(500).then(() => {
        currentRandomButton.fadeIn(100).fadeOut(100).fadeIn(100);
        playSound(randomChosenColour);
        animatePress(randomChosenColour);
        ++level
        h1.text('Level ' + level);
    })
}
$(document).keydown(nextSequence)

function clickHandler() {
    let userChosenColour = this.id
    userClickedPattern.push(userChosenColour)

    checkAnswer(level)
    animatePress(userChosenColour)
}

