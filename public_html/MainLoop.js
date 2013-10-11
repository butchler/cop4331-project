function main() {
    // setup canvas and gl context
    var canvas = document.getElementById("canvas");
    var gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
    
    // check to make sure context exists
    if (!gl) {
        console.log("Failed to create gl reference!");
        return;
    }
    
    var graphicsEngine = new GraphicsEngine(gl);
    var model = graphicsEngine.createModel("ship");
    
    var contentManager = new ContentManager(graphicsEngine);
    
    
    // prepare the rendering screen
    gl.enable(gl.DEPTH_TEST);
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    
    
    
    // main loop, will tie the content manager to the loop processes
    function loop() {
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        
        graphicsEngine.drawCamera();
        //model.draw(graphicsEngine.CURRENT_PROGRAM());
        contentManager.update();
        contentManager.draw();
        
        window.requestAnimationFrame(loop);
    }
    loop();
}