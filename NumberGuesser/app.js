// Game values
let min = 1,
    max = 10,
    winningNum = getRandomNum(min, max)
    guessesLeft = 3;

const game = document.querySelector('#game'),
      minNum = document.querySelector('.min-num')
      maxNum = document.querySelector('.max-num')
      guessBtn = document.querySelector('#guess-btn')
      guessInput = document.querySelector('#guess-input')
      message = document.querySelector('.message')

minNum.textContent = min
maxNum.textContent = max

// Play again
game.addEventListener('mousedown', function(e) {
    if(e.target.className === 'play-again') {
        window.location.reload()
    }
})


guessBtn.addEventListener('click', function(){
    let guess = parseInt(guessInput.value)
    // Validate
    if (isNaN(guess) || guess < min || guess > max) {
        setMessage(`Please enter a number between ${min} and ${max}`, 'red')
        return
    }

    if (guess === winningNum) {
        gameOver(true, `${winningNum} is correct, you won!!`)
    } else {
        guessesLeft -= 1
        if (guessesLeft === 0) {
            gameOver(false, `Game Over, You Lost. The corrent number was ${winningNum}`)
        } else {
            guessInput.style.borderColor = 'red'
            guessInput.value = ''
            setMessage(`${guess} is not correct, ${guessesLeft} guesses left`, 'red')
        }
    }
})

function setMessage(msg, color) {
    message.style.color = color
    message.textContent = msg;
}

function gameOver(won, msg) {
    let color
    color = won === true ?  'green' : 'red'
    guessInput.disabled = true
    guessInput.style.borderColor = color
    message.style.color = color
    setMessage(msg, color)

    // Play again
    guessBtn.value = 'Play Again'
    guessBtn.className += 'play-again'
}

function getRandomNum(min, max) {
    return Math.floor(Math.random()*(max-min+1) + min)
}