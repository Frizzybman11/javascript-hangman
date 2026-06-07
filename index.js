//Spring and Summer Words
const wordLibrary = ['beach', 'shade', 'shorts', 'sunny', 'heatwave', 'humidity', 'sunshine', 'sundress', 'sunglasses', 'swimsuit', 'barbecue', 'bonfire', 'sandcastle', 'sunscreen', 'surfing', 'swimming', 'snorkeling', 'fireworks', 'midsummer', 'outdoors', 'august', 'campfire', 'vacation', 'baseball', 'popsicle', 'recreation', 'thunderstorm', 'watermelon', 'waterpark', 'solstice', 'rainbow', 'backyard', 'cookout', 'lifeguard', 'picnic', 'skateboard', 'skating', 'trampoline', 'volleyball', 'lemonade', 'hamburger', 'towel', 'sweaty', 'suntan', 'waves', 'sandals', 'goggles', 'surfboard', 'sprinkler', 'cycling', 'camping', 'cottage', 'garden', 'lawnmower', 'nature', 'tourism', 'travel', 'wasps', 'warmth', 'beachball', 'boardwalk', 'butterfly', 'fireflies', 'grasshopper', 'marshmallow', 'trail', 'waterslide', 'pollen', 'flower', 'umbrella', 'birdwatching', 'rabbit', 'squirrel', 'graduation', 'blossom', 'regrowth', 'renewal', 'april', 'breeze', 'puddle', 'bright', 'clear', 'drizzle', 'fertilizer', 'field', 'insects', 'ladybug', 'meadow', 'orchard', 'petals', 'sapling', 'vibrant', 'bumblebee', 'caterpillar', 'colorful'];

//Autumn Words
//const wordLibrary = ['amber', 'aromas', 'autumn', 'blood', 'bonfire', 'bounty', 'brisk', 'broomstick', 'candle', 'candy', 'carving', 'chestnuts', 'chili', 'chilly', 'cider', 'cinnamon', 'cornstalk', 'cornucopia', 'costume', 'cranberry', 'creepy', 'crisp', 'crunching', 'disguise', 'equinox', 'family', 'fangs', 'feast', 'festival', 'foliage', 'frosty', 'gathering', 'generous', 'ghost', 'ghoulish', 'goblin', 'golden', 'gourds', 'grandparents', 'graveyard', 'gravy', 'halloween', 'harvest', 'haunted', 'hayride', 'holiday', 'inviting', 'kernel', 'maize', 'monster', 'mummy', 'november', 'october', 'orchard', 'parade', 'party', 'pirate', 'plenty', 'prince', 'princess', 'pumpkin', 'raking', 'roasting', 'rustling', 'savory', 'scarecrow', 'scary', 'season', 'september', 'skeleton', 'skull', 'slimy', 'spicy', 'spooky', 'sweater', 'thankful', 'thanksgiving', 'trail', 'turkey', 'vampire', 'vibrant', 'werewolf', 'wicked', 'witch', 'zombie'];

//Winter Words
//const wordLibrary = ['boots', 'coats', 'evergreen', 'freezing', 'gloves', 'hibernation', 'holly', 'cocoa', 'skating', 'icicles', 'igloo', 'mittens', 'polar', 'reindeer', 'scarf', 'skiing', 'sleigh', 'snowball', 'snowman', 'snowsuit', 'sweater', 'winter', 'arctic', 'beanie', 'bells', 'bitter', 'blanket', 'blizzard', 'bonfire', 'brisk', 'chilly', 'christmas', 'curling', 'december', 'decorations', 'eggnog', 'february', 'festive', 'fireplace', 'firewood', 'flannel', 'fleece', 'flurries', 'frigid', 'frostbite', 'frosty', 'frozen', 'fruitcake', 'furnace', 'gingerbread', 'glacier', 'glittering', 'hailstone', 'hockey', 'hoodie', 'hypothermia', 'iceberg', 'january', 'mocha', 'ornament', 'penguin', 'parka', 'shivering', 'shoveling', 'sledding', 'slippery', 'slushy', 'snowboard', 'snowfall', 'snowflake', 'snowplow', 'snowstorm', 'stockings', 'turtleneck', 'valentine', 'whiteout'];

