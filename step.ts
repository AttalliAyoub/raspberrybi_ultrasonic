import { BinaryValue, Gpio } from 'onoff';


const dir = new Gpio(20, 'out');
const step = new Gpio(21, 'out');

const full_steps = 360 / 1.8;
const delay = 1000 / 48;

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
    for (let i = 0; i < full_steps; i++) {
        step.writeSync(1);
        await wait(delay);
        step.writeSync(0);
        await wait(delay);
        console.log(`step ${i}`);
    }
    console.log('end of loop');
};

main();

process.on('SIGINT', () => {
    dir.unexport();
    step.unexport();
    console.log('script end');
});
