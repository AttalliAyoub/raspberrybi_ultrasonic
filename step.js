"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
// import ws from 'ws';
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
var mode = Mode['1/32'];
var delay = 1;
dir.digitalWrite(1);
step.digitalWrite(0);
var main = function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        setMode(mode);
        step.pwmWrite(255);
        setTimeout(function () {
        }, 10000);
        return [2 /*return*/];
    });
}); };
main();
