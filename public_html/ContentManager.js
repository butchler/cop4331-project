var ContentManager = function(engine) {
    var contentManagers = [new IngameCM(engine)];
    var activeCM = 0;
    
    this.draw = function() {
        contentManagers[activeCM].draw();
    }
    
    this.update = function() {
        contentManagers[activeCM].update();
    }
    
    this.collision = function() {
        contentManagers[activeCM].collision();
    }
    
    this.init = function() {
        contentManagers[activeCM].init();
    }
    
    this.setActiveCM = function(cm) {
        activeCM = cm;
    }
}