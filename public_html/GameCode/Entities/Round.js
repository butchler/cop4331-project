var Round = function (engine) {
    var waves = [];
    var wave = 0;
    
    
    var activeWaves = 0;
    
    var specialClock = 300;
    var specialStep = 0;
    
    var spinners = [];
    var spinnerCount = Math.floor(globals.level.difficulty / 2);
    
    var seekers = [];
    var seekerCount = Math.floor(globals.level.difficulty / 2);
    
    var boss = [];
    var bossCount = Math.floor(globals.level.difficulty / 10);
    
    var nextWave = (10 - globals.level.difficulty) * 60;
    var nextWaveCounter = nextWave;
    
    
    for (var i = 0; i < globals.level.difficulty; i++) {
        waves.push(new EnemyWaveInfo(engine));
    }
    
    
    
    this.draw = function () {
        for (var i = 0; i < wave; i++)
            if (waves[i] !== undefined)
                waves[i].draw();
        
        for (var i = 0; i < spinners.length; i++)
            spinners[i].draw();
        for (var i = 0; i < seekers.length; i++)
            seekers[i].draw();
    }
    
    
    this.update = function (bullets) {
        
        // spawn logic for a new wave, don't create a wave if we're out waves
        // don't create a wave before a certain amount of time has passed
        // don't create a wave if we already have 2 active waves
        if ((wave < waves.length 
                && ++nextWaveCounter >= nextWave 
                && activeWaves < 2) || activeWaves == 0) {
            
            nextWaveCounter = 0;
            wave++;
        }
        
        specialStep++;
        if (specialStep >= specialClock) {
            specialStep = 0;
            
            var choice = Math.floor(Math.random() * 2);
            
            if (choice == 0 && spinnerCount > 0) {
                spinnerCount--;
                spinners.push(new Spinner(engine, 
                            Math.floor(globals.level.difficulty * 10 + 150),
                            Math.floor(globals.level.difficulty * 3.0 / 2.0) + 10.0,
                            [ Math.floor(Math.random() * 70), 60]));
            }
            else if (choice > 0 && seekerCount > 0) {
                seekerCount--;
                seekers.push(new Seeker(engine,
                            50.0, 
                            Math.floor(globals.level.difficulty * 3.0 / 2.0) + 10.0,
                            [ Math.floor(Math.random() * 70), 60]));
            }
            else {
                specialStep = specialClock;
            }
        }
        
        
        // reset the number of active waves
        activeWaves = 0;
        var isAlive = spinnerCount + seekerCount + bossCount;
        
        
        for (var i = 0; i < spinners.length; i++) {
            spinners[i].update(bullets);
            isAlive++;
        }
        
        for (var i = 0; i < seekers.length; i++) {
            seekers[i].update();
            isAlive++;
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
        
        // check how many waves are still alive, and how many are active
        for (var i = 0; i < waves.length; i++) {
            if (waves[i] !== undefined && waves[i].isAlive()) {
                isAlive++;
                if (i < wave) activeWaves++;
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
        
        for (var i = 0; i < spinners.length; i++)
            if (spinners[i].collision())
                removeEntity(spinners, i);
        
        for (var i = 0; i < seekers.length; i++)
            if (seekers[i].collision())
                removeEntity(seekers, i);
    }
    
    
    function empty () {
        for (var i = 0; i < wave; i++)
            if (waves[i] !== undefined)
                waves[i].empty();
        
        while (spinners.length > 0)
            removeEntity(spinners, spinners.length - 1);
        
        while (seekers.length > 0)
            removeEntity(seekers, seekers.length - 1);
    }
    this.empty = empty;
    
    
    
    
    function winProcedure () {
        globals.inCombat = false;
        
        empty();

        // Undo effects of used powerups when level is over.
        for (var i = 0; i < globals.usedPowerups.length; i++)
            globals.usedPowerups[i].undoPowerup();
        // Destroy powerups that the user didn't pick up.
        for (var i = 0; i < globals.powerups.length; i++)
            globals.powerups[i].destroy();

        // Save the fact that the user beat this level.
        globals.user.beatenLevels.push(globals.level.selector);
        // Give the user the gold they earned.
        setGold(globals.user.gold + globals.level.gold);

        // Go to the world map by clicking on the world map button.
        $("#nav img[data-target='#world']").click();

        alert("Congradulations: You won!");
    }
}
