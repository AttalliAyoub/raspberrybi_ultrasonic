// import { Gpio } from 'onoff';
import { Gpio } from 'pigpio';

enum Mode {
    Full,
    Half,
    '1/4',
    '1/8',
    '1/16',
    '1/32'
};

const dir = new Gpio(20, { mode: Gpio.OUTPUT });
const step = new Gpio(21, { mode: Gpio.OUTPUT });

const m0 = new Gpio(14, { mode: Gpio.OUTPUT });
const m1 = new Gpio(15, { mode: Gpio.OUTPUT });
const m2 = new Gpio(18, { mode: Gpio.OUTPUT });

const _full_steps = (360 / 1.8);
let full_steps = (360 / 1.8);

const setMode = (mode: Mode = Mode.Full): void => {
    switch (mode) {
        case Mode.Full: m0.digitalWrite(0); m1.digitalWrite(0); m2.digitalWrite(0); full_steps = _full_steps; break;
        case Mode.Half: m0.digitalWrite(1); m1.digitalWrite(0); m2.digitalWrite(0); full_steps = _full_steps * 2; break;
        case Mode['1/4']: m0.digitalWrite(0); m1.digitalWrite(1); m2.digitalWrite(0); full_steps = _full_steps * 4; break;
        case Mode['1/8']: m0.digitalWrite(1); m1.digitalWrite(1); m2.digitalWrite(0); full_steps = _full_steps * 8; break;
        case Mode['1/16']: m0.digitalWrite(0); m1.digitalWrite(0); m2.digitalWrite(1); full_steps = _full_steps * 16; break;
        case Mode['1/32']: m0.digitalWrite(1); m1.digitalWrite(0); m2.digitalWrite(1); full_steps = _full_steps * 32; break;
        default: return setMode(Mode.Full);
    }
}

const mode = Mode.Full;
const delay = 1;

console.log('stepup');

dir.digitalWrite(1);
step.digitalWrite(0);

console.log('we started');

const wait = (miliseconds: number) => {
    return new Promise<void>((resolve) => {
        setTimeout(() => {
            resolve();
        }, miliseconds);
    });
}

const main = async () => {
    setMode(mode);
    console.log('2 pi forward');
    for (let i = 0; i < full_steps; i++) {
        step.digitalWrite(1);
        await wait(delay);
        step.digitalWrite(0);
        await wait(delay);
    }
    console.log('2 pi backwords');
    await wait(100);
    dir.digitalWrite(0);
    await wait(100);
    for (let i = 0; i < full_steps; i++) {
        step.digitalWrite(1);
        await wait(delay);
        step.digitalWrite(0);
        await wait(delay);
    }
    console.log('end of loop');
};

main();