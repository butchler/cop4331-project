var EventHandler = function (message) {
    var msg = message;
    
    window.onkeydown = function (event) {
        msg.updateMessage(String.fromCharCode(event.keyCode), "down");

        // Special cases for arrow keys.
        if (event.keyCode == 37) msg.updateMessage("left-arrow", "down");
        if (event.keyCode == 38) msg.updateMessage("up-arrow", "down");
        if (event.keyCode == 39) msg.updateMessage("right-arrow", "down");
        if (event.keyCode == 40) msg.updateMessage("down-arrow", "down");
    }
    
    window.onkeyup = function (event) {
        msg.updateMessage(String.fromCharCode(event.keyCode), "up");

        // Special cases for arrow keys.
        if (event.keyCode == 37) msg.updateMessage("left-arrow", "up");
        if (event.keyCode == 38) msg.updateMessage("up-arrow", "up");
        if (event.keyCode == 39) msg.updateMessage("right-arrow", "up");
        if (event.keyCode == 40) msg.updateMessage("down-arrow", "up");
    }
    
    window.onmousemove = function (event) {
        
    }
    
    window.onmousedown = function (event) {
        
    }
    
    window.onmouseup = function (event) {
        
    }
    
    window.onmouseover = function (event) {
        
    }
}
