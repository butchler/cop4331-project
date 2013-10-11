var Player = function (graphics) {    
    var ship = graphics.createModel("ship");
    this.draw = function () {
        ship.draw(graphics.CURRENT_PROGRAM());
    }
    
    this.update = function () {
        
    }
}