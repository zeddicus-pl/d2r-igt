import { startIgt, stopIgt, setIgtCallback, setTickTime } from "./igt";
import { parentPort } from 'worker_threads';
import { IgtState } from './enums';

if (parentPort) {
    parentPort.once('message', (message) => {
        if (message.type != 'igt') return;
        if (message.action == 'startIgt') {
            startIgt();
        }
        if (message.action == 'stopIgt') {
            stopIgt();
        }
        if (message.action == 'setTickTime') {
            setTickTime(message.value);
        }
    });
    setIgtCallback((state: IgtState) => {
        if (parentPort) {
            parentPort.postMessage({ type: 'igt', state });
        }
    });
}
