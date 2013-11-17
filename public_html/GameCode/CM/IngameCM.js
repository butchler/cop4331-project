var IngameCM = function (engine) {
    var player = new Player(engine);
    var enemies = [];
    var bullets = [];
    
    var encounter = new EnemyWaveInfo(engine);
    
    this.draw = function () {
        player.draw();
        
        for (var i = 0; i < enemies.length; i++) enemies[i].draw();
        
        for (var i = 0; i < bullets.length; i++) bullets[i].draw();
    }
    
    this.update = function () {
        player.update();
        
        player.isShooting(bullets);
        
        encounter.update(enemies);
        
        for (var i = 0; i < bullets.length; i++) {
            bullets[i].update();
            if (bullets[i].isOutside())
                removeEntity(bullets, i);
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
    }
    
    
    function loseCondition () {
        globals.lock = "unlocked";
        
        var hide = document.getElementById("combat");
        var show = document.getElementById("world");
        hide.style.display = 'none';
        show.style.display = 'block';

        globals.vis = "world";
        
        alert("You lost, maybe next time!");
    }
    
    
    this.init = function () {
        player.destroy();
        player = new Player(engine);
        
        encounter = new EnemyWaveInfo(engine);
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
