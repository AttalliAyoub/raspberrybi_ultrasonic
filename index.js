"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var onoff_1 = require("onoff");
console.log('script start');
var trig = new onoff_1.Gpio(21, 'out');
var echo = new onoff_1.Gpio(20, 'in', 'both');
var MICROSECDONDS_PER_CM = 1e3 / 34321;
trig.writeSync(0);
var start;
var end;
echo.watch(function (err, value) {
    if (err) {
        console.error(err);
    }
    else {
        // console.clear();
        if (value == 1) {
            start = Date.now();
        }
        else {
            end = Date.now();
            var diff = (end >> 0) - (start >> 0);
            console.log(diff / 2 / MICROSECDONDS_PER_CM);
        }
    }
});
var interval = setInterval(function () {
    trig.write(1);
    setTimeout(function () {
        trig.write(0);
    }, 0.01);
}, 1000);
process.on('SIGINT', function () {
    echo.unwatchAll();
    trig.unexport();
    echo.unexport();
    clearInterval(interval);
    console.log('script end');
});
