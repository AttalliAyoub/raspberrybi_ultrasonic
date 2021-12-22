import { exit } from 'process';
import { DistanceSensor } from './distance';

const distanceSensorInst = new DistanceSensor(21, 20);

console.log('we started');

distanceSensorInst.addListener('dist', (value) => {
    console.log((value as number).toFixed(2));
});

// setTimeout(() => {
//     distanceSensorInst.distructor();
//     console.log('end');
//     exit();
// }, 5000);