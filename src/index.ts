// import cv from './assets/scripts/opencv.js';
// const cv = require('./assets/scripts/opencv');
// import MyWorker from './web-workers/hello.worker';
// import { ScriptLoader } from './scriptloader';
import { OpenCvManager } from './opencv/opencv.manager';
// import OpenCVWorker from './web-workers/opencv.worker';


// const cv = require('./assets/scripts/opencv.js');

// console.log('cv', cv);
// console.log('imageSrc', document.getElementById('imageSrc'));

// const openCvWorker = new OpenCVWorker();
// openCvWorker.onmessage = ({ data }) => {
//     console.log('message from worker', data);
// }

// const cv = require('./opencv.js');
// let classifier = null;
// require('./assets/scripts/opencv.js');
// declare const cv: any;
// cv.onRuntimeInitialized = async () => {
//     console.log('📦OpenCV runtime loaded');
// };

const start = async() => {
    const openCvManager = await OpenCvManager();
    // console.log('OpenCV loaded')

    const imgElement = document.getElementById('imageSrc') as HTMLImageElement;
    const inputElement = document.getElementById('fileInput');
    const canvas = document.getElementById('canvasOutput') as HTMLCanvasElement;
    inputElement.addEventListener('change', (e: any) => {
        imgElement.src = URL.createObjectURL(e.target.files[0]);
    }, false);
    imgElement.onload = () => {
        openCvManager.loadFromImageElm('logo', imgElement);
        openCvManager.showImage('logo', 'canvasOutput');

        openCvManager.loadImage(canvas);
        openCvManager.delete('logo');
    };
    
    console.log('img elm', imgElement);
}

start().then();



// const test = new MyWorker();
// test.postMessage({});
// test.onmessage = (message) => {
//     console.log('message from worker', message);
// }
// const imgElement = document.getElementById('imageSrc') as HTMLImageElement;
// console.log('img elm', imgElement);

// let imgElement = document.getElementById('imageSrc') as HTMLImageElement;
// let inputElement = document.getElementById('fileInput');
// inputElement.addEventListener('change', (e: any) => {
//     console.log('sss')
//     imgElement.src = URL.createObjectURL(e.target.files[0]);
// }, false);
// imgElement.onload = function () {
//     let mat = cv.imread(imgElement);
//     cv.imshow('canvasOutput', mat);
//     mat.delete();
// };

// console.log('opencv', opencv);
// const opencvScriptElm = document.getElementById('opencv') as HTMLScriptElement;

// opencvScriptElm.onload = () => {
//     document.getElementById('status').innerHTML = 'OpenCV.js is ready.';
// }