var Round = function (engine) {
    var waves = [];
    var wave = 0;
    
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
        if (wave < waves.length && ++nextWaveCounter >= nextWave) {
            nextWaveCounter = 0;
            wave++;
        }
        
        
        for (var i = 0; i < wave; i++) {
            if (waves[i] !== undefined) {
                waves[i].update(bullets);
                
                if (!waves[i].isAlive()) {
                    waves[i].empty();
                    waves[i] = undefined;
                }
            }
        }
        
        var isAlive = 0;
        
        for (var i = 0; i < waves.length; i++)
            if (waves[i] !== undefined && waves[i].isAlive()) isAlive++;
        
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