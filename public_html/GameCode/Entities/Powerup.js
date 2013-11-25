var Powerup = function (engine, pos) {
    var type = 'ally';
    // Choose a random powerup type.
    var kinds = ['damage', 'speed', 'rate', 'health', 'rocket'];
    var kind = kinds[Math.floor(kinds.length * Math.random())];
    // The amount that each powerup increases the corresponding player attribute.
    var amounts = {
        'damage': 10,
        'speed': 20,
        'rocket': 1,
        'rate': 1,
        'health': 25
    };
    var duration = 20.0;   // Effect duration in seconds.
    var models = {
        'damage': 'attpower',
        'speed': 'speedpower',
        'rocket': 'bombpower',
        'rate': 'attspdpower',
        'health': 'healthpower'
    };
    var name = models[kind];
    var speed = 0.5;
    var inUse = false;

    var MIN_POWERUP_HEIGHT = -50;

    var model = engine.Graphics().createModel(name, this);
    model.setPosition(pos[0], pos[1], pos[2]);

    var player = null;

    this.usePowerup = function(player_) {
        player = player_;

        if (!inUse) {
            player.updateStat(kind, amounts[kind]);
            inUse = true;

            // Undo the powerup's effects when the duration has passed.
            setTimeout(this.undoPowerup, Math.round(duration * 1000));
        }
    }

    this.undoPowerup = function() {
        // Don't reset health or rockets.
        if (kind === 'health' || kind === 'rocket')
            return;

        if (inUse) {
            player.updateStat(kind, -amounts[kind]);
            inUse = false;
        }
    }

    this.draw = function () {
        engine.Graphics().draw(model);
    }

    this.update = function () {
        model.moveY(-speed);
    }

    this.isOutside = function () {
        return model.getPosition()[1] < MIN_POWERUP_HEIGHT;
    }

    this.getName = function () {
        return type;
    }

    this.getDamage = function() {
        return 0.0;
    }

    this.destroy = function () {
        engine.Graphics().destroyModel(model);
    }
}
