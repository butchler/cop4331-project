var ContentManager = function(graphics) {
    var contentManagers = [new IngameCM(graphics)];
    var activeCM = 0;
    
    this.draw = function() {
        contentManagers[activeCM].draw();
    }
    
    this.update = function() {
        contentManagers[activeCM].update();
    }
    
    this.init = function() {
        contentManagers[activeCM].init();
    }
    
    this.setActiveCM = function(cm) {
        activeCM = cm;
    }
}