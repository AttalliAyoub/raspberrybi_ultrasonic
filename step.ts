import { Gpio } from 'onoff';

enum Mode {
    Full,
    Half,
    '1/4',
    '1/8',
    '1/16',
    '1/32'
};

const dir = new Gpio(20, 'out');
const step = new Gpio(21, 'out');

const m0 = new Gpio(14, 'out');
const m1 = new Gpio(15, 'out');
const m2 = new Gpio(18, 'out');

const setMode = (mode: Mode = Mode.Full): void => {
    switch (mode) {
        case Mode.Full: m0.writeSync(0); m1.writeSync(0); return m2.writeSync(0);
        case Mode.Half: m0.writeSync(1); m1.writeSync(0); return m2.writeSync(0);
        case Mode['1/4']: m0.writeSync(0); m1.writeSync(1); return m2.writeSync(0);
        case Mode['1/8']: m0.writeSync(1); m1.writeSync(1); return m2.writeSync(0);
        case Mode['1/16']: m0.writeSync(0); m1.writeSync(0); return m2.writeSync(1);
        case Mode['1/32']: m0.writeSync(1); m1.writeSync(0); return m2.writeSync(1);
        default: return setMode(Mode.Full);
    }
}

const mode = Mode.Full;
const full_steps = (360 / 1.8) * Math.pow(2, mode) * Math.pow(2, mode);
console.log(mode, Math.pow(2, mode), full_steps);
const delay = 1;

console.log('stepup');

dir.writeSync(1);
step.writeSync(0);

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
        step.writeSync(1);
        await wait(delay);
        step.writeSync(0);
        await wait(delay);
    }
    console.log('2 pi backwords');
    await wait(100);
    dir.writeSync(0);
    await wait(100);
    for (let i = 0; i < full_steps; i++) {
        step.writeSync(1);
        await wait(delay);
        step.writeSync(0);
        await wait(delay);
    }
    console.log('end of loop');
    exo();
};

main();

process.on('SIGINT', () => exo());

const exo = () => {
    dir.unexport();
    step.unexport();
    m0.unexport();
    m1.unexport();
    m2.unexport();
    console.log('script end');
};