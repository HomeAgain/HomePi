HomePi
======

Repository for the Raspberry Pi.

Currently, only simulating the HomePi with the following sensors :

- Temperature Sensor
- Door Sensor
- Moisture Sensor

Installation
============

1- Install npm dependencies `npm install`


Use
===

To launch the HomePi simulator make sure to have a running HomeAgainApi on http://localhost:4000

Launch HomePi `node app.js`

That's all folks !


Configuration 
=============

You can configure the HomeAgainApi target by changing httpClient options in app.js

You can add/remove a simulator by adding/removing it from the simulator list in app.js

**Make sure to set different simulator IDs**