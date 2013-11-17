// The User class keeps track of information about the user, particularly their
// resources (e.g. gold) and which levels they have beaten so far. Also handles
// loading and saving this data with localStorage.
var User = function() {
    this.beatenLevels = [];
    this.gold = 0;

    this.load = function() {
        // If there is no saved data, do nothing.
        if (localStorage.savedData == undefined)
            return;

        var savedData = JSON.parse(localStorage.savedData);
        for (key in savedData) {
            this[key] = savedData[key];
        }
    }

    this.save = function() {
        localStorage.savedData = JSON.stringify({
            beatenLevels: this.beatenLevels,
            gold: this.gold
        });
    }
}
