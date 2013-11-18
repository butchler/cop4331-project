var Engine = function (gl) {
    var msg = new Message();
    var eventHandler = new EventHandler(msg);
    var cd = new CollisionDetection();
    var ge = new GraphicsEngine(gl, cd);
    var pathing = new Pathing();
    var config = new Config();
    
    
    cd.setRepo(ge.getRepo());
    
    this.Graphics = function () {
        return ge;
    }
    
    this.Pathing = function () {
        return pathing;
    }
    
    this.Messages = function () {
        return msg;
    }
    
    this.Configs = function () {
        
    }
    
    this.runCollisionTest = function () {
        cd.runCollision();
    }
}