var EnemyWaveInfo = function (engine, difficulty) {
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
        globals.lock = "unlocked";
        
        
        var hide = document.getElementById("combat");
        var show = document.getElementById("world");
        hide.style.display = 'none';
        show.style.display = 'block';

        globals.vis = "world";
        
        alert("Congradulations: You won!");
    }
}