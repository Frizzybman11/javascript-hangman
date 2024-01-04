let gameStatus = "Incomplete";
let strikeCount = 0;

const letterButton = document.querySelectorAll(".letterButton")

//Autumn Words
//const wordLibrary = ['amber', 'aromas', 'autumn', 'blood', 'bonfire', 'bounty', 'brisk', 'broomstick', 'candle', 'candy', 'carving', 'chestnuts', 'chili', 'chilly', 'cider', 'cinnamon', 'cornstalk', 'cornucopia', 'costume', 'cranberry', 'creepy', 'crisp', 'crunching', 'disguise', 'equinox', 'family', 'fangs', 'feast', 'festival', 'foliage', 'frosty', 'gathering', 'generous', 'ghost', 'ghoulish', 'goblin', 'golden', 'gourds', 'grandparents', 'graveyard', 'gravy', 'halloween', 'harvest', 'haunted', 'hayride', 'holiday', 'inviting', 'kernel', 'maize', 'monster', 'mummy', 'november', 'october', 'orchard', 'parade', 'party', 'pirate', 'plenty', 'prince', 'princess', 'pumpkin', 'raking', 'roasting', 'rustling', 'savory', 'scarecrow', 'scary', 'season', 'september', 'skeleton', 'skull', 'slimy', 'spicy', 'spooky', 'sweater', 'thankful', 'thanksgiving', 'trail', 'turkey', 'vampire', 'vibrant', 'werewolf', 'wicked', 'witch', 'zombie']

//Winter Words
const wordLibrary = ['boots', 'coats', 'evergreen', 'freezing', 'gloves', 'hibernation', 'holly', 'cocoa', 'skating', 'icicles', 'igloo', 'mittens', 'polar', 'reindeer', 'scarf', 'skiing', 'sleigh', 'snowball', 'snowman', 'snowsuit', 'sweater', 'winter', 'arctic', 'beanie', 'bells', 'bitter', 'blanket', 'blizzard', 'bonfire', 'brisk', 'chilly', 'christmas', 'curling', 'december', 'decorations', 'eggnog', 'february', 'festive', 'fireplace', 'firewood', 'flannel', 'fleece', 'flurries', 'frigid', 'frostbite', 'frosty', 'frozen', 'fruitcake', 'furnace', 'gingerbread', 'glacier', 'glittering', 'hailstone', 'hockey', 'hoodie', 'hypothermia', 'iceberg', 'january', 'mocha', 'ornament', 'penguin', 'parka', 'shivering', 'shoveling', 'sledding', 'slippery', 'slushy', 'snowboard', 'snowfall', 'snowflake', 'snowplow', 'snowstorm', 'stockings', 'turtleneck', 'valentine', 'whiteout']

wordLibrary.sort()

const gameArea = document.querySelector('#gameArea')

const gameOver = document.querySelector('#gameOver');

const reset = document.createElement('button');
reset.textContent = "Play Again";
reset.id = "reset"

const resetArea = document.querySelector('#resetArea')
resetArea.appendChild(reset)
reset.style.visibility = "hidden"

//Hangman Game
let wordArray = getWord()
const gameWord = document.querySelector("#gameWord")
const gameStrikes = document.querySelector("#gameStrikes")

gameWord.textContent = wordArray[0]
gameStrikes.textContent = "Strikes: 0 / 10"
let hiddenWord = ""

letterButton.forEach((button) => {
    button.addEventListener('click', () => {
        if (strikeCount != 10 && gameStatus == "Incomplete"){
            letter = button.id;
            hiddenWord = playerGuess(letter, wordArray)
            gameWord.textContent = wordArray[0]
            gameStrikes.textContent = "Strikes: " + strikeCount + " / 10"
            button.disabled = true;
            if (wordArray[2] == "right"){
                button.classList.add("rightChoice")
            }
            else if (wordArray[2] == "wrong"){
                button.classList.add("wrongChoice")
            }
            if (wordArray[0] == wordArray[1]){
                gameStatus = "Complete"
                gameWord.style.backgroundColor = "greenyellow"
                gameOver.textContent = "You win!"
                reset.style.visibility = "visible"
            }
            if (strikeCount == 10){
                gameStatus = "Complete"
                gameStrikes.style.backgroundColor = "lightcoral"
                gameOver.textContent = "You lose! The word was '" + wordArray[1] + "'"
                reset.style.visibility = "visible"
            } 
        }
    })
})

reset.addEventListener('click', () => {
    gameStatus = "Incomplete"
    strikeCount = 0
    wordArray = getWord()
    gameWord.textContent = wordArray[0]
    gameWord.style.backgroundColor = "white"
    gameStrikes.textContent = "Strikes: 0 / 10"
    gameStrikes.style.backgroundColor = "white"
    let hiddenWord = ""
    gameOver.textContent = ""
    reset.style.visibility = "hidden"
    for (button of letterButton){
        button.disabled = false;
        button.classList.remove("rightChoice")
        button.classList.remove("wrongChoice")
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
        wordArray[2] = "wrong"
    }
    else {
        wordArray[2] = "right"
    }
    wordArray[0] = hiddenWord
    return wordArray
}

