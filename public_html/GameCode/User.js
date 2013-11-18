// The User class keeps track of information about the user, particularly their
// resources (e.g. gold) and which levels they have beaten so far. Also handles
// loading and saving this data with localStorage.
var User = function() {
    // Default values.
    this.beatenLevels = [];
    this.gold = 0;
    this.rockets = 0;
    this.currentHealth = 100;
    this.shield = 0;

    this.load = function(slot) {
        // If there is no saved data, do nothing.
        var saveString = localStorage['save-slot-' + slot];
        if (saveString === undefined)
            return false;

        console.log('Loading saved data from localStorage: ' + saveString);

        var savedData = JSON.parse(saveString);

        for (name in savedData) {
            var item = savedData[name];
            if (item instanceof Object && item.type === 'ShopItemInfo') {
                // Use values returned by ShopItemInfo.getValues() to recreate the ShopItemInfo object.
                this[name] = new ShopItemInfo(name, item.cost, item.increase, item.level);
            } else {
                this[name] = item;
            }
        }

        return true;
    }

    this.save = function(slot) {
        var savedData = {};

        for (name in this) {
            var item = this[name]
            if (this[name] instanceof ShopItemInfo) {
                savedData[name] = item.getValues();
            } else if (this.hasOwnProperty(name) && !(item instanceof Function)) {
                savedData[name] = item;
            }
        }

        var saveString = localStorage['save-slot-' + slot] = JSON.stringify(savedData);

        console.log('Saved user data: ' + saveString);
    }
}

User.getSaveInfo = function(slot) {
    var saveString = localStorage['save-slot-' + slot];
    if (saveString === undefined)
        return null;

    var savedData = JSON.parse(saveString);

    return {
        numBeatenLevels: savedData.beatenLevels.length,
        gold: savedData.gold,
        health: savedData.currentHealth
    };
}