wordLibrary.sort();

//Initialization
let gameStatus = "Incomplete";
let hiddenWord = "";
let strikeCount = 0;
const gameArea = document.querySelector('#gameArea');
const gameOver = document.querySelector('#gameOver');
const gameStrikes = document.querySelector("#gameStrikes");
const gameWord = document.querySelector("#gameWord");
const letterButton = document.querySelectorAll(".letterButton");
const reset = document.createElement('button');
const resetArea = document.querySelector('#resetArea');
gameStrikes.textContent = "Strikes: 0 / 10";
reset.id = "reset";
reset.textContent = "Play Again";
resetArea.appendChild(reset);
reset.style.visibility = "hidden";

//Calls the getWord function to select a word.
let wordArray = getWord();
gameWord.textContent = wordArray[0];

//When the player selects a letter, calls the playerGuess function to determine if they were correct.
//Sets the letter color to green (right) or red (wrong), and disables it for further guesses.
//If the player correctly guesses all letters before strike count reaches 10, they win. 
letterButton.forEach((button) => {
    button.addEventListener('click', () => {
        if (strikeCount != 10 && gameStatus == "Incomplete"){
            letter = button.id;
            hiddenWord = playerGuess(letter, wordArray);
            gameWord.textContent = wordArray[0];
            gameStrikes.textContent = "Strikes: " + strikeCount + " / 10";
            button.disabled = true;
            if (wordArray[2] == "right"){
                button.classList.add("rightChoice");
            }
            else if (wordArray[2] == "wrong"){
                button.classList.add("wrongChoice");
            }
            if (wordArray[0] == wordArray[1]){
                gameStatus = "Complete";
                gameWord.style.backgroundColor = "greenyellow";
                gameOver.textContent = "You win!";
                reset.style.visibility = "visible";
            }
            if (strikeCount == 10){
                gameStatus = "Complete";
                gameStrikes.style.backgroundColor = "lightcoral";
                gameOver.textContent = "You lose! The word was '" + wordArray[1] + "'";
                reset.style.visibility = "visible";
            } 
        }
    })
})

//When the player clicks 'Play Again', resets the status of the game to default
reset.addEventListener('click', () => {
    gameStatus = "Incomplete";
    strikeCount = 0;
    wordArray = getWord();
    gameWord.textContent = wordArray[0];
    gameWord.style.backgroundColor = "white";
    gameStrikes.textContent = "Strikes: 0 / 10";
    gameStrikes.style.backgroundColor = "white";
    let hiddenWord = "";
    gameOver.textContent = "";
    reset.style.visibility = "hidden";
    for (button of letterButton){
        button.disabled = false;
        button.classList.remove("rightChoice");
        button.classList.remove("wrongChoice");
    }
})

//Pulls a word from the word list at random; returns an array with the word and the appropriate number of underscore characters to display on screen (ex. _ _ _ _ _)
function getWord() {
    const word = wordLibrary[Math.floor(Math.random() * wordLibrary.length)];
    let hiddenWord = [];
    let wordArray = [];
    const splitWord = word.split("");
    for (let i = 0; i < splitWord.length; i++) {
        hiddenWord.push("_");
    }
    hiddenWord = hiddenWord.join("");
    wordArray[0] = hiddenWord;
    wordArray[1] = word;
    return wordArray;
}

//Checks the player's letter guess and increases the strike count if they picked an incorrect letter; returns an array with the current progress (ex. a _ _), the word, and whether the guess was right or wrong
function playerGuess(letter, wordArray) {
    let splitWord = wordArray[1].split("");
    let oldhiddenWord = wordArray[0];
    let hiddenWord = wordArray[0].split("");
    for (let i = 0; i < splitWord.length; i++) {
        if (letter == splitWord[i]) {
            hiddenWord[i] = letter;
        }
    }
    hiddenWord = hiddenWord.join("");
    if (oldhiddenWord == hiddenWord){
        strikeCount += 1;
        wordArray[2] = "wrong";
    }
    else {
        wordArray[2] = "right";
    }
    wordArray[0] = hiddenWord;
    return wordArray;
}

