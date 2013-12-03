var Player = function (engine) {  
    var type = 'ally';
    var name = "ship";
    
    
    var hpBar = document.getElementById('hp');
    
    
    var speed = globals.speedStat / 200.0;
    var rotateSpeed = 4.0;
    var maxhp = globals.healthStat;
    var dmg = 50.0;
    var bulletDmg = globals.damageStat;
    var timer = 1000 / globals.rateStat;
    var direction = [0, 1];
    var angle = 90;

    // Used to update one of the player's stats after receiving a powerup.
    this.updateStat = function(stat, addAmount) {
        // Handle health drop.
        if (stat === 'health') {
            globals.user.currentHealth += addAmount;
            // Make sure health doesn't exceed maximum.
            if (globals.user.currentHealth > maxhp)
                globals.user.currentHealth = maxhp;
            // Update health bar.
            progress(hpBar, (globals.user.currentHealth / maxhp) * 100 + '%');
            return;
        }

        // Handle rocket drop.
        if (stat === 'rocket') {
            // Make sure rockets don't exceed rocket cap.
            if (globals.user.rockets < globals.user.rocketCap.getIncrease())
                setRockets(globals.user.rockets + addAmount);
            return;
        }

        // Handle other stat powerups.
        globals[stat + 'Stat'] += addAmount;

        // Show the bonus on the screen.
        var bonusElement = $('#' + stat + '-bonus');
        var bonus = parseInt(bonusElement.text());
        bonusElement.text(bonus + addAmount);

        speed = globals.speedStat / 200.0;
        bulletDmg = globals.damageStat;
        timer = 1000 / globals.rateStat;
    }
    
    var alive = true;
    
    var model = engine.Graphics().createModel(name, this);
    model.moveY(-30);
    
    var XBOUNDS = 50;
    var YBOUNDS = 40;
    
    
    var prevBulletTime = new Date().getTime();
    var prevRocketTime = new Date().getTime();
    
    
    
    
    this.draw = function () {
        engine.Graphics().draw(model);
    }
    
    this.update = function () {
        if (engine.Messages().getMessage("W") == "down")
            model.moveY(speed);
        
        
        if (engine.Messages().getMessage("S") == "down")
            model.moveY(-speed);
        
        
        if (engine.Messages().getMessage("A") == "down")
            model.moveX(-speed);
        
        
        if (engine.Messages().getMessage("D") == "down")
            model.moveX(speed);

        // Rotate ship when player presses arrow keys.
        if (engine.Messages().getMessage("left-arrow") == "down") {
            angle += rotateSpeed;
            model.rotateZ(rotateSpeed);
            // Caculate the horizontal and vertical components of the new angle.
            direction = [Math.cos(angle/180*Math.PI), Math.sin(angle/180*Math.PI)];
        }

        if (engine.Messages().getMessage("right-arrow") == "down") {
            angle -= rotateSpeed;
            model.rotateZ(-rotateSpeed);
            // Caculate the horizontal and vertical components of the new angle.
            direction = [Math.cos(angle/180*Math.PI), Math.sin(angle/180*Math.PI)];
        }
        
        engine.Messages().updateMessage("playerPosition", model.getPosition());
    }
    
    this.isShooting = function(bullets, rockets) {
        if (engine.Messages().getMessage(" ") == "down" && canCreateBullet()) {
            
            bullets.push(new Bullet(engine, model.getPosition(), 
                bulletDmg, type, direction));
                
            prevBulletTime = new Date().getTime();
        }
        if (engine.Messages().getMessage("Q") == "down" 
                && globals.user.rockets > 0
                && canCreateMissile()) {
            
            rockets.push(new Rocket(engine, model.getPosition(),
                bulletDmg * 5, type, direction));
            
            prevRocketTime = new Date().getTime();
            setRockets(globals.user.rockets - 1);
        }
    }
    
    function canCreateBullet() {
        return (new Date().getTime() - prevBulletTime) > timer;
    }
    
    function canCreateMissile() {
        return (new Date().getTime() - prevRocketTime) > timer;
    }
    
    this.getModel = function() {
        return model;
    }
    
    
    this.getName = function () {
        return type;
    }
    
    this.getDamage = function () {
        return dmg;
    }
    
    this.collision = function() {        
        var x = model.getPosition()[0];
        var y = model.getPosition()[1];
        
        
        if (y < -YBOUNDS) model.moveY(-YBOUNDS - y);
        if (y >  YBOUNDS) model.moveY( YBOUNDS - y);
        
        if (x < -XBOUNDS) model.moveX(-XBOUNDS - x);
        if (x >  XBOUNDS) model.moveX( XBOUNDS - x);
        
        
        var cols = model.getCollisions();
        
        for (var i = 0; i < cols.length; i++) {
            var obj = cols[i].getObj();
            
            if (obj.getName() != type && obj.getDamage !== undefined) {
                globals.user.currentHealth -= obj.getDamage();
                
                progress(hpBar, (globals.user.currentHealth / maxhp) * 100 + '%');
            }

            // If the player collides with a powerup, use the powerup's effect
            // and remove it.
            if (obj instanceof Powerup) {
                obj.usePowerup(this);
                // Keep track of which powerups were used so that we can make
                // sure to undo their effects when the level is over.
                globals.usedPowerups.push(obj);

                removeEntity(globals.powerups, globals.powerups.indexOf(obj));
            }
        }
        
        
        if (globals.user.currentHealth <= 0) {
            alive = false;
            globals.user.currentHealth = 0;
            progress(hpBar, '0%');
        }
        
        return !alive;
    }
    
    
    this.destroy = function () {
        engine.Graphics().destroyModel(model);
    }
}
