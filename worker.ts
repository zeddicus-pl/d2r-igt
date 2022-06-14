import { startIgt, stopIgt, setIgtCallback, IgtState } from "./igt";
import { parentPort } from 'worker_threads';

if (parentPort) {
    parentPort.once('message', (message) => {
        if (message.type != 'igt') return;
        if (message.action == 'startIgt') {
            startIgt();
        }
        if (message.action == 'stopIgt') {
            stopIgt();
        }
    });
    setIgtCallback((state: IgtState) => {
        if (parentPort) {
            parentPort.postMessage({ type: 'igt', state });
        }
    });
}
