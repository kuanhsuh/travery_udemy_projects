/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer

init()

document.querySelector('.btn-roll').addEventListener('click', function() {
    // 1. Random Number
    var dice = Math.floor((Math.random() * 6) + 1)

    // 2. Display Result
    var diceDOM = document.querySelector('.dice')
    diceDOM.style.display = 'block'
    diceDOM.src = 'dice-' + dice + '.png'
    // 3. Update the round score If rolled number was not a 1
    if(dice !== 1) {
        //  Add score
        roundScore += dice
        document.querySelector('#current-' + activePlayer).textContent = roundScore
    } else {
        // Next player
        nextPlayer()
    }
})

document.querySelector('.btn-hold').addEventListener('click', function() {
    // Add current score to global score
    scores[activePlayer] += roundScore
    // update UI
    document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer]
    // Check if player won the game
    if (scores[activePlayer] >= 20) {
        document.querySelector('#name-' + activePlayer).textContent = 'Winner!'
        document.querySelector('.dice').style.display = 'none'
        document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner')
        document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active')
    } else {
        // Next Player
        nextPlayer()
    }
})

function nextPlayer () {
    activePlayer = activePlayer === 0 ? 1 : 0
    roundScore = 0
    document.getElementById('current-0').textContent = '0'
    document.getElementById('current-1').textContent = '0'
    document.querySelector('.player-0-panel').classList.toggle('active')
    document.querySelector('.player-1-panel').classList.toggle('active')

    document.querySelector('.dice').style.display = 'none'
}

document.querySelector('.btn-new').addEventListener('click', init)

function init () {
    scores = [0,0]
    activePlayer = 0
    roundScore = 0

    document.querySelector('.dice').style.display = 'none'
    document.getElementById('score-0').textContent = '0'
    document.getElementById('score-1').textContent = '0'
    document.getElementById('current-0').textContent = '0'
    document.getElementById('current-1').textContent = '0'
    document.querySelector('#name-0').textContent = 'Player 1'
    document.querySelector('#name-1').textContent = 'Player 2'
    document.querySelector('.player-0-panel').classList.remove('winner')
    document.querySelector('.player-1-panel').classList.remove('winner')
    document.querySelector('.player-0-panel').classList.remove('active')
    document.querySelector('.player-1-panel').classList.remove('active')
    document.querySelector('.player-0-panel').classList.add('active')
}