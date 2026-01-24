const container = document.querySelector("#dragspace");

// upon refreshing/opening the fridge screen
var magnets = document.querySelectorAll("button"); // get all magnets
for (magnet of magnets) {
    dragElement(magnet); // make each magnet draggable 
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