import { ScriptLoader } from "../scriptloader";
import OpenCVWorker from '../web-workers/opencv.worker';

// import cv from '../assets/scripts/opencv.js';
declare const cv: any;
// import cv from '../assets/scripts/opencv';


export const OpenCvManager = async () => {
    // await ScriptLoader.load('opencv.js');
    cv.onRuntimeInitialized = async () => {
        console.log('📦OpenCV runtime loaded');
    };

    const matMap = new Map();

    const openCvWorker = new OpenCVWorker();

    const canvasOut = document.getElementById('canvasOut') as HTMLCanvasElement;


    openCvWorker.onmessage = (message) => {
        console.log('message from worker', message);
        if (message.data.type === 'init') {
            document.getElementById('status').innerHTML = 'OpenCV.js is ready.';
            console.log(message.data.message)
        }
        if (message.data.type === 'grayscale') {
            const ctx = canvasOut.getContext('2d');
            console.log('grayscale', message.data);
            const imageData = new ImageData(message.data.imageData.data, message.data.imageData.height, message.data.imageData.width);
            ctx.putImageData(imageData, 0, 0);
        }
    }

    const readDataFromImage = (canvas: HTMLCanvasElement) => {
        const imgData = canvas.getContext('2d');
        return imgData.getImageData(0, 0, canvas.width, canvas.height);
    }

    return {
        loadFromImageElm: (name: string, imgElement: HTMLImageElement) => {
            const mat = cv.imread(imgElement);
            matMap.set(name, mat);
            return mat;
        },
        showImage: (name: string, canvas: string) => {
            cv.imshow(canvas, matMap.get(name));
        },
        loadImage: (canvas: HTMLCanvasElement) => {
            const imgData = readDataFromImage(canvas);
            openCvWorker.postMessage({ type: 'frame', imgData }, [imgData.data.buffer]);
            openCvWorker.postMessage({ type: 'grayscale' });
        },
        grayscale: () => {
            openCvWorker.postMessage({ type: 'grayscale' });
        },
        delete: (name) => {
            matMap.get(name).delete();
            matMap.delete(name);
        }
    }
}