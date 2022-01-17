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
var onoff_1 = require("onoff");
var Mode;
(function (Mode) {
    Mode[Mode["Full"] = 0] = "Full";
    Mode[Mode["Half"] = 1] = "Half";
    Mode[Mode["1/4"] = 2] = "1/4";
    Mode[Mode["1/8"] = 3] = "1/8";
    Mode[Mode["1/16"] = 4] = "1/16";
    Mode[Mode["1/32"] = 5] = "1/32";
})(Mode || (Mode = {}));
;
var dir = new onoff_1.Gpio(20, 'out');
var step = new onoff_1.Gpio(21, 'out');
var m0 = new onoff_1.Gpio(14, 'out');
var m1 = new onoff_1.Gpio(15, 'out');
var m2 = new onoff_1.Gpio(18, 'out');
var setMode = function (mode) {
    if (mode === void 0) { mode = Mode.Full; }
    switch (mode) {
        case Mode.Full:
            m0.writeSync(0);
            m1.writeSync(0);
            return m2.writeSync(0);
        case Mode.Half:
            m0.writeSync(1);
            m1.writeSync(0);
            return m2.writeSync(0);
        case Mode['1/4']:
            m0.writeSync(0);
            m1.writeSync(1);
            return m2.writeSync(0);
        case Mode['1/8']:
            m0.writeSync(1);
            m1.writeSync(1);
            return m2.writeSync(0);
        case Mode['1/16']:
            m0.writeSync(0);
            m1.writeSync(0);
            return m2.writeSync(1);
        case Mode['1/32']:
            m0.writeSync(1);
            m1.writeSync(0);
            return m2.writeSync(1);
        default: return setMode(Mode.Full);
    }
};
var full_steps = (360 / 1.8) * 2;
var delay = 1;
console.log('stepup');
dir.writeSync(1);
step.writeSync(0);
console.log('we started');
var wait = function (miliseconds) {
    return new Promise(function (resolve) {
        setTimeout(function () {
            resolve();
        }, miliseconds);
    });
};
var main = function () { return __awaiter(void 0, void 0, void 0, function () {
    var i, i;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                setMode(Mode.Half);
                console.log('2 pi forward');
                i = 0;
                _a.label = 1;
            case 1:
                if (!(i < full_steps)) return [3 /*break*/, 5];
                step.writeSync(1);
                return [4 /*yield*/, wait(delay)];
            case 2:
                _a.sent();
                step.writeSync(0);
                return [4 /*yield*/, wait(delay)];
            case 3:
                _a.sent();
                _a.label = 4;
            case 4:
                i++;
                return [3 /*break*/, 1];
            case 5:
                console.log('2 pi backwords');
                return [4 /*yield*/, wait(10)];
            case 6:
                _a.sent();
                dir.writeSync(0);
                return [4 /*yield*/, wait(10)];
            case 7:
                _a.sent();
                i = 0;
                _a.label = 8;
            case 8:
                if (!(i < full_steps)) return [3 /*break*/, 12];
                step.writeSync(1);
                return [4 /*yield*/, wait(delay)];
            case 9:
                _a.sent();
                step.writeSync(0);
                return [4 /*yield*/, wait(delay)];
            case 10:
                _a.sent();
                _a.label = 11;
            case 11:
                i++;
                return [3 /*break*/, 8];
            case 12:
                console.log('end of loop');
                exo();
                return [2 /*return*/];
        }
    });
}); };
main();
process.on('SIGINT', function () { return exo(); });
var exo = function () {
    dir.unexport();
    step.unexport();
    m0.unexport();
    m1.unexport();
    m2.unexport();
    console.log('script end');
};
