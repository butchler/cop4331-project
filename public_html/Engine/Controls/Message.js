var Message = function () {
    var msg = [];
    
    this.reset = function () {
        msg = [];
    }
    
    this.updateMessage = function (name, code) {
        msg[name] = code;
    }
    
    this.getMessage = function (name) {
        return msg[name];
    }
}