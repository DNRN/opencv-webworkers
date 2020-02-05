import { OpenCvManager } from './opencv/opencv.manager';
<<<<<<< HEAD
import OpenCVWorker from './web-workers/opencv.worker';


// const cv = require('./assets/scripts/opencv.js');

// console.log('cv', cv);
// console.log('imageSrc', document.getElementById('imageSrc'));

// const openCvWorker = new OpenCVWorker();
// openCvWorker.onmessage = ({data}) => {
//     console.log('message from worker', data);
// }

const cv = require('./assets/scripts/opencv.js');
cv.onRuntimeInitialized = async () => {
    console.log('📦OpenCV runtime loaded');
};
=======
>>>>>>> fb16ddf1c6192f0bc7ef36cf8de2c4bf564b20d9

const start = async() => {
    const openCvManager = await OpenCvManager();

    const imgElement = document.getElementById('imageSrc') as HTMLImageElement;
    const inputElement = document.getElementById('fileInput');
    // const canvas = document.getElementById('canvasOutput') as HTMLCanvasElement;
    const imageCanvas = document.getElementById('imageCanvas') as HTMLCanvasElement;
    inputElement.addEventListener('change', (e: any) => {
        imgElement.src = URL.createObjectURL(e.target.files[0]);

    }, false);
    imgElement.onload = (event) => {
        imageCanvas.height = imgElement.width;
        imageCanvas.width = imgElement.width;
        const context = imageCanvas.getContext("2d");
        context.drawImage(imgElement, 0, 0);

        openCvManager.loadImage(imageCanvas);
        // openCvManager.delete('logo');
    };
    
    console.log('img elm', imgElement);
}

start().then();