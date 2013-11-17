var ShopItemInfo = function (name, Cost, Inc, Lvl) {
    var item = name;
    var cost = Cost;
    var increase = Inc;
    var level = Lvl;
    var incAmount = Inc / Lvl;
    
    setValues();
    
    this.levelUp = function () {
        if (globals.user.gold >= cost && level <= 5) {
            setGold(globals.user.gold - cost);
            
            level++;
            cost *= 5;
            
            increase += incAmount;

            setValues();
        }
    }
    
    this.getIncrease = function () {
        return increase;
    }
    
    function setValues () {
        var c = document.getElementById(item + "Cost");
        var i = document.getElementById(item + "Inc");
        var l = document.getElementById(item + "Lvl");
        var o = document.getElementById(item + "Cur");
        
        c.innerHTML = cost;
        i.innerHTML = increase;
        l.innerHTML = level;
        
        globals[item + "Stat"] = globals[item + "Base"] + (level - 1) * incAmount;
        o.innerHTML = globals[item + "Stat"];
        
        
        if (level > 5) {
            var b = document.getElementById(item);
            b.disabled = true;
            
            c.innerHTML = "--";
            i.innerHTML = "--";
        }
        
        if (item == 'health') {
            var hpBar = document.getElementById('hp');
            progress(hpBar, (globals.user.currentHealth / globals.healthStat) * 100 + '%');
        }
    }
    this.setValues = setValues;

    // Used to save the information stored in this ShopItemInfo object, for saving/loading.
    this.getValues = function () {
        return {
            type: 'ShopItemInfo',
            cost: cost,
            increase: increase,
            level: level
        };
    }
}
