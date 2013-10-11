var Player = function (graphics) {  
    var name = "ship";
    graphics.createModel(name);
    
    this.draw = function () {
        graphics.draw(name);
    }
    
    this.update = function () {
        
    }
}