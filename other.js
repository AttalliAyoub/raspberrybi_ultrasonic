const Gpio = require('onoff').Gpio;

console.log('script start');

const trig = new Gpio(21, 'out');
const echo = new Gpio(20, 'in', 'both');
trig.writeSync(0);

const distance = async () => {
    trig.writeSync(1);
    await sleep(0.00001);
    trig.writeSync(0);

    let start = process.hrtime.bigint();
    let end = start;

    while (echo.readSync() == 0)
        start = process.hrtime.bigint();

    while (echo.readSync() == 1)
        end = process.hrtime.bigint();

    const diff = end - start;

    return diff * 17150n;
};

const main = async () => {
    while (true) {
        const dist = await distance();
        console.log(Number(dist) * 10e-10);
        await sleep(1);
    }
}

const sleep = async (timeout) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve();
        }, timeout * 1000);
    });
}

main();