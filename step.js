"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ws_1 = require("ws");
var pigpio_1 = require("pigpio");
var Mode;
(function (Mode) {
    Mode[Mode["Full"] = 0] = "Full";
    Mode[Mode["Half"] = 1] = "Half";
    Mode[Mode["1/4"] = 2] = "1/4";
    Mode[Mode["1/8"] = 3] = "1/8";
    Mode[Mode["1/16"] = 4] = "1/16";
    Mode[Mode["1/32"] = 5] = "1/32";
    Mode[Mode["1/64"] = 6] = "1/64";
    Mode[Mode["1/128"] = 7] = "1/128";
})(Mode || (Mode = {}));
;
var dir = new pigpio_1.Gpio(20, { mode: pigpio_1.Gpio.OUTPUT });
var step = new pigpio_1.Gpio(21, { mode: pigpio_1.Gpio.OUTPUT });
var m0 = new pigpio_1.Gpio(14, { mode: pigpio_1.Gpio.OUTPUT });
var m1 = new pigpio_1.Gpio(15, { mode: pigpio_1.Gpio.OUTPUT });
var m2 = new pigpio_1.Gpio(18, { mode: pigpio_1.Gpio.OUTPUT });
var _full_steps = 1 / 1.8;
var full_steps = _full_steps;
var setMode_Help = function (list) {
    m0.digitalWrite(list[0]);
    m1.digitalWrite(list[1]);
    m2.digitalWrite(list[2]);
    full_steps = list[3];
};
var setMode = function (mode) {
    if (mode === void 0) { mode = Mode.Full; }
    switch (mode) {
        case Mode.Full: return setMode_Help([0, 0, 0, _full_steps]);
        case Mode.Half: return setMode_Help([1, 0, 0, _full_steps * 4]);
        case Mode['1/4']: return setMode_Help([0, 1, 0, _full_steps * 16]);
        case Mode['1/8']: return setMode_Help([1, 1, 0, _full_steps * 32]);
        case Mode['1/16']: return setMode_Help([0, 0, 1, _full_steps]);
        case Mode['1/32']: return setMode_Help([1, 0, 1, _full_steps * 4]);
        case Mode['1/64']: return setMode_Help([0, 1, 1, _full_steps * 16]);
        case Mode['1/128']: return setMode_Help([1, 1, 1, _full_steps * 32]);
        default: return setMode(Mode.Full);
    }
};
// const mode = Mode.Full;
var delay = 1;
dir.digitalWrite(1);
step.digitalWrite(0);
var wss = new ws_1.WebSocketServer({ port: 5000 });
var distanation_steps = 0;
var current_steps = 0;
wss.on('connection', function (ws) {
    ws.on('message', function (data) {
        // console.log('received: %s', data);
        var event = JSON.parse(data.toString());
        switch (event.name) {
            case 'go':
                distanation_steps = event.value * full_steps;
                break;
            case 'mode':
                setMode(event.mode);
                // distanation_steps = event * full_steps;
                break;
            default:
                break;
        }
    });
    ws.send(JSON.stringify({ 'event': 'you are on' }));
});
setInterval(function () {
    var direction = distanation_steps - current_steps;
    while (Math.abs(direction) > 1) {
        if (direction > 0) {
            dir.digitalWrite(1);
            current_steps++;
        }
        else {
            dir.digitalWrite(0);
            current_steps--;
        }
        step.trigger(delay, 1);
    }
}, delay * 2);
