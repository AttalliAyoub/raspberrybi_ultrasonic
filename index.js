"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var onoff_1 = require("onoff");
var trig = new onoff_1.Gpio(21, 'out');
var echo = new onoff_1.Gpio(20, 'in');
trig.writeSync(0);
echo.watch(function (err, value) {
    if (err)
        console.log(err);
    if (value)
        console.log(value, Date.now());
});
var interval = setInterval(function () {
    if (trig.readSync() === 0)
        trig.writeSync(1);
    else
        trig.writeSync(0);
}, 0.01);
process.on('SIGINT', function () {
    trig.unexport();
    echo.unexport();
    clearInterval(interval);
});
