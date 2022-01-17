// import ws from 'ws';
import { Gpio } from 'pigpio';

enum Mode {
    Full,
    Half,
    '1/4',
    '1/8',
    '1/16',
    '1/32',
    '1/64',
    '1/128',
};


const dir = new Gpio(20, { mode: Gpio.OUTPUT });
const step = new Gpio(21, { mode: Gpio.OUTPUT });

const m0 = new Gpio(14, { mode: Gpio.OUTPUT });
const m1 = new Gpio(15, { mode: Gpio.OUTPUT });
const m2 = new Gpio(18, { mode: Gpio.OUTPUT });

const _full_steps = 1 / 1.8;
let full_steps = _full_steps;

const setMode_Help = (list: number[]) => {
    m0.digitalWrite(list[0]);
    m1.digitalWrite(list[1]);
    m2.digitalWrite(list[2]);
    full_steps = list[3];
};

const setMode = (mode: Mode = Mode.Full): void => {
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
}

const mode = Mode['1/32'];
const delay = 1;
dir.digitalWrite(1);
step.digitalWrite(0);


const main = async () => {
    setMode(mode);
    // step.pwmWrite(255);
    setInterval(() => {
        step.pwmWrite(255);
    }, 20);
    // console.log('2 pi forward');
    // let i = 0;
    // const interval  = setInterval(() => {
    //     step.trigger(delay, 1);
    //     i++;
    //     if (i >= full_steps * 180) {
    //         if (0 == dir.digitalRead()) clearInterval(interval);
    //         i = 0;
    //         console.log('2 pi backwords');
    //         dir.digitalWrite(0);
    //     }
    // }, delay * 2);
    // console.log('end of loop');
};

main();