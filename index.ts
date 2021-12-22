import { BinaryValue, Gpio } from 'onoff';

console.log('script start');

const trig = new Gpio(21, 'out');
const echo = new Gpio(20, 'in', 'both');

const MICROSECDONDS_PER_CM = 1e3 / 34321;

trig.writeSync(0);

let start: number;
let end: number;

echo.watch((err, value) => {
    if (err) {
        console.error(err);
    } else {
        // console.clear();
        if (value == 1) {
            start = Date.now();
        } else {
            end = Date.now();
            const diff = (end >> 0) - (start >> 0);
            console.log(diff / 2 / MICROSECDONDS_PER_CM);
        }
    }
});


const interval = setInterval(() => {
    trig.write(1);
    setTimeout(() => {
        trig.write(0);
    }, 0.01);
}, 1000);

process.on('SIGINT', () => {
    echo.unwatchAll();
    trig.unexport();
    echo.unexport();
    clearInterval(interval);
    console.log('script end');
});