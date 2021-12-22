import { Gpio } from 'pigpio';
import { EventEmitter } from 'events';

export class DistanceSensor extends EventEmitter {

    static MICROSECDONDS_PER_CM = 1e6 / 34321;

    private trig: Gpio;
    private echo: Gpio;
    private plustDuration;

    constructor(trig: number, echo: number, plustDuration: number = 500) {
        super();
        this.plustDuration = plustDuration;
        this.trig = new Gpio(trig, { mode: Gpio.OUTPUT });
        this.echo = new Gpio(echo, { mode: Gpio.INPUT, alert: true });
        this.listen();
    }

    private interval: NodeJS.Timer | undefined;
    private startTick: number = 0;
    private _dist: number = 0;
    get dist(): number {
        return this._dist;
    }
    private listen() {
        this.echo.on('alert', (l, t) => this.listen2echo(l, t));
        this.interval = setInterval(() => {
            this.trig.trigger(10, 1);
        }, this.plustDuration);
    }

    private listen2echo(level: 0 | 1, tick: number) {
        if (level== 1) this.startTick = tick;
        else {
            const endTick = tick;
            const diff = (endTick >> 0) - (this.startTick >> 0);
            this._dist = diff / 2 / DistanceSensor.MICROSECDONDS_PER_CM;
            this.emit('dist', this._dist);
        }
    }

    distructor() {
        if (this.interval)
        clearInterval(this.interval);
        this.echo.off('alert', this.listen2echo);
        this.removeAllListeners('dist');
    }


}

export default DistanceSensor;