// all possible words on the magnets
const adjectives = ["large", "miniscule", "pungent", "iridescent", "positive", "accessible", "ritual", "surprise", "elaborate", "thin", "serious"]
const verbs = ["whisper", "speak", "told", "breathe", "see", "observed", "slept", "sing", "consume", "ate", "twitch", "please", "rise", "progress", "think"]
const nouns = ["puppy", "bear", "cup", "quarter", "wage", "sight", "sea", "sight", "herb", "humanity", "prejudice", "pride", "stuff", "truth", "enemy", "love", "share", "joke", "volunteer"]
const standard = ["the", "he", "his", "she", "her", "they", "them", "not", "am", "no", "to", "at", "is", "of", "are", "or", "be", "of", "as", "did"]

const container = document.querySelector("#dragspace");
var wordsPerCategory = 5;

// upon refreshing/opening the fridge screen
generateWords();

// randomly generating the words for the next set of magnets
function generateWords() {
    console.log("called generate words");
    var magnets = [];
    // for (word of standard) {
    //     magnets.push(word);
    // }
    console.log("hellooooo");
    // randomly pick N words of each category to be added to magnets
    for (let i = 0; i < wordsPerCategory; i++) {
        var word = adjectives[Math.floor(Math.random() * adjectives.length)];
        magnets.push(word);
        word = verbs[Math.floor(Math.random() * verbs.length)];
        magnets.push(word);
        word = nouns[Math.floor(Math.random() * nouns.length)];
        magnets.push(word);
        word = standard[Math.floor(Math.random() * standard.length)];
        magnets.push(word);
    }

    generateMagnets(magnets);
}

// generate the magnet elements
function generateMagnets(magnets) {
    console.log("called generate magnets");

    for (magnet of magnets) {
        // create the element
        const item = document.createElement("button");

        // make the item into a proper magnet based on class and stuff
        item.id = "magnet"
        item.className = "absolute bg-yellow-100 p-2 border-amber-600 border-3 rounded-md hover:bg-yellow-50"
        item.innerHTML = magnet;
        // item.style.top = (container.offsetHeight) / 2 + "px"; 
            // need to fix later
        item.style.left = (container.offsetWidth) / 2 + "px";

        container.appendChild(item); // add to container
        dragElement(item); // make each magnet draggable 
    }
}

function dragElement(element) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    // odd = x, even = y. 1 & 2 = numerical change in position, 3 & 4 = current position
    element.onmousedown = dragMouseDown; // call dragMouseDown function once input received

    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();

        // get mouse cursor position
        pos3 = e.clientX;
        pos4 = e.clientY;
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

    }

    function closeDragElement() {
        // stop moving upon release of mouse
        document.onmouseup = null;
        document.onmousemove = null;
    }
}