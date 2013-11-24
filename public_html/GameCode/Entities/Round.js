var Round = function (engine) {
    var waves = [];
    var wave = 0;
    
    
    var activeWaves = 0;
    
    var spinners = [];
    var spinnerCount = Math.floor(globals.level.difficulty / 2);
    
    var seekers = [];
    var seekerCount = Math.floor(globals.level.difficulty / 2);
    
    var boss = [];
    var bossCount = Math.floor(globals.level.difficulty / 10);
    
    var nextWave = (20 - globals.level.difficulty) * 60;
    var nextWaveCounter = nextWave;
    
    
    for (var i = 0; i < globals.level.difficulty; i++) {
        waves.push(new EnemyWaveInfo(engine));
    }
    
    
    
    this.draw = function () {
        for (var i = 0; i < wave; i++)
            if (waves[i] !== undefined)
                waves[i].draw();
    }
    
    
    this.update = function (bullets) {
        
        // spawn logic for a new wave, don't create a wave if we're out waves
        // don't create a wave before a certain amount of time has passed
        // don't create a wave if we already have 2 active waves
        if (wave < waves.length 
                && ++nextWaveCounter >= nextWave 
                && activeWaves <= 2) {
            
            nextWaveCounter = 0;
            wave++;
        }
        
        
        // update a wave if the wave still exists
        for (var i = 0; i < wave; i++) {
            if (waves[i] !== undefined) {
                waves[i].update(bullets);
                
                // if wave is dead, turn empty it and set it to undefined
                if (!waves[i].isAlive()) {
                    waves[i].empty();
                    waves[i] = undefined;
                }
            }
        }
        
        // reset the number of active waves
        activeWaves = 0;
        var isAlive = 0;
        
        // check how many waves are still alive, and how many are active
        for (var i = 0; i < waves.length; i++) {
            if (waves[i] !== undefined && waves[i].isAlive()) {
                isAlive++;
                activeWaves++;
            }
        }
        
        
        // if everything is dead, win game
        if (isAlive == 0) {
            winProcedure();
        }
    }

    
    this.collision = function () {
        for (var i = 0; i < wave; i++)
            if (waves[i] !== undefined)
                waves[i].collision();
    }
    
    
    function empty () {
        for (var i = 0; i < wave; i++)
            if (waves[i] !== undefined)
                waves[i].empty();
    }
    this.empty = empty;
    
    
    
    
    function winProcedure () {
        globals.inCombat = false;
        
        empty();

        // Save the fact that the user beat this level.
        globals.user.beatenLevels.push(globals.level.selector);
        // Give the user the gold they earned.
        setGold(globals.user.gold + globals.level.gold);

        // Go to the world map by clicking on the world map button.
        $("#nav img[data-target='#world']").click();

        alert("Congradulations: You won!");
    }
}