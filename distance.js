"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.DistanceSensor = void 0;
var pigpio_1 = require("pigpio");
var events_1 = require("events");
var DistanceSensor = /** @class */ (function (_super) {
    __extends(DistanceSensor, _super);
    function DistanceSensor(trig, echo, plustDuration) {
        if (plustDuration === void 0) { plustDuration = 500; }
        var _this = _super.call(this) || this;
        _this.startTick = 0;
        _this._dist = 0;
        _this.plustDuration = plustDuration;
        _this.trig = new pigpio_1.Gpio(trig, { mode: pigpio_1.Gpio.OUTPUT });
        _this.echo = new pigpio_1.Gpio(echo, { mode: pigpio_1.Gpio.INPUT, alert: true });
        _this.listen();
        return _this;
    }
    Object.defineProperty(DistanceSensor.prototype, "dist", {
        get: function () {
            return this._dist;
        },
        enumerable: false,
        configurable: true
    });
    DistanceSensor.prototype.listen = function () {
        var _this = this;
        this.echo.on('alert', function (l, t) { return _this.listen2echo(l, t); });
        this.interval = setInterval(function () {
            _this.trig.trigger(10, 1);
        }, this.plustDuration);
    };
    DistanceSensor.prototype.listen2echo = function (level, tick) {
        if (level == 1)
            this.startTick = tick;
        else {
            var endTick = tick;
            var diff = (endTick >> 0) - (this.startTick >> 0);
            this._dist = diff / 2 / DistanceSensor.MICROSECDONDS_PER_CM;
            this.emit('dist', this._dist);
        }
    };
    DistanceSensor.prototype.distructor = function () {
        if (this.interval)
            clearInterval(this.interval);
        this.echo.off('alert', this.listen2echo);
        this.removeAllListeners('dist');
    };
    DistanceSensor.MICROSECDONDS_PER_CM = 1e6 / 34321;
    return DistanceSensor;
}(events_1.EventEmitter));
exports.DistanceSensor = DistanceSensor;
exports.default = DistanceSensor;
