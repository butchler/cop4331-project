var Bullet = function (engine) {
    var name = "cube";
    var speed = 0.5;
    
    var MAX_BULLET_HEIGHT = 16;
    
    
    var model = engine.Graphics().createModel(name);
    
    
    this.draw = function () {
        engine.Graphics().draw(model);
    }
    
    
    this.update = function () {
        model.moveY(speed);
    }
    
    
    this.isOutside = function () {
        return model.getPosition()[1] > MAX_BULLET_HEIGHT;
    }
}