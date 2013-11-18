var EntityRepo = function(gl) {
    var DEFAULT_DIRECTORY = "Content/Models/";
    var DEFAULT_TEXTURE = "Content/Textures/";
    var DEFAULT_EXTENSION = ".json";
    var entities = [];
    var materials = [];
    
    
    // add entities to the entity repo if it doesn't already exist
    // and return the index, return undefined if entity couldn't be found nor created
    this.addEntity = function(name) {
        var index;
        
        // if it already exists, just return it
        if (entityExists(name)) {
            index = name;
        }
        // if it doesn't already exist, add it in
        else {
            index = add( name, 
                new Renderable(gl, 
                    parseJSON(DEFAULT_DIRECTORY + name + DEFAULT_EXTENSION)));
        }
        
        return index;
    }
    
    // adds the entity to the name index if entity is real
    function add(name, entity) {
        var isObj = entity !== undefined;
        
        
        if (isObj)
            entities[name] = entity;
     
     
        return isObj;
    }
    
    
    // retrieve the entity
    this.getEntity = function(name) {
        return entities[name];
    }
    
    
    // currently a stub, needs to be implemented later
    this.destroyEntity = function(name) {
        
    }
    
    
    // check if an entity already exists
    function entityExists(name) {
        return entities[name] !== undefined;
    }
    this.entityExists = entityExists;
}