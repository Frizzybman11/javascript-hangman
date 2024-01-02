let gameStatus = "Incomplete";
let strikeCount = 0;

const letterButton = document.querySelectorAll(".letterButton")

const wordLibrary = ['amber', 'aromas', 'autumn', 'blood', 'bonfire', 'bounty', 'brisk', 'broomstick', 'candle', 'candy', 'carving', 'chestnuts', 'chili', 'chilly', 'cider', 'cinnamon', 'cornstalk', 'cornucopia', 'costume', 'cranberry', 'creepy', 'crisp', 'crunching', 'disguise', 'equinox', 'family', 'fangs', 'feast', 'festival', 'foliage', 'frosty', 'gathering', 'generous', 'ghost', 'ghoulish', 'goblin', 'golden', 'gourds', 'grandparents', 'graveyard', 'gravy', 'halloween', 'harvest', 'haunted', 'hayride', 'holiday', 'inviting', 'kernel', 'maize', 'monster', 'mummy', 'november', 'october', 'orchard', 'parade', 'party', 'pirate', 'plenty', 'prince', 'princess', 'pumpkin', 'raking', 'roasting', 'rustling', 'savory', 'scarecrow', 'scary', 'season', 'september', 'skeleton', 'skull', 'slimy', 'spicy', 'spooky', 'sweater', 'thankful', 'thanksgiving', 'trail', 'turkey', 'vampire', 'vibrant', 'werewolf', 'wicked', 'witch', 'zombie']

const gameArea = document.querySelector('#gameArea')

const gameOver = document.createElement('span');

const reset = document.createElement('button');
reset.textContent = "Play Again";

const resetArea = document.querySelector('#resetArea')

//Hangman Game
let wordArray = getWord()
const gameWord = document.querySelector("#gameWord")
const gameStrikes = document.querySelector("#gameStrikes")

gameWord.textContent = wordArray[0]
gameStrikes.textContent = "Strikes: 0"
let hiddenWord = ""

letterButton.forEach((button) => {
    button.addEventListener('click', () => {
        if (strikeCount != 10 && gameStatus == "Incomplete"){
            letter = button.id;
            hiddenWord = playerGuess(letter, wordArray)
            gameWord.textContent = wordArray[0]
            gameStrikes.textContent = "Strikes: " + strikeCount
            button.disabled = true;
            console.log(hiddenWord)
            if (wordArray[0] == wordArray[1]){
                gameStatus = "Complete"
                gameOver.textContent = "You win!"
                gameArea.appendChild(gameOver)
                resetArea.appendChild(reset)
            }
            if (strikeCount == 10){
                gameStatus = "Complete"
                gameOver.textContent = "You lose!"
                gameArea.appendChild(gameOver)
                resetArea.appendChild(reset)
            } 
        }
    })
})

reset.addEventListener('click', () => {
    gameStatus = "Incomplete"
    strikeCount = 0
    wordArray = getWord()
    gameWord.textContent = wordArray[0]
    gameStrikes.textContent = "Strikes: 0"
    let hiddenWord = ""
    gameArea.removeChild(gameOver)
    resetArea.removeChild(reset)
    for (button of letterButton){
        button.disabled = false;
    }
})

function getWord() {
    const word = wordLibrary[Math.floor(Math.random() * wordLibrary.length)];
    let hiddenWord = [];
    let wordArray = [];
    const splitWord = word.split("");
    for (let i = 0; i < splitWord.length; i++) {
        hiddenWord.push("_")
    }
    hiddenWord = hiddenWord.join("")
    wordArray[0] = hiddenWord
    wordArray[1] = word
    return wordArray
}
function playerGuess(letter, wordArray) {
    let splitWord = wordArray[1].split("");
    let oldhiddenWord = wordArray[0]
    let hiddenWord = wordArray[0].split("")
    for (let i = 0; i < splitWord.length; i++) {
        if (letter == splitWord[i]) {
            hiddenWord[i] = letter
        }
    }
    hiddenWord = hiddenWord.join("")
    if (oldhiddenWord == hiddenWord){
        strikeCount += 1;
    }
    wordArray[0] = hiddenWord
    return wordArray
}

