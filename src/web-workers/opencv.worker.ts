// import { ScriptLoader } from "../scriptloader";
// import cv from '../assets/scripts/opencv';
// import '../assets/scripts/opencv';
// import * as moment from 'moment';

// console.log('m', moment);

// declare const cv: any;
// importScripts('../assets/scripts/opencv.js');
// const cv = require('../assets/scripts/opencv.js');
// import cv from '../assets/scripts/opencv';
// import * as cv from '../assets/scripts/opencv.js';

// console.log('cv', cv);
// importScripts('scripts/opencv.js');

// require('../assets/scripts/opencv');

// require('../assets/scripts/opencv.js');
// declare const cv: any;

import cv from '../assets/scripts/opencv.js';
cv.onRuntimeInitialized = async () => {
    console.log('📦OpenCV runtime loaded from web worker');
    init().then();
};

const ctx: Worker = self as any;
ctx.postMessage({
    message: 'Worker created'
});

// importScripts('scripts/opencv.js');
// console.log('CV', cv);
// console.log('📦OpenCV runtime loaded',);
// cv['onRuntimeInitialized'] = () => {
//     console.log('INITLL');
// }

// cv.onRuntimeInitialized = () => {
//     console.log('📦OpenCV runtime loaded');
//     // init().then();
// };

// interface

const init = async() => {

    let src;
    let dimensions;


    ctx.addEventListener('message', ({ data }) => {
        console.log('data', data);
        if (data.type === 'frame') {
            // console.log('data', data);
            // const mat = new cv.Mat(data.imgData.height, data.imgData.width, cv.CV_8UC4);
            // mat.data.set(data.imgData.data);
            // console.log('MAT', mat);
            src = new cv.Mat(data.imgData.height, data.imgData.width, cv.CV_8UC4);
            src.data.set(data.imgData.data);
            dimensions = {
                height: data.imgData.height,
                width: data.imgData.width
            }
            ctx.postMessage({
                message: 'Mat created'
            });
        }
        if (data.type === 'grayscale') {
            const dst = new cv.Mat();
            cv.cvtColor(src, dst, cv.COLOR_RGBA2GRAY, 0);
            console.log('gray scale', dst);

            // const canvas = new OffscreenCanvas(dimensions.height, dimensions.width);
            // const canvasCtx = canvas.getContext('2d');
            // const imgData = canvasCtx.getImageData(0, 0, canvas.width, canvas.height);

            // const imageDataRaw = new Uint8ClampedArray(dst.data, dimensions.height, dimensions.width);

            // var buffer = new ArrayBuffer();
            // const a = new Uint8ClampedArray(262144);
            const a = Uint8ClampedArray.from(dst.data);
            const imageData = new ImageData(a, dst.cols, dst.rows);

            // Initialize a new ImageData object
            // const imageData = new ImageData(arr, 200);


            ctx.postMessage({ type: 'grayscale', imageData }, [imageData.data.buffer]);
            // let imgData = new ImageData(new Uint8ClampedArray(dst.data, dst.cols, dst.rows);
            // canvasCtx.putImageData(imgData, 0, 0);
            // cv.imshow('canvasOutput', dst);

            // let grayScale = cv.matFromImageData(imgData);
        }
    });

    ctx.postMessage({
        type: 'init',
        message: 'OpenCV worker created'
    });
}

// init().then();


export default {} as typeof Worker & (new () => Worker);
// const ctx: Worker = self as any;
// // const cv = require('./scripts/opencv.js');
// // import * as cv from '../assets/scripts/opencv';

// declare const cv: any;

// // self.importScripts('scripts/opencv.js');

// // const init = async() => {

// //     console.log('INIT WW')

// //     ctx.postMessage({ type: 'init' });

// //     // self.addEventListener('message', ({ data }) => {
// //     //     if (data.type === 'frame') {
// //     //         ctx.postMessage({ type: 'TTPW' });
// //     //     }
// //     // });
// // }


// // cv.onRuntimeInitialized = async () => {
// //     console.log('📦OpenCV runtime loaded');
// //     init().then();
// // };

// const src = new cv.Mat()

// self.addEventListener('message', ({ data }) => {
//     console.log('GFF')
//     if (data.type === 'frame') {
//         ctx.postMessage({ type: 'TTPW' });
//     }
// });

// ctx.addEventListener('message', ({ data }) => {

//     console.log('WW', data);
//     const mat = new cv.Mat(data.height, data.width, cv.CV_8UC4);
//     console.log('MAT', mat);

//     mat.data.set(data.data);
//     // const mat = cv.imread(data.imageData);
//     console.log('MAT', mat);
// });

// export default {} as typeof Worker & (new () => Worker);
