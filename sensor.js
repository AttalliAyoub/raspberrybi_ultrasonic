"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var distance_1 = require("./distance");
var distanceSensorInst = new distance_1.DistanceSensor(21, 20);
console.log('we started');
distanceSensorInst.addListener('dist', function (value) {
    console.log(value.toFixed(2));
});
// setTimeout(() => {
//     distanceSensorInst.distructor();
//     console.log('end');
//     exit();
// }, 5000);
