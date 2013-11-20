var EnemyWaveInfo = function (engine) {
    var difficulty = globals.level.difficulty * 10;

    var spawnFrames = 30 / globals.level.difficulty + 7;
    var frame = 0;
    
    
    var spawnCount = 0;
    var enemyWaveSize = globals.level.difficulty + 10;
    
    var entrypoint = [0, 60];
    
    
    var enemyHp = Math.floor(difficulty * 9.0 / 10.0) + 10;
    var enemyBulletDmg = Math.floor(difficulty * 3.0 / 20.0) + 10.0;


    var enemies = [];
    
    var paths = [engine.Pathing().getPath(5)];
    
    
    this.draw = function () {
        for (var i = 0; i < enemies.length; i++) enemies[i].draw();
    }
    
    this.update = function (bullets) {

        if (spawnCount < enemyWaveSize && ++frame >= spawnFrames) {
            frame = 0;
            
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
                
                
            enemies[i].update(path.path[segment - 1], path.path[segment], bullets);
        }
    }
    
    
    this.collision = function () {
        for (var i = 0; i < enemies.length; i++)
            if (enemies[i].collision())
                removeEntity(enemies, i);
    }
    
    
    this.isAlive = function () {
        return enemies.length > 0 || spawnCount < enemyWaveSize;
    }
    
    this.empty = function () {
        while (enemies.length > 0) 
            removeEntity(enemies, enemies.length - 1);
    }
}