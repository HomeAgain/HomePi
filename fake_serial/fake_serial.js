/*
 * Fake serial port emulation
 *
 */

 exports.init = function (params){

    //Load the simulators
    this.simulators = [];
    for (var i in params.simulators){
        var simulator = params.simulators[i];
        this.simulators[i] = simulator;
        console.log("Adding simulator : " + simulator.id);
    }

    console.log("HomePi starting with " + i + " simulator(s).");
    
    // Set the interval 
    this.interval = params.interval;

    this.listeners = {
        "data" : null,
        "open" : null
    };
    

    // Setting data because there's a scope closure in setInterval
    var listeners = this.listeners;
    var simulators = this.simulators;
    
    // Loop that simulates data reception 
    setInterval(function (){
        console.log("\n\nSending data send...");
        if(listeners.data !== null){
            for(var i in simulators){
                
                var simulator = simulators[i];

                // Retrieving data and add meta-data (sensor_id, unit, ..)
                var data = simulator.id + "=" + simulator.getValue() + "=" + simulator.type + "=" + simulator.unit;
                

                // Calling the dataListener with the data to send
                listeners["data"](data);
            }
        }
    },
    this.interval
    );
};


exports.on = function(event, callback){
    this.listeners[event] = callback;
};

 