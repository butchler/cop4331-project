var Bullet = function (engine, pos) {
    var name = "sphere";
    var speed = 2.0;
    
    var MAX_BULLET_HEIGHT = 50;
    
    
    var model = engine.Graphics().createModel(name);
    model.setPosition(pos[0], pos[1], pos[2]);
    
    this.draw = function () {
        engine.Graphics().draw(model);
    }
    
    
    this.update = function () {
        model.moveY(speed);
    }
    
    this.collision = function () {
        
    }
    
    this.isOutside = function () {
        return model.getPosition()[1] > MAX_BULLET_HEIGHT;
    }
    
    
    
    this.destroy = function () {
        engine.Graphics().destroyModel(model);
    }
}