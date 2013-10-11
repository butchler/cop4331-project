var Player = function (engine) {  
    var name = "ship";
    var model = engine.Graphics.createModel(name);
    
    this.draw = function () {
        engine.Graphics.draw(model);
    }
    
    this.update = function () {
        
    }
}