var ShopCM = function(engine) {
    this.draw = function() {
        
    }
    
    this.update = function() {
        if (engine.Messages().getMessage("up1") == "clicked") {
            //display confirmation request
            if(engine.Messages().getMessage("confirm") == "clicked"){
                upgrade.apply(engine, 1);
            }
            else{
                //remove confirmation message
            }
        }
        if (engine.Messages().getMessage("up2") == "clicked") {
            //display confirmation request
            if(engine.Messages().getMessage("confirm") == "clicked"){
                upgrade.apply(engine, 2);
            }
            else{
                //remove confirmation message
            }
        }
        if (engine.Messages().getMessage("up3") == "clicked") {
            //display confirmation request
            if(engine.Messages().getMessage("confirm") == "clicked"){
                upgrade.apply(engine, 3);
            }
            else{
                //remove confirmation message
            }
        }
    }//end of update
}//end of ShopCM