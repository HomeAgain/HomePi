/*
 * Fake serial port emulation
 *
 */

 exports.init = function (params){

    //Load the simulator
    this.simulators = [];
    for (var i in params.simulators){
        console.log("Adding simulator " + i);
        var simulator = params.simulators[i];

        this.simulators[i] = require(simulator);
    }
    
    // Set the interval
    this.interval = params.interval;

    this.listeners = {
        "data" : null,
        "open" : null
    };

    console.dir(this.listeners);

    var listeners = this.listeners;
    var simulators = this.simulators;
    
    // Boucle de simulation de réception de données.
    setInterval(function (){
        console.log("\n\nSimulating data send");
        if(listeners.data !== null){
            for(var i in simulators){
                
                var simulator = simulators[i];
                
                console.log("Calling sensor : "  + simulator.id);

                var data = simulator.id + "=" + simulator.getValue() + "=" + simulator.type + "=" + simulator.unit;
                console.log("Sending : " + data);
                
                listeners["data"](data);
                console.log('----------------------------');
            }
        }
    },
    this.interval
    );
};


exports.on = function(event, callback){
    this.listeners[event] = callback;
};

 