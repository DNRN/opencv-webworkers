console.log('Hello world');
import MyWorker from './web-workers/hello.worker';

const test = new MyWorker('');
test.postMessage({});
test.onmessage = (message) => {
    console.log('message from worker', message);
}
