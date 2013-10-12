var Engine = function (gl) {
    var msg = new Message();
    var eventHandler = new EventHandler(msg);
    
    var ge = new GraphicsEngine(gl);
    
    this.Graphics = function () {
        return ge;
    }
    
    this.Messages = function () {
        return msg;
    }
}