var PowerupCM = function (engine) {
    var inPlay = [];
    
    this.draw = function () {
        for (var i = 0; i < inPlay.length; i++) {
            inPlay[i].draw();
        }
    }
    
    this.update = function (){
        for (var i = 0; i < inPlay.length; i++) {
            inPlay[i].update();
        }
        if(inPlay[i].location() < -16){
            engine.Graphics().destroyModel(inPlay[i].getModel());
            if(inPlay.length > 1){
                inPlay[i] = inPlay.pop();
            }
            else{
                inPlay.pop();
            }
        }
    }//end of update
    
    this.collision = function() {
        for (var i = 0; i < inPlay.length; i++) {
            if(inPlay[i].collision()){
                /*for(var j=0; j < inPlay[i].collisionWith().length ; j++){
            }
                */
                /*if(collision is with player){
                    apply(inPlay[i])
                    engine.Graphics().destroyModel(inPlay[i].getModel());
                    inPlay.delete(inPlay[i])
                }*/
            }
        }
    }//end of collision
    
    this.generate = function(){
        if(engine.Messages().getMessage("destroyed")){
            var number = Math.floor((Math.random()*100)+1);
            
            if(number >= 95){
                var number = Math.floor((Math.random()*4)+1);
                
                //generate powerup of corresponding type
                //pnew = new Powerup(engine, number);
                //pnew.location = get destroyed enemy location
                //inPlay.push(pnew);
            }
        }
    }//end of generate
    
}//end of PowerupCM