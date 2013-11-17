var EnemyWaveInfo = function (engine) {
    var difficulty = globals.level.difficulty * 10;

    var spawnTimer = (1000 / difficulty) + 50;
    var prevTime = new Date().getTime();
    var spawnCount = 0;
    var enemyWaveSize = difficulty + 10;
    
    var entrypoint = [Math.floor(Math.random() * 120) - 60, 50.0];
    
    
    var enemyHp = Math.floor(difficulty * 9.0 / 10.0) + 10;
    var enemyBulletDmg = Math.floor(difficulty * 3.0 / 20.0) + 10.0;
    
    var timesteps = 4;
    var pattern = [[entrypoint[0], entrypoint[1]], [30.0, 30.0], [-20.0, 0], [-50, -37]];
    var timestamps = [1000.0, 1000.0, 1000.0, 1000.0];
    
    
    this.update = function (enemies) {
        var currTime = new Date().getTime();
        if (spawnCount <= enemyWaveSize && currTime - prevTime >= spawnTimer) {
            prevTime = currTime;
            
            enemies.push(new Enemy(engine, enemyHp, enemyBulletDmg, entrypoint));
            spawnCount++;
        }
        
        
        for (var i = 0; i < enemies.length; i++) {
            var timestep = enemies[i].getTimeStep();
            
            enemies[i].update(pattern[timestep], 
                pattern[(timestep + 1) % timesteps], 
                timestamps[timestep], timesteps);
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
