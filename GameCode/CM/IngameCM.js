var IngameCM = function (engine) {
    var player = new Player(engine);
    var bullets = [];
    var rockets = [];
    
    var encounter;
    
    var prevTime;
    var count = 0;
    
    this.draw = function () {
        player.draw();
        
        
        encounter.draw();
        
        
        for (var i = 0; i < bullets.length; i++) bullets[i].draw();
        
        for (var i = 0; i < rockets.length; i++) rockets[i].draw();

        for (var i = 0; i < globals.powerups.length; i++) globals.powerups[i].draw();
    }
    
    this.update = function () {
        
        player.update();
        
        player.isShooting(bullets, rockets);
        
        encounter.update(bullets);
        
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

        // Move dropped powerups and remove them if they fall past the end of
        // the screen.
        for (var i = 0; i < globals.powerups.length; i++) {
            globals.powerups[i].update();
            if (globals.powerups[i].isOutside())
                removeEntity(globals.powerups, i);
        }
    }
    
    this.collision = function() {
        // lose condition
        if (player.collision())
            loseCondition();

        
        encounter.collision();
        
        
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
        
        
        encounter.empty();
        
        
        while (bullets.length > 0)
            removeEntity(bullets, bullets.length - 1);
        
        while (rockets.length > 0)
            removeEntity(rockets, rockets.length - 1);

        // Go to the world map by clicking on the world map button.
        $("#nav img[data-target='#world']").click();
        
        alert("You lost, maybe next time!");
    }
    
    
    this.init = function () {
        player.destroy();
        player = new Player(engine);
        
        encounter = new Round(engine);

        globals.powerups = [];
        globals.usedPowerups = [];
        
        while (bullets.length > 0)
            removeEntity(bullets, bullets.length - 1);
        
        while (rockets.length > 0)
            removeEntity(rockets, rockets.length - 1);
        
        
        prevTime = new Date().getTime();
    }
}
