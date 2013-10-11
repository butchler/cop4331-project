var IngameCM = function (graphics) {
    var entityCM = [new Player(graphics)];
    
    this.draw = function () {
        for (var i = 0; i < entityCM.length; i++) entityCM[i].draw();
    }
    
    this.update = function () {
        for (var i = 0; i < entityCM.length; i++) entityCM[i].update();
    }
    
    this.init = function () {
        
    }
}