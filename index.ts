import { Gpio } from 'onoff';

const trig = new Gpio(21, 'out');
const echo = new Gpio(20, 'in');

trig.writeSync(0);

echo.watch((err, value) => {
    if (err) console.log(err);
    if (value) console.log(value, Date.now());
});

const interval = setInterval(() => {
    if (trig.readSync() === 0) trig.writeSync(1);
    else trig.writeSync(0);
}, 0.01);

process.on('SIGINT', () => {
    trig.unexport();
    echo.unexport();
    clearInterval(interval);
});