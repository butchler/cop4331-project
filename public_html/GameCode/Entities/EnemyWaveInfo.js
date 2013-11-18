var EnemyWaveInfo = function (engine) {
    var difficulty = globals.level.difficulty * 10;

    var spawnTimer = 400;
    var prevTime = new Date().getTime();
    var spawnCount = 0;
    var enemyWaveSize = difficulty + 10;
    
    var entrypoint = [0, 60];
    
    
    var enemyHp = Math.floor(difficulty * 9.0 / 10.0) + 10;
    var enemyBulletDmg = Math.floor(difficulty * 3.0 / 20.0) + 10.0;

    
    var paths = [engine.Pathing().getPath(5)];
    
    
    this.update = function (enemies) {
        var currTime = new Date().getTime();

        if (spawnCount < enemyWaveSize && currTime - prevTime >= spawnTimer) {
            prevTime = currTime;
            
            enemies.push(new Enemy(engine, enemyHp, enemyBulletDmg, entrypoint));
            spawnCount++;
        }
        
        
        // update enemies and pathing info
        for (var i = 0; i < enemies.length; i++) {
            // path now has data path, next
            var path = paths[enemies[i].getPath()];
            var segment = enemies[i].getSegment() + 1;
            
            
            // migrate path to new path
            if (segment >= path.path.length) {
                var newPath = enemies[i].getPath() + 1;
                
                if (newPath >= paths.length) {
                    paths.push(engine.Pathing().getPath(path.next));
                }                
                
                path = paths[newPath];
                enemies[i].updatePath(newPath);
                
                
                segment = enemies[i].getSegment() + 1;
            }
                
                
            enemies[i].update(path.path[segment - 1], path.path[segment]);
        }
        
        
        if (spawnCount >= enemyWaveSize && enemies.length == 0) 
            winProcedure();
    }
    
    function winProcedure () {
        globals.inCombat = false;

        // Save the fact that the user beat this level.
        globals.user.beatenLevels.push(globals.level.selector);
        // Give the user the gold they earned.
        setGold(globals.user.gold + globals.level.gold);

        // Go to the world map by clicking on the world map button.
        $("#nav img[data-target='#world']").click();

        alert("Congradulations: You won!");
    }
}
