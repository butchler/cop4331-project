var IngameCM = function (engine) {
    var player = new Player(engine);
    var enemies = [];
    var bullets = [];
    var rockets = [];
    
    var encounter;
    
    this.draw = function () {
        player.draw();
        
        for (var i = 0; i < enemies.length; i++) enemies[i].draw();
        
        for (var i = 0; i < bullets.length; i++) bullets[i].draw();
        
        for (var i = 0; i < rockets.length; i++) rockets[i].draw();
    }
    
    this.update = function () {        
        player.update();
        
        player.isShooting(bullets, rockets);
        
        encounter.update(enemies);
        
        for (var i = 0; i < bullets.length; i++) {
            bullets[i].update();
            if (bullets[i].isOutside())
                removeEntity(bullets, i);
        }
        
        for (var i = 0; i < rockets.length; i++) {
            rockets[i].update();
            if (rockets[i].isOutside())
                removeEntity(rockets, i);
        }
    }
    
    this.collision = function() {
        // lose condition
        if (player.collision())
            loseCondition();
        
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
        
        for (var i = 0; i < rockets.length; i++) {
            if (rockets[i].collision(bullets)) {
                removeEntity(rockets, i);
            }
        }
    }
    
    
    function loseCondition () {
        globals.inCombat = false;

        // Go to the world map by clicking on the world map button.
        $("#nav img[data-target='#world']").click();
        
        alert("You lost, maybe next time!");
    }
    
    
    this.init = function () {
        player.destroy();
        player = new Player(engine);
        
        encounter = new EnemyWaveInfo(engine);
        
        for (var i = 0; i < bullets.length; i++)
            removeEntity(bullets, bullets.length - i - 1);
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
