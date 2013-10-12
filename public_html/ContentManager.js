var ContentManager = function(engine) {
    var contentManagers = [new IngameCM(engine)];
    var activeCM = 0;
    
    this.draw = function() {
        contentManagers[activeCM].draw();
    }
    
    this.update = function(engine) {
        contentManagers[activeCM].update(engine);
    }
    
    this.init = function() {
        contentManagers[activeCM].init();
    }
    
    this.setActiveCM = function(cm) {
        activeCM = cm;
    }
}