var Engine = function (gl) {
    this.Graphics = new GraphicsEngine(gl);
    this.Messages = new Message();
}