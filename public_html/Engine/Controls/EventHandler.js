var EventHandler = function (message) {
    var msg = message;
    
    window.onkeydown = function (event) {
        msg.updateMessage(String.fromCharCode(event.keyCode), "down");
    }
    
    window.onkeyup = function (event) {
        msg.updateMessage(String.fromCharCode(event.keyCode), "up");
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