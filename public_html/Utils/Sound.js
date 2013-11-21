// To use, create an HTML5 audio element like this:
//     <audio id="demo" type="audio/mpeg" src="path/to/sound.ogg"></audio>
// and create a sound object with a selector to this audio element:
//     var sound = new Sound('#demo');
var Sound = function(selector) {
    var element = $(selector)[0];

    this.resume = function() {
        element.play();
    }
    this.pause = function() {
        element.pause();
    }
    // Reset to beginning of sound.
    this.reset = function() {
        element.currentTime = 0;
    }

    // Play from the beginning.
    this.play = function(looped /* optional argument */) {
        element.loop = looped || false;
        this.reset();
        this.resume();
    }
    // Play from the beginning and loop.
    this.loop = function() {
        this.play(true);
    }

    this.increaseVolume = function() {
        element.volume += 0.1;
    }
    this.decreaseVolume = function() {
        element.volume -= 0.1;
    }
    this.setVolume = function(volume) {
        element.volume = volume;
    }

    this.isLoaded = function() {
        return element.readyState == 4;
    }
    // WARNING: For some reason, calling this.reset() (which is also called by
    // this.play()) also fires a canplaythrough event (at least on Firefox), so
    // the callback may be called more than once.
    this.onLoaded = function(callback) {
        element.addEventListener('canplaythrough', callback);
    }
}
