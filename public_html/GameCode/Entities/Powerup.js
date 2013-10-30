var Powerup = function (engine, number) {  
    var speed = -.2;
    var name;
    var type;
    switch (number){
        case 1:
            name = "powerup1";
            break;
        case 2:
            name = "powerup2";
            break;
        case 3:
            name = "powerup3";
            break;
        default:
            name = "powerup4";
            break;
    }
    
    var model = engine.Graphics().createModel(name);
    
    this.draw = function () {
        engine.Graphics().draw(model);
    }
    
    this.update = function (){
        model.moveY(speed);
    }
    
    this.location = function (){
        return model.getPosition()[1];
    }
    
    this.getmodel = function (){
        return model;
    }
    
    this.collision = function (){
        return model.isColliding();
    }
    
    this.collisionWith = function (){
        
    }
    
    this.apply = function(){
        switch (name){
            case "powerup1":
                //HP pickup: players health +1
                break;
            case "powerup2":
                //weapon overcharge: player attack speed buff for 5 seconds
                break;
            case "powerup3":
                //shield: player shield for 3 hits
                break;
            default:
                //bomb: destroy all enemies
                break;
        }
    }//end of apply
}//end of Powerup