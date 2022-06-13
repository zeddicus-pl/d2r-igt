import { setIgtCallback, startIgt, IgtState } from './igt';

setIgtCallback((state) => {
    let stateStr = '';
    switch (state) {
        case IgtState.LOADING:
            stateStr = 'Loading';
            break;
        case IgtState.PLAYING:
            stateStr = 'Playing';
            break;
        case IgtState.NO_GAME:
            stateStr = 'No game';
            break;
        default:
            stateStr = 'Unknown';
    }
    console.log('State changed to: ' + stateStr);
});

startIgt();

console.log('test');
setInterval(() => {}, 1000);