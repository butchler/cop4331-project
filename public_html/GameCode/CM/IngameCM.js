var IngameCM = function (engine) {
    var player = new Player(engine);
    var enemies = [new Enemy(engine)];
    var bullets = [];
    
    this.draw = function () {
        player.draw();
        
        for (var i = 0; i < enemies.length; i++) enemies[i].draw();
        
        for (var i = 0; i < bullets.length; i++) bullets[i].draw();
    }
    
    this.update = function () {
        player.update();
        
        player.isShooting(bullets);
        
        for (var i = 0; i < enemies.length; i++) enemies[i].update();
        
        for (var i = 0; i < bullets.length; i++) {
            bullets[i].update();
            if (bullets[i].isOutside())
                removeEntity(bullets, i);
        }
    }
    
    this.collision = function() {
        player.collision();
        
        for (var i = 0; i < enemies.length; i++) {
            if (enemies[i].collision()) {
                removeEntity(enemies, i);
            }
        }
        
        for (var i = 0; i < bullets.length; i++) {
            if (bullets[i].collision()) {
                removeEntity(bullets, i);
            }
        }
    }
    
    this.init = function () {
        
    }
    
    function removeEntity(list, index) {
        var obj;
        if (index == list.length - 1 || list.length == 1) 
            obj = list.pop();
        else if (list.length > 1) {
            obj = list[index];
            list[index] = list.pop();
        }
        
        obj.destroy();
    }
}