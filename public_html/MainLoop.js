var MainLoop = function () {
    // setup canvas and gl context
    var canvas = document.getElementById("canvas");
    var gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
    
    // check to make sure context exists
    if (!gl) {
        console.log("Failed to create gl reference!");
        return;
    }
    
    var engine = new Engine(gl);
    
    var contentManager = new ContentManager(engine);
    
    
    // prepare the rendering screen
    gl.enable(gl.DEPTH_TEST);
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    
    
    
    // main loop, will tie the content manager to the loop processes
    function loop() {
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        
        engine.Graphics().drawCamera();
        contentManager.update();
        engine.runCollisionTest();
        contentManager.collision();
        contentManager.draw();
        
        if (globals.inCombat)
            window.requestAnimationFrame(loop);
    }
    
    
    this.roundStart = function () {
        contentManager.init();
        engine.Messages().reset();
        loop();
    }
    
    this.prepModels = function () {
        // prep all models
        var names = ["attpower", "attspdpower", "bombpower", "boss", "bullet", "rocket",
            "enemy", "healthpower", "scattershot", "seeker", "ship", "speedpower"];

        engine.Graphics().prepModels(names);
    }
}
