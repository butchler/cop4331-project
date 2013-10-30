var Upgrade = function (engine, number) { 
    var name;
    var price;
    switch (number){
        case 1:
            name = "upgrade1";
            //price = 50*(players curr amount type 1)
            break;
        case 2:
            name = "upgrade2";
            //price = 50*(players curr amount type 2)
            break;
        default:
            name = "upgrade3";
            //price = 50*(players curr amount type 3)
            break;
    }
    
    this.apply = function(){
        switch (name){
            case "upgrade1":
                //player max hp +1
                break;
            case "upgrade2":
                //player move speed +1
                break;
            default:
                //player attack speed +1
                break;
        }
    }//end of apply
}//end of upgrade