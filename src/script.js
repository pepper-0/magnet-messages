// all possible words on the magnets
const adjectives = ["large", "miniscule", "pungent", "iridescent", "positive", "accessible", "ritual", "surprise", "elaborate", "thin", "serious"]
const verbs = ["whisper", "speak", "told", "breathe", "see", "observed", "slept", "sing", "consume", "ate", "twitch", "please", "rise", "progress", "think"]
const nouns = ["puppy", "bear", "cup", "quarter", "wage", "sight", "sea", "sight", "herb", "humanity", "prejudice", "pride", "stuff", "truth", "enemy", "love", "share", "joke", "volunteer"]
const standard = ["the", "he", "his", "she", "her", "they", "them", "not", "am", "no", "to", "at", "is", "of", "are", "or", "be", "of", "as", "did"]
const punctuation = [".", ",", "!", "?"];

const container = document.querySelector("#dragspace");

const refreshButton = document.getElementById("refresh");
refreshButton.addEventListener("click", generateWords);

const settingsButton = document.getElementById("settings");
settingsButton.addEventListener("click", toggleSettingsScreen);

const settingsScreen = document.getElementById("settings-screen");
settingsScreen.style.display = "none";

const closeSettings = document.getElementById("close-settings");
closeSettings.addEventListener("click", toggleSettingsScreen);
dragElement(settingsScreen);

const startScreen = document.getElementById("start-screen");
const closeButton = document.getElementById("close-start");

dragElement(startScreen);
closeButton.addEventListener("click", closeScreen);

var wordsPerCategory = 1;
var magnets = [];

// upon refreshing/opening the fridge screen
generateWords();

// randomly generating the words for the next set of magnets
function generateWords() {
    // be sure to clear the previous set of words
    clearWords();

    console.log("called generate words");
    var words = [];
    
    // randomly pick N words of each category to be added to magnets
    for (let i = 0; i < wordsPerCategory; i++) {
        var word = adjectives[Math.floor(Math.random() * adjectives.length)];
        words.push(word);
        word = verbs[Math.floor(Math.random() * verbs.length)];
        words.push(word);
        word = nouns[Math.floor(Math.random() * nouns.length)];
        words.push(word);
        word = standard[Math.floor(Math.random() * standard.length)];
        words.push(word);
        word = punctuation[Math.floor(Math.random() * punctuation.length)];
        words.push(word);

    }

    generateMagnets(words);
}

// clear magnets currently in array
function clearWords() {
    for (magnet of magnets) {
        container.removeChild(magnet);
    }
    // clear items
    magnets = [];
}

// generate the magnet elements
function generateMagnets(words) {
    console.log("called generate magnets");

    for (word of words) {
        // create the element
        const item = document.createElement("button");

        // make the item into a proper magnet based on class and stuff
        item.id = "magnet"
        item.className = "absolute bg-yellow-100 p-2 border-amber-600 border-3 rounded-md font-serif hover:bg-yellow-50"
        item.innerHTML = word;

        container.appendChild(item); // add to container
        magnets.push(item);
        dragElement(item); // make each magnet draggable 
    }
}

// element dragging function, call to make draggable
function dragElement(element) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    var original3, original4;
    // odd = x, even = y. 1 & 2 = numerical change in position, 3 & 4 = current position
    element.onmousedown = dragMouseDown; // call dragMouseDown function once input received

    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();

        // get mouse cursor position
        pos3 = e.clientX;
        pos4 = e.clientY;
        original3 = element.offsetLeft;
        original4 = element.offsetTop;

        document.onmouseup = closeDragElement; // call closeDragElement function to stop movement
        document.onmousemove = elementDrag; // call elementDrag function to move the element properly
    }

    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();

        // calculate new cursor position
        pos1 = pos3 - e.clientX; // get change in position
        pos2 = pos4 - e.clientY; // get change in position
        pos3 = e.clientX; // update current position of mouse
        pos4 = e.clientY; // update current position of mouse

        // update the position of the element
        element.style.top = (element.offsetTop - pos2) + "px";
        element.style.left = (element.offsetLeft - pos1) + "px";

        // collision detection
        if (element.id == "magnet") {
            if (checkCollision(element))
                element.className = "absolute bg-red-100 p-2 border-amber-600 border-3 rounded-md";
            else 
                element.className = "absolute bg-yellow-100 p-2 border-amber-600 border-3 rounded-md hover:bg-yellow-50";
        }
    }

    function closeDragElement() {
        // collision detection 
        if (checkCollision(element)) {
            element.style.left = original3 + "px";
            element.style.top = original4 + "px";
        }
        
        // ensure color reset
        if (element.id == "magnet")
            element.className = "absolute bg-yellow-100 p-2 border-amber-600 border-3 rounded-md hover:bg-yellow-50";

        // stop moving upon release of mouse
        document.onmouseup = null;
        document.onmousemove = null;
    }
}

// checks for collisions of magnets
function checkCollision(element) {
    console.log("collision checking");
    // check if element overlaps with any of magnets
    for (magnet of magnets) {
        if (element.offsetLeft > magnet.offsetLeft && 
            element.offsetLeft < (magnet.offsetLeft + magnet.offsetWidth) && 
            element.offsetTop > magnet.offsetTop && 
            element.offsetTop < (magnet.offsetTop + magnet.offsetHeight)) { // x collides
            console.log("within");
            return true;
        }

    }
    return false;
}

// closes start screen
function closeScreen(){
    startScreen.style.display = "none";
}

// manage event screen
function toggleSettingsScreen() {
    console.log("settings button toggled");
    if (settingsScreen.style.display == "block") {
        console.log("previously absolute");
        settingsScreen.style.display = "none";
    } else if (settingsScreen.style.display == "none") {
        console.log("previously none");
        settingsScreen.style.display = "block";
    } else {
        console.log("bro");
    }
}